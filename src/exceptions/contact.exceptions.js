class ExceptionContact extends Error {
    constructor(field, message){
        this.field = field;
        this.message = message;
        this.alert();
    }

    alert(){
        swal( this.field+ALERT_TITLE.ERROR_FIELD, this.message, ALERT_ICON.ERROR);
    }
}