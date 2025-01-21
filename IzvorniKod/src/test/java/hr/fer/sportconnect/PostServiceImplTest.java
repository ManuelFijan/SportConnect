package hr.fer.sportconnect;

import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.model.Post;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.PostRepository;
import hr.fer.sportconnect.service.impl.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PostServiceImplTest {

    @Mock
    PostRepository postRepository;

    @InjectMocks
    private PostServiceImpl postService;

    @Test
    void createPost() {
        // kreiranje primjera user-a
        String email = "ana@mail.com";
        String password = "password";
        String firstName = "Ana";
        String lastName = "Horvat";
        String username = "anahorvat";
        UserType userType = UserType.PARTNER;
        SubscriptionPlan subscriptionPlan = SubscriptionPlan.FREE;
        String mobileNumber = "+385 954123658";
        User user = new User(email, password, firstName, lastName, username, userType, subscriptionPlan, mobileNumber, null);

        // tekst u post-u
        String textContent = "Ovo je probni post.";

        // oponasanje postRepository-a
        Post post = new Post(user, textContent, null, subscriptionPlan);
        when(postRepository.save(any(Post.class))).thenReturn(post);

        // kreiranje post-a
        Post myPost = postService.createPost(user, textContent, null, subscriptionPlan);

        // provjera postojanja stvorenog post-a
        assertNotNull(myPost);
        // provjera atributa stvorenog post-a
        assertEquals(user, myPost.getPartner());
        assertEquals(textContent, myPost.getTextContent());
        assertEquals(subscriptionPlan, myPost.getTier());

        verify(postRepository, times(1)).save(any(Post.class));
    }
}
