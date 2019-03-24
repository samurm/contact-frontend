class ServiceContact{
    constructor(){
        this.contacts = {};
        this.letterToFind = null;
        this.filterContacts = ORDER_CONTACTS.DEFAULT;
        this.phoneInput = 1;
    }

    addContact(contact){
        try{
            const newContact = new Contact(contact);
            this.contacts[contact._id] = newContact;
        }catch(e){
            throw new ExceptionContact(e.FIELD, e.MESSAGE);
        }
    }

    removeContact(idContact){
        delete this.contacts[idContact];
    }

    orderedContacts(orderType, orderLetter){
        const orderTypeTranslate = ORDER_CONTACTS[orderType];
        const contacts = Object.values(this.contacts);
        if(orderTypeTranslate == ORDER_CONTACTS.EDAD){
            contacts.sort((a,b) => a[orderTypeTranslate] - b[orderTypeTranslate]);
        }else{
            contacts.sort((a,b) => a[orderTypeTranslate].toLowerCase().localeCompare(b[orderTypeTranslate].toLowerCase()));
        }
        if(orderLetter != null){
           return contacts.filter(a => a.name[0].toUpperCase() == this.letterToFind);
        }
        return contacts;
    }
}