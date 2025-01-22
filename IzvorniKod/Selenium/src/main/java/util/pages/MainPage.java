package util.pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import util.BasePage;
import java.time.Duration;

import static util.JavaScriptUtility.clickJS;

public class MainPage extends BasePage {
    private By textPostInputField = By.xpath("//div[@class='textarea-container']//textarea");
    private By myProfileButton = By.xpath("//button[contains(text(), 'My profile')]");
    private By postButton = By.xpath("//button[contains(@class, 'post-button') and text()='Post it!']");
    private By homeButton = By.xpath("//span[@class='font-semibold' and text()='Home']");

    public MyProfilePage openMyProfile() {
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        wait.until(ExpectedConditions.elementToBeClickable(myProfileButton));
        click(myProfileButton);
        return new MyProfilePage();
    }
    public void setTextPost(String text) {
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(textPostInputField));
        clickJS(textPostInputField);
        set(textPostInputField, text);
    }
    public void postIt() {
        click(postButton);
    }
    public void acceptAlert() {
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        wait.until(ExpectedConditions.alertIsPresent());
        Alert alert = getDriver().switchTo().alert();
        alert.accept();
    }
    public boolean isPostVisible(String text) {
        String xpath = String.format("//span[@class='text-textColor break-all' and normalize-space(text())='%s']", text);

        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpath)));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }
    public boolean isThisMainPage() {
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(homeButton));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

}
