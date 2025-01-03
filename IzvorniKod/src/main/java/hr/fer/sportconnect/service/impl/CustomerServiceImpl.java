package hr.fer.sportconnect.service.impl;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import hr.fer.sportconnect.service.CustomerService;
import org.springframework.stereotype.Service;


/**
 * Implementacija koja definira osnovne metode za upravljanje kupcima za Stripe.
 * Ovdje se nalazi sva poslovna logika vezana za traženje postojećih kupaca ili kreiranje novih profila kupcima.
 */

@Service
public class CustomerServiceImpl implements CustomerService {
    public Customer findCustomerByEmail(String email) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();

        CustomerSearchResult result = Customer.search(params);

        return !result.getData().isEmpty() ? result.getData().get(0) : null;
    }

    public Customer findOrCreateCustomer(String email, String name) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();

        CustomerSearchResult result = Customer.search(params);

        Customer customer;

        // If no existing customer was found, create a new record
        if (result.getData().isEmpty()) {

            CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                    .setName(name)
                    .setEmail(email)
                    .build();

            customer = Customer.create(customerCreateParams);
        } else {
            customer = result.getData().get(0);
        }

        return customer;
    }
}
