class SignUpPage {

    get pageHeading() { return $("//*[@id='account-creation_form']/div[1]/h3") }
    get radioButton() { return $("#id_gender1"); }
    get firstName() { return $("//input[@id='customer_firstname']") }
    get lastName() { return $("//input[@id='customer_lastname']") }
    get password() { return $("//input[@id='passwd']") }
    get dobDay() { return $('//select[@id="days"]') }
    get dobMonth() { return $('#months') }
    get dobYear() { return $('//select[@id="years"]') }
    get addressFirstName() { return $('//input[@id="firstname"]') }
    get addressLastName() { return $('//input[@id="lastname"]') }
    get companyName() { return $('#company') }
    get address() { return $('#address1') }
    get city() { return $('//input[@name="city"]') }
    get state() { return $('#id_state') }
    get zipCode() { return $('#postcode') }
    get country() { return $('#id_country') }
    get mobileNumber() { return $('#phone_mobile') }
    get aliasAddress() { return $('#alias') }
    get registerButton() { return $('#submitAccount') }


    async setAddress(address1: string, address2: string) {
        await this.addressFirstName.setValue(address1);
        await this.addressLastName.setValue(address2);
    }
    async setDOB(day:string, month:string, year:string){
        await this.dobDay.selectByAttribute('value',day);
        await this.dobMonth.selectByAttribute('value',month);
        await this.dobYear.selectByAttribute('value',year);

    }
    async setName(fName: string, sName: string, pass: string) {
        await this.firstName.setValue(fName);
        await this.lastName.setValue(sName);
        await this.password.setValue(pass);
    }
}
export default new SignUpPage()