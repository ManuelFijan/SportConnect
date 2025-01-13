package hr.fer.sportconnect.controller;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;

@RestController
@RequestMapping("/stripe-webhooks")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String STRIPE_WEBHOOK_KEY;

    private final UserService userService;

    public StripeWebhookController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/events")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        String stripe_secret_key = STRIPE_WEBHOOK_KEY;

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, stripe_secret_key);
            if ("checkout.session.completed".equals(event.getType())) {

                EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                String customerId = null;
                Session session = null;
                if (deserializer.getObject().isPresent()) {
                    session = (Session) deserializer.getObject().get();
                    customerId = session.getCustomer();
                } else {
                    throw new IllegalStateException("Failed to deserialize event data");
                }
                Customer customer = Customer.retrieve(customerId);
                String email = customer.getEmail();
                String subscriptionPlan = session.getSuccessUrl().substring(session.getSuccessUrl().indexOf('=')+1, session.getSuccessUrl().indexOf('&'));

                userService.updateSubscriptionPlan(email, SubscriptionPlan.valueOf(subscriptionPlan.toUpperCase()));
            }

            return ResponseEntity.ok().build();

        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Webhook handling error");
        }
    }
}
