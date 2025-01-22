package hr.fer.sportconnect.test;

import org.openqa.selenium.NoSuchElementException;
import org.testng.Assert;
import org.testng.annotations.Test;
import util.BasePage;
import util.pages.MainPage;
import util.pages.MyProfilePage;
import util.pages.SignInPage;

public class UpgradeFromGoldTest extends BaseTest {
    @Test
    public void testUpgradeFromGold() {
        SignInPage signInPage = homePage.openSignIn();
        signInPage.setUsername("busmalis");
        signInPage.setPassword("123456");
        MainPage mainPage = signInPage.signIn();

        MyProfilePage myProfilePage = mainPage.openMyProfile();

        try {
            myProfilePage.upgradeNow();
        }catch (NoSuchElementException e) {
            Assert.assertFalse(myProfilePage.isElementPresent());
        }
    }
}
