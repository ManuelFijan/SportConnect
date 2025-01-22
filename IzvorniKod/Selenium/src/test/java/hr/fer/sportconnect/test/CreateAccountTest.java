package hr.fer.sportconnect.test;

import org.testng.Assert;
import org.testng.annotations.Test;
import util.pages.CreateAccountPage;
import util.pages.MainPage;

public class CreateAccountTest extends BaseTest{
    @Test
    public void testCreateAccount(){
        CreateAccountPage createAccountPage = homePage.openCreateAccount();
        createAccountPage.selectClient();
        createAccountPage.setName("Veron");
        createAccountPage.setSurname("Schillinger");
        createAccountPage.setUsername("schillinger");
        createAccountPage.setContact("+385 92508313");
        createAccountPage.setEmail("schillinger@gmail.com");
        createAccountPage.setPassword("123456789");
        createAccountPage.checkAgreementBox();
        MainPage mainPage = createAccountPage.createAccount();
        Assert.assertTrue(mainPage.isThisMainPage());
    }
}
