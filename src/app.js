const documentContact = window.document;
const viewContact = new ViewContact(documentContact);
const serviceContact = new ServiceContact();
const indexedDb = indexedDB;
const localService = new LocalService(serviceContact, indexedDb);
const fetchService = new FetchService(serviceContact,viewContact);
const serviceRegexp = new ServiceRegexp();
new ControllerContact(viewContact, fetchService, serviceContact, serviceRegexp, localService);