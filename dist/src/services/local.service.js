"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalService =
/*#__PURE__*/
function () {
  function LocalService(_serviceContact, indexedDb) {
    _classCallCheck(this, LocalService);

    this._serviceContact = _serviceContact;
    this.indexedDb = indexedDb;
    this.request = this.indexedDb.open("mydatabaseBooks");
    this.request.addEventListener("error", this.showerror);
    this.request.addEventListener("success", this.start.bind(this));
    this.request.addEventListener("upgradeneeded", this.createdb);
  }

  _createClass(LocalService, [{
    key: "chargeContacts",
    value: function chargeContacts(contacts) {
      var mytransaction = this.db.transaction(['contacts'], "readwrite");
      var storeContacts = mytransaction.objectStore('contacts');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = contacts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var contact = _step.value;
          storeContacts.put({
            id: contact._id,
            age: contact.age,
            gender: contact.gender,
            name: contact.name,
            name_normalized: contact.name_normalized,
            phone: contact.phone,
            photo: contact.photo,
            surname: contact.surname,
            surname_normalized: contact.surname_normalized
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "updateOrCreateContact",
    value: function updateOrCreateContact(contact) {
      var mytransaction = this.db.transaction(['contacts'], "readwrite");
      var storeContacts = mytransaction.objectStore('contacts');
      storeContacts.put({
        id: contact._id,
        age: contact.age,
        gender: contact.gender,
        name: contact.name,
        name_normalized: contact.name_normalized,
        phone: contact.phone,
        photo: contact.photo,
        surname: contact.surname,
        surname_normalized: contact.surname_normalized
      });
    }
  }, {
    key: "deleteContact",
    value: function deleteContact(id) {
      var mytransaction = this.db.transaction(['contacts'], "readwrite");
      var storeConctacts = mytransaction.objectStore('contacts');
      storeConctacts.delete(id);
    }
  }, {
    key: "getContacts",
    value: function getContacts() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var mytransaction = _this.db.transaction(["contacts"]);

        var storeConctacts = mytransaction.objectStore("contacts");
        var request = storeConctacts.openCursor();
        var contacts = [];

        request.onsuccess = function (event) {
          var cursor = event.target.result;

          if (cursor) {
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
            };
            cursor.continue();
          } else {
            resolve(contacts);
          }
        };
      });
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
  }, {
    key: "showerror",
    value: function showerror(e) {
      alert("Error: " + e.code + " " + e.message);
    }
  }, {
    key: "start",
    value: function start(e) {
      this.db = e.target.result;
    }
  }, {
    key: "createdb",
    value: function createdb(e) {
      var datababase = e.target.result;
      var storeContacts = datababase.createObjectStore("contacts", {
        keyPath: "id"
      });
      storeContacts.createIndex("SearchName", "name", {
        unique: false
      });
    }
  }]);

  return LocalService;
}();
//# sourceMappingURL=local.service.js.map
