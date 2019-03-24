"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Contact =
/*#__PURE__*/
function () {
  function Contact(_ref) {
    var name = _ref.name,
        surname = _ref.surname,
        age = _ref.age,
        phone = _ref.phone,
        gender = _ref.gender,
        photo = _ref.photo,
        _id = _ref._id;

    _classCallCheck(this, Contact);

    this._photo = photo;
    this._name = name;
    this._surname = surname;
    this._age = age;
    this._phone = phone;
    this.gender = gender;
    this._id = _id;
  }

  _createClass(Contact, [{
    key: "_name",
    set: function set(value) {
      if (!REGEXP.NAME.test(value)) {
        throw {
          FIELD: FIELD.NAME,
          MESSAGE: ALERT_MESSAGE.ERROR_NAME
        };
      }

      return this.name = value;
    }
  }, {
    key: "_surname",
    set: function set(value) {
      if (!REGEXP.SURNAME.test(value)) {
        throw {
          FIELD: FIELD.SURNAME,
          MESSAGE: ALERT_MESSAGE.ERROR_SURNAME
        };
      }

      return this.surname = value;
    }
  }, {
    key: "_age",
    set: function set(value) {
      if (!REGEXP.AGE.test(value)) {
        throw {
          FIELD: FIELD.AGE,
          MESSAGE: ALERT_MESSAGE.ERROR_AGE
        };
      }

      return this.age = value;
    }
  }, {
    key: "_phone",
    set: function set(value) {
      var values = value.split(",");

      for (var i = 0; i < values.length; ++i) {
        if (!REGEXP.PHONE.test(values[i])) {
          throw {
            FIELD: FIELD.PHONE,
            MESSAGE: ALERT_MESSAGE.ERROR_PHONE
          };
        }
      }

      return this.phone = value;
    }
  }, {
    key: "_photo",
    set: function set(value) {
      if (value.includes(MODEL.CAMERA)) {
        value = "";
      }

      return this.photo = value;
    }
  }]);

  return Contact;
}();
//# sourceMappingURL=contact.model.js.map
