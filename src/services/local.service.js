class LocalService{
    constructor(_serviceContact, indexedDb){
        this._serviceContact = _serviceContact;
        this.indexedDb = indexedDb;
        this.request = this.indexedDb.open("mydatabaseBooks");

        this.request.addEventListener("error", this.showerror);
        this.request.addEventListener("success", this.start.bind(this));
        this.request.addEventListener("upgradeneeded", this.createdb);
    }
    chargeContacts(contacts){
        const mytransaction = this.db.transaction(['contacts'], "readwrite");
        const storeContacts = mytransaction.objectStore('contacts');
        for(const contact of contacts){
            storeContacts.put({id: contact._id, age:contact.age, gender: contact.gender, name: contact.name, name_normalized: contact.name_normalized, phone: contact.phone, photo: contact.photo, surname: contact.surname, surname_normalized: contact.surname_normalized});
        }
    }

    updateOrCreateContact(contact){
        const mytransaction = this.db.transaction(['contacts'], "readwrite");
        const storeContacts = mytransaction.objectStore('contacts');
        storeContacts.put({id: contact._id, age:contact.age, gender: contact.gender, name: contact.name, name_normalized: contact.name_normalized, phone: contact.phone, photo: contact.photo, surname: contact.surname, surname_normalized: contact.surname_normalized});
    }

    deleteContact(id){
        const mytransaction = this.db.transaction(['contacts'], "readwrite");
        const storeConctacts = mytransaction.objectStore('contacts');
        storeConctacts.delete(id);
    }

    getContacts(){
        return new Promise((resolve,reject) => {
            const mytransaction = this.db.transaction(["contacts"]);
            const storeConctacts = mytransaction.objectStore("contacts");
            const request = storeConctacts.openCursor();
            const contacts = [];
            request.onsuccess = function(event){
                const cursor = event.target.result;
                if(cursor){
                    contacts[cursor.value.id] = {
                        _id: cursor.value.id, 
                        gender: cursor.value.gender,
                        age: cursor.value.age,
                        name: cursor.value.name,
                        name_normalized: cursor.value.name_normalized,
                        phone: cursor.value.phone,
                        photo: cursor.value.photo,
                        surname: cursor.value.surname,
                        surname_normalized: cursor.value.surname_normalized 
                    }
                    cursor.continue();
                }else{
                    resolve(contacts);
                }
            }
        })
        /* TODO: it doesnt work with then
        return storeConctacts.openCursor().then(function(cursor){
            const contacts = {};
            if (cursor) {
                contacts[cursor.value.id] = {_id: cursor.value.id, 
                                             gender: cursor.value.gender,
                                             name: cursor.value.name,
                                             name_normalized: cursor.value.name_normalized,
                                             phone: cursor.value.phone,
                                             photo: cursor.value.photo,
                                             surname: cursor.value.surname,
                                             surname_normalized: cursor.value.surname_normalized 
                                            }
                cursor.continue();
            }
            return contacts;
        }); */
    }

    showerror(e) {
        alert("Error: " + e.code + " " + e.message);
    }
    start(e) {
        this.db = e.target.result;
    } 
    createdb(e) {
        const datababase = e.target.result;
        const storeContacts = datababase.createObjectStore("contacts", { keyPath: "id" });
        storeContacts.createIndex("SearchName", "name", { unique: false });
    }
}