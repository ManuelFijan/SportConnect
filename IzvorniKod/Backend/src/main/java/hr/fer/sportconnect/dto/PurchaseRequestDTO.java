package hr.fer.sportconnect.dto;

import com.stripe.model.Product;

public class PurchaseRequestDTO
{
    Product[] items;
    String customerName;
    String customerEmail;

    public Product[] getItems() {
        return items;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }
}
