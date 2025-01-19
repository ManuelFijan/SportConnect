package hr.fer.sportconnect;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ConversationReadStatusRepository;
import hr.fer.sportconnect.repository.ConversationRepository;
import hr.fer.sportconnect.repository.MessageRepository;
import com.pusher.rest.Pusher;
import hr.fer.sportconnect.service.impl.ChatServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChatServiceImplTest {

    @Mock
    private ConversationRepository conversationRepository;
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private ConversationReadStatusRepository readStatusRepository;
    @Mock
    private Pusher pusher;
    @InjectMocks
    private ChatServiceImpl chatService;
    private User userAna;
    private User userMarko;
    private Conversation existingConversation;

    @BeforeEach
    void setUp() {
        // priprema korisnika
        userAna = new User();
        userAna.setEmail("ana@mail.com");
        userAna.setFirstName("Ana");
        userAna.setLastName("Horvat");

        userMarko = new User();
        userMarko.setEmail("marko@mail.com");
        userMarko.setFirstName("Marko");
        userMarko.setLastName("Horvat");

        existingConversation = new Conversation();
        existingConversation.setId(5L);
        existingConversation.getParticipants().add(userAna);
        existingConversation.getParticipants().add(userMarko);
    }

    /**
     * TEST 1
     * Stvaranje razgovora između korisnika koji još nemaju stvoren razgovor.
     */
    @Test
    void testCreateConversationWithNewUsers() {
        // mock
        when(conversationRepository.findConversationBetweenUsers(userAna, userMarko))
                .thenReturn(Optional.empty());

        // pripremi novi razgovor
        Conversation savedConv = new Conversation();
        savedConv.setId(10L);
        savedConv.getParticipants().add(userAna);
        savedConv.getParticipants().add(userMarko);
        // kada se metoda save pozove s bilo kojom instancom Conversation, vrati savedConv
        when(conversationRepository.save(any(Conversation.class))).thenReturn(savedConv);

        Conversation result = chatService.createConversation(userAna, userMarko);
        assertNotNull(result);
        assertEquals(10L, result.getId());
        assertTrue(result.getParticipants().contains(userAna));
        assertTrue(result.getParticipants().contains(userMarko));

        // trebao bi biti stvoren novi razgovor
        verify(conversationRepository, times(1)).save(any(Conversation.class));

        // objekt tipa ConversationReadStatus bi trebao biti stvoren
        verify(readStatusRepository, times(1)).saveAll(anyCollection());
    }

    /**
     * TEST 2
     * Primjer stvaranja razgovora između korisnika, ali razgovor već postoji.
     */
    @Test
    void testCreateConversationWithExistingConversation() {
        // mock
        when(conversationRepository.findConversationBetweenUsers(userAna, userMarko))
                .thenReturn(Optional.of(existingConversation));

        // pokušaj stvoriti novi razgovor
        Conversation result = chatService.createConversation(userAna, userMarko);

        assertNotNull(result);
        assertEquals(5L, result.getId());
        // novi razgovor ne bi trebao biti spremljen
        verify(conversationRepository, never()).save(any(Conversation.class));
        // readStatusRepository ne bi smio stvoriti nove statuse za nepročitane poruke
        verify(readStatusRepository, never()).saveAll(anyCollection());
    }

    /**
     * TEST 3
     * Primjer izazivanja pogreške slanjem poruke u nepostojeći razgovor.
     */
    @Test
    void testSendMessageConversationNotFound() {
        when(conversationRepository.findById(99L)).thenReturn(Optional.empty());

        // simuliraj slanje poruke
        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                chatService.sendMessage(userMarko, 99L, "Test Message"));

        assertEquals("Conversation not found", ex.getMessage());

        // budući da razgovor ne postoji, messageRepository i pusher se ne bi smjeli pozvati
        verify(messageRepository, never()).save(any(Message.class));
        verify(pusher, never()).trigger(anyString(), anyString(), any());
    }

    /**
     * TEST 4
     * Primjer neimplementirane funkcije. Funkcija za prikvačiti razgovor na vrh ne postoji.
     */
    @Test
    void testPinConversationNotImplemented() {
        // metoda ne postoji pa ju simuliramo
        assertThrows(UnsupportedOperationException.class, () -> {
            // chatService.pinConversation(12L, userAna);
            throw new UnsupportedOperationException("Pinning is not supported.");
        });
    }
}
