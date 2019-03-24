class Contact{
    constructor({name, surname, age, phone, gender, photo, _id}){
        this._photo = photo;
        this._name = name;
        this._surname = surname;
        this._age = age;
        this._phone = phone;
        this.gender = gender;
        this._id = _id;
    }

    set _name(value){
        if(!REGEXP.NAME.test(value)){
            throw ({FIELD:FIELD.NAME, MESSAGE:ALERT_MESSAGE.ERROR_NAME});
        }
        return this.name = value;
    }

    set _surname(value){
        if(!REGEXP.SURNAME.test(value)){
            throw ({FIELD:FIELD.SURNAME, MESSAGE:ALERT_MESSAGE.ERROR_SURNAME});
        }
        return this.surname = value;
    }

    set _age(value){
        if(!REGEXP.AGE.test(value)){
            throw ({FIELD:FIELD.AGE, MESSAGE:ALERT_MESSAGE.ERROR_AGE});
        }
        return this.age = value;
    }

    set _phone(value){
        const values = value.split(",");
        for(let i=0;i<values.length;++i){
            if(!REGEXP.PHONE.test(values[i])){
                throw ({FIELD:FIELD.PHONE, MESSAGE:ALERT_MESSAGE.ERROR_PHONE});
            }
        }
        return this.phone = value;
    }

    set _photo(value){
        if(value.includes(MODEL.CAMERA)){
            value = "";
        }
        return this.photo = value;
    }

}