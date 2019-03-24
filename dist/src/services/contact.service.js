"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ServiceContact =
/*#__PURE__*/
function () {
  function ServiceContact() {
    _classCallCheck(this, ServiceContact);

    this.contacts = {};
    this.letterToFind = null;
    this.filterContacts = ORDER_CONTACTS.DEFAULT;
    this.phoneInput = 1;
  }

  _createClass(ServiceContact, [{
    key: "addContact",
    value: function addContact(contact) {
      try {
        var newContact = new Contact(contact);
        this.contacts[contact._id] = newContact;
      } catch (e) {
        throw new ExceptionContact(e.FIELD, e.MESSAGE);
      }
    }
  }, {
    key: "removeContact",
    value: function removeContact(idContact) {
      delete this.contacts[idContact];
    }
  }, {
    key: "orderedContacts",
    value: function orderedContacts(orderType, orderLetter) {
      var _this = this;

      var orderTypeTranslate = ORDER_CONTACTS[orderType];
      var contacts = Object.values(this.contacts);

      if (orderTypeTranslate == ORDER_CONTACTS.EDAD) {
        contacts.sort(function (a, b) {
          return a[orderTypeTranslate] - b[orderTypeTranslate];
        });
      } else {
        contacts.sort(function (a, b) {
          return a[orderTypeTranslate].toLowerCase().localeCompare(b[orderTypeTranslate].toLowerCase());
        });
      }

      if (orderLetter != null) {
        return contacts.filter(function (a) {
          return a.name[0].toUpperCase() == _this.letterToFind;
        });
      }

      return contacts;
    }
  }]);

  return ServiceContact;
}();
//# sourceMappingURL=contact.service.js.map
