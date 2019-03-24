"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ListControllerContact =
/*#__PURE__*/
function () {
  function ListControllerContact(_viewContact, _fetchService, _serviceContact) {
    _classCallCheck(this, ListControllerContact);

    this._viewContact = _viewContact;
    this._fetchService = _fetchService;
    this._serviceContact = _serviceContact;
    this.selectFilterAddChange();
    this.addClickNewContact();
    this.addClickRefreshContact();
  }

  _createClass(ListControllerContact, [{
    key: "selectFilterAddChange",
    value: function selectFilterAddChange() {
      this._viewContact.SELECT_FILTER_FIELD.addEventListener(EVENT_LISTENER.CHANGE, function () {
        this._serviceContact.removeContact(CONTACT.DEFAULT);

        this._serviceContact.filterContacts = this._viewContact.SELECT_FILTER_FIELD.value.toUpperCase();
        this.refreshContacs();
      }.bind(this));
    }
  }, {
    key: "addClickNewContact",
    value: function addClickNewContact() {
      this._viewContact.ICON_REFRESH_CONTACT.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
        this.cleanContainerButtonContact();
      }.bind(this));
    }
  }, {
    key: "addClickRefreshContact",
    value: function addClickRefreshContact() {
      this._viewContact.BUTTON_REFRESH_CONTACT.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
        this.cleanContainerButtonContact();
        this._serviceContact.letterToFind = null;
        this.refreshContacs();
      }.bind(this));
    } //*GLOBAL

  }, {
    key: "addContainerPhone",
    value: function addContainerPhone(valueInputPhone) {
      var divRow = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.ROW, STYLE.PADDING_TOP_NORMAL]);
      var colLeft = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_4]);
      var colMiddle = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6]);
      var inputPhone = this.createElementAndAddClassId(ELEMENTS_HTML.INPUT, [STYLE.FORM_CONTROL], COMPONENT_HTML.ID_PHONE_INPUT + this._serviceContact.phoneInput);
      inputPhone.value = valueInputPhone;
      inputPhone.addEventListener(EVENT_LISTENER.BLUR, function () {
        this.validatePhone(inputPhone);
      }.bind(this));
      var colRight = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_2]);
      var iconSubtractPhone = this.createElementAndAddClass(ELEMENTS_HTML.SPAN, [STYLE.GLYPHICON, STYLE.GLYPHICON_MINUS, STYLE.ICON]);
      iconSubtractPhone.addEventListener(EVENT_LISTENER.CLICK, function () {
        divRow.remove();
        this._serviceContact.phoneInput -= 1;
      }.bind(this));
      colMiddle.appendChild(inputPhone);
      colRight.appendChild(iconSubtractPhone);
      this.appendChildElements(divRow, [colLeft, colMiddle, colRight]);

      this._viewContact.CONTAINER_PHONES.appendChild(divRow);

      this._serviceContact.phoneInput += 1;
    } //*GLOBAL

  }, {
    key: "validatePhone",
    value: function validatePhone(field) {
      return this._serviceRegexp.isValidPhone(field.value) ? this.setOkStatus(field) : this.setKOStatus(field);
    }
  }, {
    key: "editContainerButtonContact",
    value: function editContainerButtonContact(idContact) {
      var divColLeft = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6, STYLE.TEXT_RIGHT]);
      var divColRight = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_6, STYLE.TEXT_RIGHT]);
      var buttonDelete = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_DANGER]);
      var buttonUpdate = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_INFO]);
      buttonDelete.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.deleteContact(idContact);
      }.bind(this));
      buttonUpdate.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.updateContact(idContact);
      }.bind(this));
      buttonDelete.innerHTML = TEXT_HTML.DELETE;
      buttonUpdate.innerHTML = TEXT_HTML.UPDATE;
      divColLeft.appendChild(buttonDelete);
      divColRight.appendChild(buttonUpdate);
      this._viewContact.CONTAINER_BUTTONS.innerHTML = "";
      this.appendChildElements(this._viewContact.CONTAINER_BUTTONS, [divColLeft, divColRight]);
    }
  }, {
    key: "deleteContact",
    value: function deleteContact(idContact) {
      var data = {
        id: idContact
      };

      this._fetchService.fetchContact(URL.CONTACTS, FETCH_VERBS.DELETE, data);

      this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
      this.cleanContainerButtonContact();

      this._serviceContact.removeContact(idContact);

      this._viewContact.document.getElementById(idContact).remove();
    }
  }, {
    key: "updateContact",
    value: function updateContact(idContact) {
      var data = this.takeDataContactDOM(idContact);

      this._serviceContact.addContact(data);

      this._fetchService.fetchContact(URL.CONTACTS + URL.UPDATE, FETCH_VERBS.POST, data);

      this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
      this.cleanContainerButtonContact();
      this.refreshOneContact(data);
    } //viewContact

  }, {
    key: "cleanContainerButtonContact",
    value: function cleanContainerButtonContact() {
      var divCol = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_12, STYLE.TEXT_RIGHT]);
      var buttonCreate = this.createElementAndAddClass(ELEMENTS_HTML.BUTTON, [STYLE.BTN, STYLE.BTN_INFO]);
      buttonCreate.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.createContact();
      }.bind(this));
      buttonCreate.innerHTML = TEXT_HTML.CREATE;
      divCol.appendChild(buttonCreate);
      this._viewContact.CONTAINER_BUTTONS.innerHTML = "";

      this._viewContact.CONTAINER_BUTTONS.appendChild(divCol);
    } //viewContact *GLOBAL

  }, {
    key: "createContact",
    value: function createContact() {
      var _this = this;

      var data = this.takeDataContactDOM(CONTACT.DEFAULT);
      this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
      this.cleanContainerButtonContact();

      this._serviceContact.addContact(data);

      this.createContainerContact(data);

      this._fetchService.fetchCreateContact(URL.CONTACTS + URL.CREATE, FETCH_VERBS.POST, data).then(function (id) {
        _this._viewContact.document.getElementById(id).addEventListener(EVENT_LISTENER.CLICK, function () {
          this.selectContact(id);
        }.bind(_this));
      });
    }
  }, {
    key: "refreshOneContact",
    value: function refreshOneContact(contact) {
      var divRowContactPreviously = this._viewContact.document.getElementById(contact._id);

      divRowContactPreviously.id = contact._id;
      var divRowElements = divRowContactPreviously.children;
      var img = divRowElements[0].children[0];
      img.src = contact.photo;
      var divColData = divRowElements[1].children;
      var name = divColData[0];
      var surname = divColData[1];
      var age = divColData[2];
      var phones = divColData[3];
      var gender = divColData[4];
      name.innerHTML = contact.name;
      surname.innerHTML = contact.surname;
      age.innerHTML = contact.age;
      phones.innerHTML = contact.phone;
      gender.innerHTML = contact.gender;
    }
  }, {
    key: "createElementAndAddClass",
    value: function createElementAndAddClass(element, classes) {
      var _newElement$classList;

      var newElement = this._viewContact.document.createElement(element);

      (_newElement$classList = newElement.classList).add.apply(_newElement$classList, _toConsumableArray(classes));

      return newElement;
    }
  }, {
    key: "createElementAndAddClassId",
    value: function createElementAndAddClassId(element, classes, id) {
      var newElement = this.createElementAndAddClass(element, classes);
      newElement.id = id;
      return newElement;
    }
  }, {
    key: "createElementAndAddInner",
    value: function createElementAndAddInner(element, text) {
      var newElement = this._viewContact.document.createElement(element);

      newElement.innerHTML = text;
      return newElement;
    }
  }, {
    key: "appendChildElements",
    value: function appendChildElements(elementFather, elements) {
      for (var i = 0, max = elements.length; i < max; ++i) {
        elementFather.appendChild(elements[i]);
      }
    } //*GLOBAL

  }, {
    key: "takeDataContactDOM",
    value: function takeDataContactDOM(idContact) {
      var photoContact = this._viewContact.IMAGE_CONTACT.src;
      var nameContact = this._viewContact.NAME_CONTACT.value;
      var surnameContact = this._viewContact.SURNAME_CONTACT.value;
      var ageContact = this._viewContact.AGE_CONTACT.value;
      var phonesContactContainer = this._viewContact.CONTAINER_PHONES.children;
      var phonesContact = [];

      for (var i = 0, max = phonesContactContainer; i < max.length; ++i) {
        phonesContact = _toConsumableArray(phonesContact).concat([this._viewContact.document.getElementById(COMPONENT_HTML.ID_PHONE_INPUT + i).value]);
      }

      phonesContact = phonesContact.join();
      var genderContact = this._viewContact.GENDER_CONTACT.value;
      var data = {
        _id: idContact,
        photo: photoContact,
        name: nameContact,
        surname: surnameContact,
        age: ageContact,
        phone: phonesContact,
        gender: genderContact
      };
      return data;
    }
  }]);

  return ListControllerContact;
}();
//# sourceMappingURL=list.contact.controller.js.map
