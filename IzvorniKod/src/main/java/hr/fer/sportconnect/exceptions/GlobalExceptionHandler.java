package hr.fer.sportconnect.exceptions;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

/**
 * Zadužen za upravljanje svim pogreškama koje se mogu desiti prilikom rada kontrolera. Ispisuje detaljni tekst pogreške.
 */

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
