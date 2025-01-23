package util.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import util.BasePage;

import static util.JavaScriptUtility.scrollToElementJS;

public class MyProfilePage extends BasePage {
    private By editProfileButton = By.xpath("//div[@class='profile-container-main']//button[text()='Edit Profile']");
    private By upgradeButton = By.xpath("//a[text()='Upgrade Now' and contains(@class, 'bg-[#a7fbcb]')]");

    public EditProfilePage openEditProfile() {
        scrollToElementJS(editProfileButton);
        click(editProfileButton);
        return new EditProfilePage();
    }
    public void upgradeNow() {
        click(upgradeButton);
    }
    public boolean isElementPresent() {
        try {
            getDriver().findElement(upgradeButton);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
