import SignInPage from '../pageobjects/signIn.Page';
import SignUpPage from '../pageobjects/signUp.Page';
import signUp from '../../testData/MyStore.json';
import MyAccountPage from '../pageobjects/myAccount.Page';
import WomenSectionPage from '../pageobjects/womenWardrobe.Page';
import randomData from "faker";
import ShoppingCartSummaryPage from '../pageobjects/shoppingCart.Page';
import AddressPage from '../pageobjects/address.Page';
import ShippingPage from '../pageobjects/shipping.Page';
import PaymentsPage from '../pageobjects/payments.page';
import OrderConfirmationPage from '../pageobjects/orderDetails.page'


describe('Login to MyStore', () => {
    it('should navigate and see text as Your Personal Information', async () => {
        await SignInPage.homePageLink()
        await SignInPage.clickOnSignIn.click();
        await SignInPage.enterEmailAddress.setValue(randomData.internet.email());
        await SignInPage.clickOnCreateAccountButton.click();
        await expect(SignUpPage.pageHeading).toHaveText("YOUR PERSONAL INFORMATION");
    });
    it('should see a popup message of product being successfully added', async () => {
        await SignUpPage.radioButton.isSelected();
        await SignUpPage.setName(signUp.Name.firstName, signUp.Name.lastName, signUp.Name.password);
        await SignUpPage.setDOB(signUp.DOB.day, signUp.DOB.month, signUp.DOB.year);
        await SignUpPage.setAddress(signUp.Address.addressFirstName,signUp.Address.addressFirstName);
        await SignUpPage.companyName.setValue(signUp.Address.company);
        await SignUpPage.address.setValue(signUp.Address.address);
        await SignUpPage.city.setValue(signUp.Address.city);
        await SignUpPage.state.selectByAttribute('value', signUp.Address.state);
        await SignUpPage.zipCode.setValue(signUp.Address.zipcode);
        await SignUpPage.country.selectByVisibleText(signUp.Address.country);
        await SignUpPage.mobileNumber.setValue(signUp.Address.mobileNumber);
        await SignUpPage.aliasAddress.setValue(signUp.Address.aliasAddress);
        await SignUpPage.registerButton.click();
        await MyAccountPage.clickOnWomenSection.click();
        await WomenSectionPage.hoverOnProduct.scrollIntoView();
        await WomenSectionPage.addToCartButton.click();
        await expect(WomenSectionPage.addToCartMessage).toHaveText("Product successfully added to your shopping cart");
    });
    it('should navigate and validate the Shopping Cart Page details', async () => {
        await WomenSectionPage.clickOnProceedToCartButton.click();
        await expect(ShoppingCartSummaryPage.shoppingCartSummaryText).toHaveTextContaining("SHOPPING-CART SUMMARY");
    });
    it('should navigate to Addresses Page and validate the details', async () => {
        await ShoppingCartSummaryPage.productProceedToCheckOut.click();
        await expect(AddressPage.addressText).toHaveText('ADDRESSES');
        await expect(AddressPage.chooseDeliveryOption).toHaveText('Choose a delivery address:');
    });
    it('should navigate to next page and validate shipping details', async () => {
        await AddressPage.addressDropDownList.selectByVisibleText("Homecoming");
        await AddressPage.clickOnCheckOutButton.click();
        await expect(ShippingPage.shippingHeaderText).toHaveText("SHIPPING");
        await expect(ShippingPage.checkBoxText).toHaveText("Terms of service");
    });
    it('should be navigated and validate payments page', async () => {
        await ShippingPage.selectingCheckBox.click();
        await ShippingPage.proceedToCheckOutButton.click();
        await expect(PaymentsPage.choosePaymentMethodText).toHaveText("PLEASE CHOOSE YOUR PAYMENT METHOD");
    });

    it('navigate and validate the order confirmation page', async () => {
        await PaymentsPage.choosePaymentType.click();
        await PaymentsPage.clickOnConfirmOrder.click();
        await expect(OrderConfirmationPage.orderConfirmationText).toHaveText("ORDER CONFIRMATION");
        await expect(OrderConfirmationPage.orderConfirmDetailsText).toHaveText("Your order on My Store is complete.")
    });

});