"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ControllerContact =
/*#__PURE__*/
function () {
  function ControllerContact(_viewContact, _fetchService, _serviceContact, _serviceRegexp, _localService) {
    var _this = this;

    _classCallCheck(this, ControllerContact);

    this._viewContact = _viewContact;
    this._fetchService = _fetchService;
    this._serviceContact = _serviceContact;
    this._serviceRegexp = _serviceRegexp;
    this._localService = _localService;
    this.createSearchAlphabet();
    this.selectFilterAddChange();
    this.addClickPhones();
    this.addClickNewContact();
    this.addClickRefreshContact();
    this.buttonAddClickCreateContact();
    this.addClickInputImage();
    this.fieldsRegExp();
    this.addEventsDragDropImage();

    this._fetchService.fetchContact(URL.CONTACTS + URL.UPDATE, FETCH_VERBS.GET).then(function (dataContacts) {
      if (dataContacts.lastUpdate === localStorage.getItem("lastUpdate")) {
        _this._localService.getContacts().then(function (contacts) {
          _this.loadContacts(contacts);
        });
      } else {
        _this._fetchService.fetchContact(URL.CONTACTS, FETCH_VERBS.GET).then(function (resultContacts) {
          _this.loadContacts(resultContacts);

          _this._localService.chargeContacts(resultContacts);

          localStorage.setItem("lastUpdate", dataContacts.lastUpdate);
        });
      }
    });
  }

  _createClass(ControllerContact, [{
    key: "createSearchAlphabet",
    value: function createSearchAlphabet() {
      var _this2 = this;

      var alphabet = TEXT_HTML.ALPHABET.split('');

      var _loop = function _loop(i, max) {
        var label = _this2.createElementAndAddClassId(ELEMENTS_HTML.LABEL, [STYLE.LETTER], alphabet[i]);

        label.addEventListener(EVENT_LISTENER.CLICK, function () {
          this._serviceContact.removeContact(CONTACT.DEFAULT);

          this._serviceContact.letterToFind = alphabet[i];
          this.refreshContacs();
        }.bind(_this2));
        label.innerHTML = alphabet[i];

        _this2._viewContact.DIV_CONTAINER_ALPHABET.appendChild(label);
      };

      for (var i = 0, max = alphabet.length; i < max; ++i) {
        _loop(i, max);
      }

      ;
    }
  }, {
    key: "selectFilterAddChange",
    value: function selectFilterAddChange() {
      this._viewContact.SELECT_FILTER_FIELD.addEventListener(EVENT_LISTENER.CHANGE, function () {
        this._serviceContact.removeContact(CONTACT.DEFAULT);

        this._serviceContact.filterContacts = this._viewContact.SELECT_FILTER_FIELD.value.toUpperCase();
        this.refreshContacs();
      }.bind(this));
    }
  }, {
    key: "addClickPhones",
    value: function addClickPhones() {
      this._viewContact.ICON_ADD_PHONES.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.addContainerPhone("");
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
    }
  }, {
    key: "buttonAddClickCreateContact",
    value: function buttonAddClickCreateContact() {
      this._viewContact.BUTTON_CREATE_CONTACT.addEventListener(EVENT_LISTENER.CLICK, this.createContact.bind(this));
    }
  }, {
    key: "addClickInputImage",
    value: function addClickInputImage() {
      this._viewContact.INPUT_IMAGE.addEventListener(EVENT_LISTENER.CHANGE, function () {
        var file = this._viewContact.INPUT_IMAGE.files[0];
        this.changeImage(file);
      }.bind(this));
    }
  }, {
    key: "fieldsRegExp",
    value: function fieldsRegExp() {
      this._viewContact.NAME_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateName.bind(this));

      this._viewContact.SURNAME_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateSurname.bind(this));

      this._viewContact.AGE_CONTACT.addEventListener(EVENT_LISTENER.BLUR, this.validateAge.bind(this));

      this._viewContact.PHONE_CONTACT.addEventListener(EVENT_LISTENER.BLUR, function () {
        this.validatePhone(this._viewContact.PHONE_CONTACT);
      }.bind(this));
    }
  }, {
    key: "changeImage",
    value: function changeImage(file) {
      var img = this._viewContact.IMAGE_CONTACT;
      var reader = new FileReader();

      reader.onloadend = function () {
        img.src = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        img.src = MODEL.CAMERA;
      }
    }
  }, {
    key: "addEventsDragDropImage",
    value: function addEventsDragDropImage() {
      this._viewContact.IMAGE_CONTACT.addEventListener(EVENT_LISTENER.DRAG_OVER, this.overImage);

      this._viewContact.IMAGE_CONTACT.addEventListener(EVENT_LISTENER.DROP, function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var file = files[0];
        this.changeImage(file);
      }.bind(this));
    }
  }, {
    key: "overImage",
    value: function overImage(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: "validateName",
    value: function validateName() {
      return this._serviceRegexp.isValidName(this._viewContact.NAME_CONTACT.value) ? this.setOkStatus(this._viewContact.NAME_CONTACT) : this.setKOStatus(this._viewContact.NAME_CONTACT);
    }
  }, {
    key: "validateSurname",
    value: function validateSurname() {
      return this._serviceRegexp.isValidSurname(this._viewContact.SURNAME_CONTACT.value) ? this.setOkStatus(this._viewContact.SURNAME_CONTACT) : this.setKOStatus(this._viewContact.SURNAME_CONTACT);
    }
  }, {
    key: "validateAge",
    value: function validateAge() {
      return this._serviceRegexp.isValidAge(this._viewContact.AGE_CONTACT.value) ? this.setOkStatus(this._viewContact.AGE_CONTACT) : this.setKOStatus(this._viewContact.AGE_CONTACT);
    }
  }, {
    key: "validatePhone",
    value: function validatePhone(field) {
      return this._serviceRegexp.isValidPhone(field.value) ? this.setOkStatus(field) : this.setKOStatus(field);
    }
  }, {
    key: "setOkStatus",
    value: function setOkStatus(field) {
      this.setStatus(field, FONTAWESOME.OK);
      return true;
    }
  }, {
    key: "setKOStatus",
    value: function setKOStatus(field) {
      this.setStatus(field, FONTAWESOME.KO);
      return false;
    }
  }, {
    key: "setStatus",
    value: function setStatus(field, status) {
      field.classList = status;
      field.classList.add(STYLE.FORM_CONTROL);
    }
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
    }
  }, {
    key: "createContact",
    value: function createContact() {
      var _this3 = this;

      var data = this.takeDataContactDOM(CONTACT.DEFAULT);
      this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
      this.cleanContainerButtonContact();

      this._serviceContact.addContact(data);

      this.createContainerContact(data);

      this._fetchService.fetchCreateContact(URL.CONTACTS + URL.CREATE, FETCH_VERBS.POST, data).then(function (id) {
        _this3._viewContact.document.getElementById(id).addEventListener(EVENT_LISTENER.CLICK, function () {
          this._localService.updateOrCreateContact(this._serviceContact.contacts[id]);

          this.selectContact(id);
        }.bind(_this3));
      });
    }
  }, {
    key: "selectContact",
    value: function selectContact(idContact) {
      var contactSelected = this._serviceContact.contacts[idContact];
      var listPhone = contactSelected.phone.split(",");
      this.editContainerContact(contactSelected.photo, contactSelected.name, contactSelected.surname, contactSelected.age, listPhone, contactSelected.gender);
      this.editContainerButtonContact(idContact);
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

      this._localService.deleteContact(idContact);

      this._viewContact.document.getElementById(idContact).remove();
    }
  }, {
    key: "updateContact",
    value: function updateContact(idContact) {
      var data = this.takeDataContactDOM(idContact);

      this._serviceContact.addContact(data);

      this._localService.updateOrCreateContact(this._serviceContact.contacts[idContact]);

      this._fetchService.fetchContact(URL.CONTACTS + URL.UPDATE, FETCH_VERBS.POST, data);

      this.editContainerContact("", "", "", "", [""], TEXT_HTML.MAN);
      this.cleanContainerButtonContact();
      this.refreshOneContact(data);
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
  }, {
    key: "editContainerContact",
    value: function editContainerContact(photo, name, surname, age, listPhone, gender) {
      this._serviceContact.phoneInput = 1;
      this._viewContact.INPUT_IMAGE.value = "";
      this._viewContact.IMAGE_CONTACT.src = photo || MODEL.CAMERA;
      this._viewContact.NAME_CONTACT.value = name;
      this._viewContact.SURNAME_CONTACT.value = surname;
      this._viewContact.AGE_CONTACT.value = age;
      this._viewContact.PHONE_CONTACT.value = listPhone[0];
      this._viewContact.GENDER_CONTACT.value = gender;
      var firstContainerPhone = this._viewContact.CONTAINER_PHONES.children[0];
      this._viewContact.CONTAINER_PHONES.innerHTML = "";

      this._viewContact.CONTAINER_PHONES.appendChild(firstContainerPhone);

      for (var i = 1, max = listPhone; i < max.length; ++i) {
        this.addContainerPhone(max[i]);
      }

      ;
    }
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
    }
  }, {
    key: "refreshContacs",
    value: function refreshContacs() {
      this._viewContact.DIV_CONTAINER_CONTACTS.innerHTML = "";
      this.loadContacts(this._serviceContact.orderedContacts(this._serviceContact.filterContacts, this._serviceContact.letterToFind));
    }
  }, {
    key: "loadContacts",
    value: function loadContacts(resultContacts) {
      var _this4 = this;

      var _arr = Object.keys(resultContacts);

      var _loop2 = function _loop2() {
        var contact = _arr[_i];

        _this4._serviceContact.addContact(resultContacts[contact]);

        var divRow = _this4.createContainerContact(resultContacts[contact]);

        divRow.addEventListener(EVENT_LISTENER.CLICK, function () {
          this.selectContact(resultContacts[contact]._id);
        }.bind(_this4));
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop2();
      }
    }
  }, {
    key: "createContainerContact",
    value: function createContainerContact(data) {
      var divRow = this.createElementAndAddClassId(ELEMENTS_HTML.DIV, [STYLE.ROW, STYLE.CONTACT], data._id);
      var divColAvatar = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_4]);
      var imgAvatar = this.createElementAndAddClass(ELEMENTS_HTML.IMG, [STYLE.AVATAR]);
      imgAvatar.src = data.photo || MODEL.PHOTO;
      var divColInformation = this.createElementAndAddClass(ELEMENTS_HTML.DIV, [STYLE.COL_SM_8]);
      var pName = this.createElementAndAddInner(ELEMENTS_HTML.P, data.name);
      var pSurname = this.createElementAndAddInner(ELEMENTS_HTML.P, data.surname);
      var pAge = this.createElementAndAddInner(ELEMENTS_HTML.P, data.age);
      var pPhone = this.createElementAndAddInner(ELEMENTS_HTML.P, data.phone);
      var pGender = this.createElementAndAddInner(ELEMENTS_HTML.P, data.gender);
      this.appendChildElements(divColInformation, [pName, pSurname, pAge, pPhone, pGender]);
      divColAvatar.appendChild(imgAvatar);
      this.appendChildElements(divRow, [divColAvatar, divColInformation]);

      this._viewContact.DIV_CONTAINER_CONTACTS.appendChild(divRow);

      return divRow;
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
    }
  }]);

  return ControllerContact;
}();
//# sourceMappingURL=contact.controller.js.map
