class ViewContact{
    //TODO: SHOULD I USE A GET, OR I SHOULD CALL THEM IN THE CONSTRUCTOR, LIKE A PUBLIC VARIABLE
    constructor(_document){
        this.document = _document;
    }

    get DIV_CONTAINER_ALPHABET(){
        return this.document.getElementById(COMPONENT_HTML.DIV_CONTAINER_ALPHABET);
    }

    get DIV_CONTAINER_CONTACTS(){
        return this.document.getElementById(COMPONENT_HTML.CONTAINER_CONTACTS);
    }

    get SELECT_FILTER_FIELD(){
        return this.document.getElementById(COMPONENT_HTML.SELECT_FILTER_FIELD);
    }

    get CONTAINER_PHONES(){
        return this.document.getElementById(COMPONENT_HTML.CONTAINER_PHONES);
    }

    get ICON_ADD_PHONES(){
        return this.document.getElementById(COMPONENT_HTML.ICON_ADD_PHONES);
    }

    get ICON_REFRESH_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.ICON_REFRESH_CONTACT);
    }

    get NAME_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.NAME_CONTACT);
    }

    get SURNAME_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.SURNAME_CONTACT);
    }

    get AGE_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.AGE_CONTACT);
    }

    get GENDER_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.SELECT_GENDER_CONTACT);
    }

    get PHONE_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.PHONE_CONTACT);
    }

    get CONTAINER_BUTTONS(){
        return this.document.getElementById(COMPONENT_HTML.CONTAINER_BUTTONS);
    }

    get BUTTON_CREATE_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.BUTTON_CREATE_CONTACT);
    }

    get BUTTON_REFRESH_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.BUTTON_REFRESH_CONTACT);
    }

    get INPUT_IMAGE(){
        return this.document.getElementById(COMPONENT_HTML.INPUT_IMAGE);
    }

    get IMAGE_CONTACT(){
        return this.document.getElementById(COMPONENT_HTML.IMAGE_CONTACT);
    }
}