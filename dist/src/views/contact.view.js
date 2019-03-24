"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewContact =
/*#__PURE__*/
function () {
  //TODO: SHOULD I USE A GET, OR I SHOULD CALL THEM IN THE CONSTRUCTOR, LIKE A PUBLIC VARIABLE
  function ViewContact(_document) {
    _classCallCheck(this, ViewContact);

    this.document = _document;
  }

  _createClass(ViewContact, [{
    key: "DIV_CONTAINER_ALPHABET",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.DIV_CONTAINER_ALPHABET);
    }
  }, {
    key: "DIV_CONTAINER_CONTACTS",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.CONTAINER_CONTACTS);
    }
  }, {
    key: "SELECT_FILTER_FIELD",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.SELECT_FILTER_FIELD);
    }
  }, {
    key: "CONTAINER_PHONES",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.CONTAINER_PHONES);
    }
  }, {
    key: "ICON_ADD_PHONES",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.ICON_ADD_PHONES);
    }
  }, {
    key: "ICON_REFRESH_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.ICON_REFRESH_CONTACT);
    }
  }, {
    key: "NAME_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.NAME_CONTACT);
    }
  }, {
    key: "SURNAME_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.SURNAME_CONTACT);
    }
  }, {
    key: "AGE_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.AGE_CONTACT);
    }
  }, {
    key: "GENDER_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.SELECT_GENDER_CONTACT);
    }
  }, {
    key: "PHONE_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.PHONE_CONTACT);
    }
  }, {
    key: "CONTAINER_BUTTONS",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.CONTAINER_BUTTONS);
    }
  }, {
    key: "BUTTON_CREATE_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.BUTTON_CREATE_CONTACT);
    }
  }, {
    key: "BUTTON_REFRESH_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.BUTTON_REFRESH_CONTACT);
    }
  }, {
    key: "INPUT_IMAGE",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.INPUT_IMAGE);
    }
  }, {
    key: "IMAGE_CONTACT",
    get: function get() {
      return this.document.getElementById(COMPONENT_HTML.IMAGE_CONTACT);
    }
  }]);

  return ViewContact;
}();
//# sourceMappingURL=contact.view.js.map
