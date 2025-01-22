package hr.fer.sportconnect.test;

import org.testng.Assert;
import org.testng.annotations.Test;
import util.BasePage;
import util.pages.EditProfilePage;
import util.pages.MainPage;
import util.pages.MyProfilePage;
import util.pages.SignInPage;

public class IncorrectUsernameChangeTest extends BaseTest {
    @Test
    public void testIncorrectUsernameChange() {
        SignInPage signInPage = homePage.openSignIn();
        signInPage.setUsername("busmalis");
        signInPage.setPassword("123456");
        MainPage mainPage = signInPage.signIn();

        MyProfilePage myProfilePage = mainPage.openMyProfile();
        EditProfilePage editProfilePage = myProfilePage.openEditProfile();
        editProfilePage.changeUsername("bus");
        editProfilePage.saveChanges();
        Assert.assertTrue(editProfilePage.isMessagePresent());

    }
}
