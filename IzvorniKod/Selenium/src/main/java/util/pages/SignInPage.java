package util.pages;

import org.openqa.selenium.By;
import util.BasePage;

public class SignInPage extends BasePage {
    private By signInButton = By.xpath("//button[@type='submit' and contains(@class, 'btn1') and contains(@class, 'mr-2') and text()='Sign in']");
    private By usernameInputField = By.xpath("//input[@type='text' and @placeholder='E-mail / username' and @maxlength='50' and @required]");
    private By passwordInputField = By.xpath("//input[@type='password' and @placeholder='Password' and @maxlength='20' and @required]");
    public void setUsername(String username) {
        set(usernameInputField, username);
    }
    public void setPassword(String password) {
        set(passwordInputField, password);
    }
    public MainPage signIn() {
        click(signInButton);
        return new MainPage();
    }






}
