class FetchService{
    constructor(_serviceContact, _viewContact){
        this._serviceContact = _serviceContact;
        this._viewContact = _viewContact;
    }
    fetchContact(route, verb, data){
        const url = 'http://localhost:3005'+route;
        const init = {
        headers: {
            'Content-type': 'application/json'
        },
        method: verb,
        body : JSON.stringify(data) || null
        };
        return fetch(url, init).then(result => result.json());
    }

    fetchCreateContact(route, verb, data){
        return this.fetchContact(route, verb, data).then(result => {
            this._serviceContact.contacts[result.id] = this._serviceContact.contacts[CONTACT.DEFAULT];
            this._serviceContact.contacts[result.id]._id = result.id;
            delete this._serviceContact.contacts[CONTACT.DEFAULT];
            this._viewContact.document.getElementById(CONTACT.DEFAULT).id = result.id;
            return result.id;
        });
    }
}