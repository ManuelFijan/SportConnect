package util.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import util.BasePage;

public class EditProfilePage extends BasePage {
    private By usernameInputField = By.xpath("//input[@type='text' and @name='userName']");
    private By saveChangesButton = By.xpath("//button[contains(@class, 'button-save') and text()='Save Changes']");
    private By incorrectUsernameFormatMessage = By.xpath("//div[text()='Incorrect username format']");
    public void changeUsername(String username) {
        set(usernameInputField, username);
    }
    public void saveChanges(){
        click(saveChangesButton);
    }
    public boolean isMessagePresent() {
        try {
            getDriver().findElement(incorrectUsernameFormatMessage);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
