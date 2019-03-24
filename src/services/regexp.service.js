class ServiceRegexp{
    isValidName(name){
        return REGEXP.NAME.test(name);
    }
    isValidSurname(surname){
        return REGEXP.SURNAME.test(surname);
    }
    isValidAge(age){
        return REGEXP.AGE.test(age);
    }
    isValidPhone(phone){
        return REGEXP.PHONE.test(phone);
    }
}