package hr.fer.sportconnect.enums;

import java.util.List;

/**
 * Enum koji predstavlja različite razine pretplatničkih paketa koje korisnik može imati.
 */

public enum SubscriptionPlan {
    FREE, BRONZE, SILVER, GOLD;

    public List<SubscriptionPlan> accessiblePlans() {
        switch (this) {
            case GOLD:
                return List.of(FREE, BRONZE, SILVER, GOLD);
            case SILVER:
                return List.of(FREE, BRONZE, SILVER);
            case BRONZE:
                return List.of(FREE, BRONZE);
            case FREE:
            default:
                return List.of(FREE);
        }
    }

}
