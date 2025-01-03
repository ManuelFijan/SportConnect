package hr.fer.sportconnect.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import hr.fer.sportconnect.dao.ProductDAO;
import hr.fer.sportconnect.dto.RequestDTO;
import hr.fer.sportconnect.service.impl.CustomerServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Upravlja pozivima endpointova s frontenda vezano za placanje.
 */

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = {"http://localhost:3000", "https://sportconnect-8b7o.onrender.com"}, allowCredentials = "true")
public class PaymentController {

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
                .build();
    }

    private final CustomerServiceImpl customerService;
    public PaymentController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }

    String STRIPE_API_KEY = System.getenv().get("SPRING_STRIPE_API_SECRET_KEY");

    @PostMapping("/hosted")
    public ResponseEntity<String> hostedCheckout(@RequestBody RequestDTO requestDTO) throws StripeException{

        if (requestDTO.getItems() == null) {
            System.out.println("Array length is 0");
            return ResponseEntity.badRequest().body("Input array cannot be null");
        }
        Stripe.apiKey = STRIPE_API_KEY;
        String clientBaseURL = "http://localhost:3000";

        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Customer customer = customerService.findOrCreateCustomer(requestDTO.getCustomerEmail(), requestDTO.getCustomerName());

        // Next, create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(clientBaseURL + "/successful-payment?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(clientBaseURL + "/failed-payment");

        for (Product product : requestDTO.getItems()) {
            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                    PriceData.builder()
                                            .setProductData(
                                                    PriceData.ProductData.builder()
                                                            .putMetadata("app_id", product.getId())
                                                            .setName(product.getName())
                                                            .build()
                                            )
                                            .setCurrency(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getCurrency())
                                            .setUnitAmountDecimal(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getUnitAmountDecimal())
                                            .setRecurring(PriceData.Recurring.builder().setInterval(PriceData.Recurring.Interval.MONTH).build())
                                            .build())
                            .build());
        }
        Session session = Session.create(paramsBuilder.build());
        // Return the URL directly in the response body
        return ResponseEntity.ok(session.getUrl());
    }
}