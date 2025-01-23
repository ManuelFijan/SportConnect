package hr.fer.sportconnect.test;

import org.testng.annotations.Test;
import util.pages.MainPage;
import util.pages.SignInPage;

import static org.testng.Assert.assertTrue;

public class PostTextTest extends BaseTest {
    @Test
    public void testPostText() {
        SignInPage signInPage = homePage.openSignIn();
        signInPage.setUsername("mcmanus");
        signInPage.setPassword("mcmanus");
        MainPage mainPage = signInPage.signIn();

        String postText = "In Em City we workout too!";
        mainPage.setTextPost(postText);
        mainPage.postIt();

        mainPage.acceptAlert();
        assertTrue(mainPage.isPostVisible(postText), "The post is not visible on the page.");
    }

}
