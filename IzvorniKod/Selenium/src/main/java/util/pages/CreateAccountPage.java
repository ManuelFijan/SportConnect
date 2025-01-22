package util.pages;

import org.openqa.selenium.By;
import util.BasePage;

import static util.JavaScriptUtility.clickJS;

public class CreateAccountPage extends BasePage {
    private By clientRadioButton = By.xpath("//input[@type='radio' and @name='role' and @value='Client']");
    private By partnerRadioButton = By.xpath("//input[@type='radio' and @name='role' and @value='Partner']");
    private By nameInputField = By.xpath("//input[@type='text' and @placeholder='Name' and @maxlength='20']");
    private By surnameInputField = By.xpath("//input[@type='text' and @placeholder='Surname' and @maxlength='20']");
    private By contactInputField = By.xpath("//input[@type='text' and @placeholder='Contact (mobile/telephone number)' and @maxlength='19']");
    private By emailInputField = By.xpath("//input[@type='text' and @placeholder='E-mail' and @maxlength='50']");
    private By agreementCheckBox = By.xpath("//input[@class='ml-2 mt-3' and @required]");
    private By continueButton = By.xpath("//button[@type='submit' and @class='btn1 mr-3']");

    private By usernameInputField = By.xpath("//input[@type='text' and @placeholder='Username' and @class='form-control mt-3']");
    private By passwordInputField = By.xpath("//input[@type='password' and @placeholder='Password' and @class='form-control mt-3']");

    public void setUsername(String username) {
        set(usernameInputField, username);
    }
    public void setPassword(String password) {
        set(passwordInputField, password);
    }
    public void setName(String name) {
        set(nameInputField, name);
    }
    public void setSurname(String surname) {
        set(surnameInputField, surname);
    }
    public void setContact(String contact) {
        set(contactInputField, contact);
    }
    public void setEmail(String email) {
        set(emailInputField, email);
    }
    public void selectClient() {
        clickJS(clientRadioButton);
    }
    public void checkAgreementBox() {
        if (!find(agreementCheckBox).isSelected()) click(agreementCheckBox);
    }
    public MainPage createAccount() {
        click(continueButton);
        return new MainPage();
    }

}
