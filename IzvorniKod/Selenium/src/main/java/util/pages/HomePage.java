package util.pages;

import org.openqa.selenium.By;
import util.BasePage;

public class HomePage extends BasePage {
    private By signInButton = By.xpath("//button[contains(@class, 'button-3') and text() = 'Sign in']");
    private By createAccountButton = By.xpath("//button[@class='button-2' and text()='Create an account']");
    public SignInPage openSignIn() {
        click(signInButton);
        return new SignInPage();
    }
    public CreateAccountPage openCreateAccount() {
        click(createAccountButton);
        return new CreateAccountPage();
    }
}
