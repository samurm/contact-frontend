class ControllerContact{
    constructor(_viewContact, _fetchService ,_serviceContact, _serviceRegexp, _localService){
        this._viewContact = _viewContact;
        this._fetchService = _fetchService;
        this._serviceContact = _serviceContact;
        this._serviceRegexp = _serviceRegexp;
        this._localService = _localService;
        this.createSearchAlphabet();
        this.selectFilterAddChange();
        this.addClickPhones();
        this.addClickNewContact();
        this.addClickRefreshContact();
        this.buttonAddClickCreateContact();
        this.addClickInputImage();
        this.fieldsRegExp();
        this.addEventsDragDropImage();
        this._fetchService.fetchContact(URL.CONTACTS+URL.UPDATE, FETCH_VERBS.GET).then(dataContacts => {
            if(dataContacts.lastUpdate === localStorage.getItem("lastUpdate")){
                this._localService.getContacts().then(contacts => {
                    this.loadContacts(contacts);
                });
            }else{
                this._fetchService.fetchContact(URL.CONTACTS, FETCH_VERBS.GET).then(resultContacts => {
                    this.loadContacts(resultContacts);
                    this._localService.chargeContacts(resultContacts);
                    localStorage.setItem("lastUpdate",dataContacts.lastUpdate);
                });
            }
        });
    }

    createSearchAlphabet(){
        const alphabet = TEXT_HTML.ALPHABET.split('');
        for(let i=0, max=alphabet.length;i<max;++i){
            const label = this.createElementAndAddClassId(ELEMENTS_HTML.LABEL, [STYLE.LETTER], alphabet[i]);
            label.addEventListener(EVENT_LISTENER.CLICK, function(){
                this._serviceContact.removeContact(CONTACT.DEFAULT);
                this._serviceContact.letterToFind = alphabet[i];
                this.refreshContacs();
            }.bind(this));
            label.innerHTML = alphabet[i];
            this._viewContact.DIV_CONTAINER_ALPHABET.appendChild(label);
        };
    };

    selectFilterAddChange(){
        this._viewContact.SELECT_FILTER_FIELD.addEventListener(EVENT_LISTENER.CHANGE, function(){
            this._serviceContact.removeContact(CONTACT.DEFAULT);
            this._serviceContact.filterContacts = (this._viewContact.SELECT_FILTER_FIELD.value).toUpperCase();
            this.refreshContacs();
        }.bind(this));
    }

    addClickPhones(){
        this._viewContact.ICON_ADD_PHONES.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.addContainerPhone("");
        }.bind(this));
    }

    addClickNewContact(){
        this._viewContact.ICON_REFRESH_CONTACT.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.editContainerContact("","", "", "", [""], TEXT_HTML.MAN);
            this.cleanContainerButtonContact();
        }.bind(this));
    }

    addClickRefreshContact(){
        this._viewContact.BUTTON_REFRESH_CONTACT.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.editContainerContact("","", "", "", [""], TEXT_HTML.MAN);
            this.cleanContainerButtonContact();
            this._serviceContact.letterToFind = null;
            this.refreshContacs();
        }.bind(this));
    }

    buttonAddClickCreateContact(){
        this._viewContact.BUTTON_CREATE_CONTACT.addEventListener(EVENT_LISTENER.CLICK, this.createContact.bind(this));
    }

    addClickInputImage(){
        this._viewContact.INPUT_IMAGE.addEventListener(EVENT_LISTENER.CHANGE, function(){
            const file = this._viewContact.INPUT_IMAGE.files[0];
            this.changeImage(file);
        }.bind(this));
    }

    fieldsRegExp(){
        this._viewContact.NAME_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateName.bind(this));
        this._viewContact.SURNAME_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateSurname.bind(this));
        this._viewContact.AGE_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateAge.bind(this));
        this._viewContact.PHONE_CONTACT.addEventListener(EVENT_LISTENER.BLUR, function(){
            this.validatePhone(this._viewContact.PHONE_CONTACT);
        }.bind(this));
    }

    changeImage(file){
        const img = this._viewContact.IMAGE_CONTACT;
        const reader  = new FileReader();
 
        reader.onloadend = function () {
            img.src = reader.result;
        }
 
        if (file) {
            reader.readAsDataURL(file);
        } else {
            img.src = MODEL.CAMERA;
        }
    }

    addEventsDragDropImage(){
        this._viewContact.IMAGE_CONTACT.addEventListener(EVENT_LISTENER.DRAG_OVER, this.overImage);
        this._viewContact.IMAGE_CONTACT.addEventListener(EVENT_LISTENER.DROP, function(e){
            e.stopPropagation();
            e.preventDefault();
            const files = e.dataTransfer.files;
            const file = files[0];
            this.changeImage(file);
        }.bind(this));
    }

    overImage(e){
        e.stopPropagation();
        e.preventDefault();
    }  

    validateName(){
        return this._serviceRegexp.isValidName(this._viewContact.NAME_CONTACT.value)
            ? this.setOkStatus(this._viewContact.NAME_CONTACT)
            : this.setKOStatus(this._viewContact.NAME_CONTACT);
    }

    validateSurname(){
        return this._serviceRegexp.isValidSurname(this._viewContact.SURNAME_CONTACT.value)
            ? this.setOkStatus(this._viewContact.SURNAME_CONTACT)
            : this.setKOStatus(this._viewContact.SURNAME_CONTACT);
    }

    validateAge(){
        return this._serviceRegexp.isValidAge(this._viewContact.AGE_CONTACT.value)
            ? this.setOkStatus(this._viewContact.AGE_CONTACT)
            : this.setKOStatus(this._viewContact.AGE_CONTACT);
    }

    validatePhone(field){
        return this._serviceRegexp.isValidPhone(field.value)
            ? this.setOkStatus(field)
            : this.setKOStatus(field);
    }

    setOkStatus(field) {
        this.setStatus(field, FONTAWESOME.OK);
        return true;
    }
    
    setKOStatus(field) {
        this.setStatus(field, FONTAWESOME.KO);
        return false;
    }

    setStatus(field, status) {
        field.classList = status;
        field.classList.add(STYLE.FORM_CONTROL);
    };

    cleanContainerButtonContact(){
        const divCol = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_12, STYLE.TEXT_RIGHT]);
        const buttonCreate = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_INFO]);
        buttonCreate.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.createContact();
        }.bind(this));
        buttonCreate.innerHTML = TEXT_HTML.CREATE;
        divCol.appendChild(buttonCreate);
        this._viewContact.CONTAINER_BUTTONS.innerHTML = "";
        this._viewContact.CONTAINER_BUTTONS.appendChild(divCol);
    }

    createContact(){
        const data = this.takeDataContactDOM(CONTACT.DEFAULT);
        this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
        this.cleanContainerButtonContact();
        this._serviceContact.addContact(data);
        this.createContainerContact(data);
        this._fetchService.fetchCreateContact(URL.CONTACTS+URL.CREATE, FETCH_VERBS.POST, data).then(id => {
            this._viewContact.document.getElementById(id).addEventListener(EVENT_LISTENER.CLICK, function(){
                this._localService.updateOrCreateContact(this._serviceContact.contacts[id]);
                this.selectContact(id);
            }.bind(this));
        });
    }

    selectContact(idContact){
        const contactSelected = this._serviceContact.contacts[idContact];
        const listPhone = contactSelected.phone.split(",");
        this.editContainerContact(contactSelected.photo, contactSelected.name, contactSelected.surname, contactSelected.age, listPhone, contactSelected.gender);
        this.editContainerButtonContact(idContact);
    } 

    editContainerButtonContact(idContact){
        const divColLeft = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6, STYLE.TEXT_RIGHT]);
        const divColRight = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6, STYLE.TEXT_RIGHT]);
        const buttonDelete = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_DANGER]);
        const buttonUpdate = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_INFO]);
        buttonDelete.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.deleteContact(idContact);
        }.bind(this));
        buttonUpdate.addEventListener(EVENT_LISTENER.CLICK, function(){
            this.updateContact(idContact);
        }.bind(this));
        buttonDelete.innerHTML = TEXT_HTML.DELETE;
        buttonUpdate.innerHTML = TEXT_HTML.UPDATE;
        divColLeft.appendChild(buttonDelete);
        divColRight.appendChild(buttonUpdate);
        this._viewContact.CONTAINER_BUTTONS.innerHTML = "";
        this.appendChildElements(this._viewContact.CONTAINER_BUTTONS, [divColLeft, divColRight]);
    }

    deleteContact(idContact){
        const data = { id : idContact };
        this._fetchService.fetchContact(URL.CONTACTS, FETCH_VERBS.DELETE, data);
        this.editContainerContact("","", "", "", [""], TEXT_HTML.MAN);
        this.cleanContainerButtonContact();
        this._serviceContact.removeContact(idContact);
        this._localService.deleteContact(idContact);
        this._viewContact.document.getElementById(idContact).remove();
    }

    updateContact(idContact){
        const data = this.takeDataContactDOM(idContact);
        this._serviceContact.addContact(data);
        this._localService.updateOrCreateContact(this._serviceContact.contacts[idContact]);
        this._fetchService.fetchContact(URL.CONTACTS+URL.UPDATE, FETCH_VERBS.POST, data);
        this.editContainerContact("","", "", "", [""], TEXT_HTML.MAN);
        this.cleanContainerButtonContact();
        this.refreshOneContact(data);
    }

    refreshOneContact(contact){
        const divRowContactPreviously = this._viewContact.document.getElementById(contact._id);
        divRowContactPreviously.id = contact._id;
        const divRowElements = divRowContactPreviously.children
        const img = divRowElements[0].children[0];
        img.src = contact.photo;
        const divColData = divRowElements[1].children;
        const name = divColData[0];
        const surname = divColData[1];
        const age = divColData[2];
        const phones = divColData[3];
        const gender = divColData[4];
        name.innerHTML = contact.name;
        surname.innerHTML = contact.surname;
        age.innerHTML = contact.age;
        phones.innerHTML = contact.phone;
        gender.innerHTML = contact.gender;
    }

    takeDataContactDOM(idContact){
        const photoContact = this._viewContact.IMAGE_CONTACT.src;
        const nameContact = this._viewContact.NAME_CONTACT.value;
        const surnameContact = this._viewContact.SURNAME_CONTACT.value;
        const ageContact = this._viewContact.AGE_CONTACT.value;
        const phonesContactContainer = this._viewContact.CONTAINER_PHONES.children;
        let phonesContact = [];
        for(let i=0, max=phonesContactContainer; i<max.length; ++i){
            phonesContact = [...phonesContact, this._viewContact.document.getElementById(COMPONENT_HTML.ID_PHONE_INPUT+i).value];
        }
        phonesContact = phonesContact.join();
        const genderContact = this._viewContact.GENDER_CONTACT.value;
        const data = { _id : idContact, photo : photoContact, name : nameContact, surname : surnameContact, age : ageContact, phone : phonesContact, gender : genderContact };
        return data;
    }

    editContainerContact(photo, name, surname, age, listPhone, gender){
        this._serviceContact.phoneInput = 1;
        this._viewContact.INPUT_IMAGE.value = "";
        this._viewContact.IMAGE_CONTACT.src = photo || MODEL.CAMERA;
        this._viewContact.NAME_CONTACT.value = name;
        this._viewContact.SURNAME_CONTACT.value = surname;
        this._viewContact.AGE_CONTACT.value = age;
        this._viewContact.PHONE_CONTACT.value = listPhone[0];
        this._viewContact.GENDER_CONTACT.value = gender;
        const firstContainerPhone = this._viewContact.CONTAINER_PHONES.children[0];
        this._viewContact.CONTAINER_PHONES.innerHTML = "";
        this._viewContact.CONTAINER_PHONES.appendChild(firstContainerPhone);
        for(let i = 1, max=listPhone; i<max.length; ++i){
            this.addContainerPhone(max[i]);
        };
    }

    addContainerPhone(valueInputPhone){
        const divRow = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.ROW, STYLE.PADDING_TOP_NORMAL]);
        const colLeft = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_4]);
        const colMiddle = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6]);
        const inputPhone = this.createElementAndAddClassId(ELEMENTS_HTML.INPUT, [STYLE.FORM_CONTROL], COMPONENT_HTML.ID_PHONE_INPUT+this._serviceContact.phoneInput);
        inputPhone.value = valueInputPhone;
        inputPhone.addEventListener(EVENT_LISTENER.BLUR, function(){
            this.validatePhone(inputPhone);
        }.bind(this));
        const colRight = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_2]);
        const iconSubtractPhone = this.createElementAndAddClass(ELEMENTS_HTML.SPAN, [STYLE.GLYPHICON, STYLE.GLYPHICON_MINUS, STYLE.ICON]);
        iconSubtractPhone.addEventListener(EVENT_LISTENER.CLICK, function(){ 
            divRow.remove();
            this._serviceContact.phoneInput -= 1;
        }.bind(this));
        colMiddle.appendChild(inputPhone);
        colRight.appendChild(iconSubtractPhone);
        this.appendChildElements(divRow, [colLeft, colMiddle, colRight]);
        this._viewContact.CONTAINER_PHONES.appendChild(divRow);
        this._serviceContact.phoneInput += 1;
    }

    refreshContacs(){
        this._viewContact.DIV_CONTAINER_CONTACTS.innerHTML = "";
        this.loadContacts(this._serviceContact.orderedContacts(this._serviceContact.filterContacts, this._serviceContact.letterToFind));
    }

    loadContacts(resultContacts){
        for(const contact of Object.keys(resultContacts)){
            this._serviceContact.addContact(resultContacts[contact]);
            const divRow = this.createContainerContact(resultContacts[contact]);
            divRow.addEventListener(EVENT_LISTENER.CLICK, function(){
                this.selectContact(resultContacts[contact]._id)
            }.bind(this));
        }
    };

    createContainerContact(data){
        const divRow = this.createElementAndAddClassId(ELEMENTS_HTML.DIV, [STYLE.ROW, STYLE.CONTACT],data._id);
        const divColAvatar = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_4]);
        const imgAvatar = this.createElementAndAddClass(ELEMENTS_HTML.IMG, [STYLE.AVATAR]);
        imgAvatar.src = data.photo || MODEL.PHOTO;
        const divColInformation = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_8]);
        const pName = this.createElementAndAddInner(ELEMENTS_HTML.P, data.name);
        const pSurname = this.createElementAndAddInner(ELEMENTS_HTML.P, data.surname);
        const pAge = this.createElementAndAddInner(ELEMENTS_HTML.P, data.age);
        const pPhone = this.createElementAndAddInner(ELEMENTS_HTML.P, data.phone);
        const pGender = this.createElementAndAddInner(ELEMENTS_HTML.P, data.gender);
        this.appendChildElements(divColInformation, [pName, pSurname, pAge, pPhone, pGender]);
        divColAvatar.appendChild(imgAvatar);
        this.appendChildElements(divRow, [divColAvatar, divColInformation]);
        this._viewContact.DIV_CONTAINER_CONTACTS.appendChild(divRow);
        return divRow;
    }

    createElementAndAddClass(element, classes){
        const newElement = this._viewContact.document.createElement(element);
        newElement.classList.add(...classes);
        return newElement;
    }

    createElementAndAddClassId(element, classes, id){
        const newElement = this.createElementAndAddClass(element, classes);
        newElement.id = id;
        return newElement;
    }

    createElementAndAddInner(element, text){
        const newElement = this._viewContact.document.createElement(element);
        newElement.innerHTML = text;
        return newElement;
    }

    appendChildElements(elementFather, elements){
        for(let i=0, max=elements.length; i<max; ++i){
            elementFather.appendChild(elements[i]);
        }
    }
    
}