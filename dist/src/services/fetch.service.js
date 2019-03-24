"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FetchService =
/*#__PURE__*/
function () {
  function FetchService(_serviceContact, _viewContact) {
    _classCallCheck(this, FetchService);

    this._serviceContact = _serviceContact;
    this._viewContact = _viewContact;
  }

  _createClass(FetchService, [{
    key: "fetchContact",
    value: function fetchContact(route, verb, data) {
      var url = 'http://localhost:3005' + route;
      var init = {
        headers: {
          'Content-type': 'application/json'
        },
        method: verb,
        body: JSON.stringify(data) || null
      };
      return fetch(url, init).then(function (result) {
        return result.json();
      });
    }
  }, {
    key: "fetchCreateContact",
    value: function fetchCreateContact(route, verb, data) {
      var _this = this;

      return this.fetchContact(route, verb, data).then(function (result) {
        _this._serviceContact.contacts[result.id] = _this._serviceContact.contacts[CONTACT.DEFAULT];
        _this._serviceContact.contacts[result.id]._id = result.id;
        delete _this._serviceContact.contacts[CONTACT.DEFAULT];
        _this._viewContact.document.getElementById(CONTACT.DEFAULT).id = result.id;
        return result.id;
      });
    }
  }]);

  return FetchService;
}();
//# sourceMappingURL=fetch.service.js.map
