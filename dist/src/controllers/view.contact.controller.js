"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewControllerContact =
/*#__PURE__*/
function () {
  function ViewControllerContact(_viewContact, _fetchService, _serviceContact, _serviceRegexp) {
    _classCallCheck(this, ViewControllerContact);

    this._viewContact = _viewContact;
    this._fetchService = _fetchService;
    this._serviceContact = _serviceContact;
    this._serviceRegexp = _serviceRegexp;
    this.addClickPhones();
    this.buttonAddClickCreateContact();
    this.addClickInputImage();
    this.fieldsRegExp();
    this.addEventsDragDropImage();
  }

  _createClass(ViewControllerContact, [{
    key: "addClickPhones",
    value: function addClickPhones() {
      this._viewContact.ICON_ADD_PHONES.addEventListener(EVENT_LISTENER.CLICK, function () {
        this.addContainerPhone("");
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
    key: "takeDataContactDOM",
    //*GLOBAL
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

  return ViewControllerContact;
}();
//# sourceMappingURL=view.contact.controller.js.map
