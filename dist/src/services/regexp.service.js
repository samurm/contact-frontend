"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ServiceRegexp =
/*#__PURE__*/
function () {
  function ServiceRegexp() {
    _classCallCheck(this, ServiceRegexp);
  }

  _createClass(ServiceRegexp, [{
    key: "isValidName",
    value: function isValidName(name) {
      return REGEXP.NAME.test(name);
    }
  }, {
    key: "isValidSurname",
    value: function isValidSurname(surname) {
      return REGEXP.SURNAME.test(surname);
    }
  }, {
    key: "isValidAge",
    value: function isValidAge(age) {
      return REGEXP.AGE.test(age);
    }
  }, {
    key: "isValidPhone",
    value: function isValidPhone(phone) {
      return REGEXP.PHONE.test(phone);
    }
  }]);

  return ServiceRegexp;
}();
//# sourceMappingURL=regexp.service.js.map
