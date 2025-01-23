package hr.fer.sportconnect.service;

/*
Sučelje koje definira metode za traženje ili kreiranje Customer objekata za Stripe
 */

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;

public interface CustomerService {
    Customer findCustomerByEmail(String email) throws StripeException;
    Customer findOrCreateCustomer(String email, String name) throws StripeException;
}
