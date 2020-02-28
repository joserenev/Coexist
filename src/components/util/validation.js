const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNumberRegex = /^\d{10}$/;

function isValidEmail(emailAddress) {
    if (emailRegex.test(emailAddress)) {
        return true;
    }
    return false;
}

function isValidPhoneNumber(number) {
    if (phoneNumberRegex.test(number)) {
        return true;
    }
    return false;
}

export { isValidEmail, isValidPhoneNumber };
