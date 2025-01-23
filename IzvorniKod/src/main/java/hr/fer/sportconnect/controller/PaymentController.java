package hr.fer.sportconnect.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import hr.fer.sportconnect.dao.ProductDAO;
import hr.fer.sportconnect.dto.PurchaseRequestDTO;
import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.service.UserService;
import hr.fer.sportconnect.service.impl.CustomerServiceImpl;
import hr.fer.sportconnect.service.impl.UserServiceImpl;
import net.minidev.json.JSONUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Upravlja pozivima endpointova s frontenda vezano za placanje.
 */

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = {"http://localhost:3000", "https://sportconnect-8b7o.onrender.com"}, allowCredentials = "true")
public class PaymentController {

    @Value("${stripe.key}")
    private String STRIPE_API_KEY;

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
    private final UserServiceImpl userService;
    public PaymentController(CustomerServiceImpl customerService, UserServiceImpl userService) {
        this.customerService = customerService;
        this.userService = userService;
    }
    //String STRIPE_API_KEY = System.getenv("SPRING_STRIPE_API_SECRET_KEY");

    // za vracanje balance-a za partnera zadane razine
    @GetMapping("/balance")
    public ResponseEntity<?> getStripeBalance(@RequestParam SubscriptionPlan subscriptionPlan) {
        try {
            // Set the Stripe API key
            Stripe.apiKey = STRIPE_API_KEY;

            // Retrieve the current balance
            Balance balance = Balance.retrieve();

            Long balanceAmount = null;

            if (balance.getAvailable() != null && !balance.getAvailable().isEmpty()) {
                balanceAmount = balance.getAvailable().get(0).getAmount();
            }
            balanceAmount/=100;
            balanceAmount=balanceAmount*8/10;

            if (subscriptionPlan == SubscriptionPlan.FREE) balanceAmount=balanceAmount/10;
            else if (subscriptionPlan == SubscriptionPlan.BRONZE) balanceAmount=balanceAmount*2/10;
            else if (subscriptionPlan == SubscriptionPlan.SILVER) balanceAmount=balanceAmount*3/10;
            else  balanceAmount=balanceAmount*4/10;

            int num_users = 0;

            List<UserDto> allUsers = userService.getAllUsers();

            for (UserDto user : allUsers) {
                if (user.getSubscriptionPlan() == subscriptionPlan) num_users++;
            }

            return ResponseEntity.ok(balanceAmount/num_users);
        } catch (StripeException e) {
            // Handle exceptions and return an error response
            return ResponseEntity.status(500).body("Error retrieving balance: " + e.getMessage());
        }
    }

    @PostMapping("/hosted")
    public ResponseEntity<String> hostedCheckout(@RequestBody PurchaseRequestDTO requestDTO) throws StripeException{

        if (requestDTO.getItems() == null) {
            System.out.println("Array length is 0");
            return ResponseEntity.badRequest().body("Input array cannot be null");
        }
        Stripe.apiKey = STRIPE_API_KEY;
        String clientBaseURL = "https://sportconnect-8b7o.onrender.com";

        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Customer customer = customerService.findOrCreateCustomer(requestDTO.getCustomerEmail(), requestDTO.getCustomerName());
        String subscriptionPlan = requestDTO.getItems()[0].getName().split(" ")[2];
        // Next, create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(clientBaseURL + "/successful-payment?rank=" + subscriptionPlan + "&session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(clientBaseURL + "/failed-payment");

        for (Product product : requestDTO.getItems()) {
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                        PriceData.builder()
                                .setProductData(
                                        PriceData.ProductData.builder()
                                                .putMetadata("subscription_plan", subscriptionPlan)
                                                .putMetadata("app_id", product.getId())
                                                .setName(product.getName())
                                                .build()
                                )
                                .setCurrency(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getCurrency())
                                .setUnitAmountDecimal(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getUnitAmountDecimal())
                                .setRecurring(PriceData.Recurring.builder().setInterval(PriceData.Recurring.Interval.MONTH).build())
                                .build())
                .build();
            paramsBuilder.addLineItem(lineItem);
        }
        Session session = Session.create(paramsBuilder.build());

        // Return the URL directly in the response body
        return ResponseEntity.ok(session.getUrl());
    }
}