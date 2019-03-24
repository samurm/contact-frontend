"use strict";

var documentContact = window.document;
var viewContact = new ViewContact(documentContact);
var serviceContact = new ServiceContact();
var indexedDb = indexedDB;
var localService = new LocalService(serviceContact, indexedDb);
var fetchService = new FetchService(serviceContact, viewContact);
var serviceRegexp = new ServiceRegexp();
new ControllerContact(viewContact, fetchService, serviceContact, serviceRegexp, localService);
//# sourceMappingURL=app.js.map
