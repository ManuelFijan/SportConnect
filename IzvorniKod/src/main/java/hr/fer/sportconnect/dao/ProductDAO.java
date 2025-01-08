package hr.fer.sportconnect.dao;

import com.stripe.model.Price;
import com.stripe.model.Product;

import java.math.BigDecimal;

public class ProductDAO {
    static Product[] products;

    static {
        products = new Product[6];

        Product sampleProduct = new Product();
        Price samplePrice = new Price();

        sampleProduct.setName("Free to Bronze");
        sampleProduct.setId("free1");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(1500));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[0] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Free to Silver");
        sampleProduct.setId("free2");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(2500));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[1] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Free to Gold");
        sampleProduct.setId("free3");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(3500));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[2] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Bronze to Silver");
        sampleProduct.setId("bronze1");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(1000));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[3] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Bronze to Gold");
        sampleProduct.setId("bronze2");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(2000));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[4] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Silver to Gold");
        sampleProduct.setId("silver1");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(1000));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[5] = sampleProduct;

    }

    public static Product getProduct(String id) {

        if ("free1".equals(id)) {
            return products[0];
        } else if ("free2".equals(id)) {
            return products[1];
        } else if ("free3".equals(id)) {
            return products[2];
        } else if ("bronze1".equals(id)) {
            return products[3];
        }else if ("bronze2".equals(id)) {
            return products[4];
        }else if ("silver1".equals(id)) {
            return products[5];
        }else return new Product();

    }
}
