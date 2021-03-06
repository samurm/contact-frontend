"use strict";

var TEXT_HTML = {
  ALPHABET: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  CREATE: 'crear',
  DELETE: 'eliminar',
  UPDATE: 'actualizar',
  MAN: 'Hombre'
};
var ALERT_TITLE = {
  ERROR_FIELD: "mal introducido"
};
var ALERT_MESSAGE = {
  ERROR_NAME: "Debe tener mínimo 3 carácteres y solo letras.",
  ERROR_SURNAME: "Debe tener mínimo 4 carácteres y solo letras.",
  ERROR_AGE: "Mínimo 0 años hasta 99",
  ERROR_PHONE: "Formato de teléfono válido: 6/7/8/9 + 8 números"
};
var ALERT_ICON = {
  WARNING: 'warning',
  ERROR: 'error'
};
var ORDER_CONTACTS = {
  EDAD: 'age',
  NOMBRE: 'name',
  APELLIDOS: 'surname',
  DEFAULT: 'NOMBRE'
};
var EVENT_LISTENER = {
  CLICK: 'click',
  CHANGE: 'change',
  BLUR: 'blur',
  DRAG_OVER: 'dragover',
  DROP: 'drop'
};
var FONTAWESOME = {
  OK: 'correct',
  KO: 'incorrect'
};
var FETCH_VERBS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};
var URL = {
  CONTACTS: '/contacts',
  ID: '/id',
  CREATE: '/create',
  UPDATE: '/update'
};
var COMPONENT_HTML = {
  DIV_CONTAINER_ALPHABET: 'divAlphabet',
  SELECT_FILTER_FIELD: 'selectFilter',
  CONTAINER_CONTACTS: 'containerContacts',
  CONTAINER_PHONES: 'containerPhones',
  ICON_ADD_PHONES: 'addPhones',
  ICON_REFRESH_CONTACT: 'newContact',
  NAME_CONTACT: 'nameContact',
  SURNAME_CONTACT: 'surnameContact',
  AGE_CONTACT: 'ageContact',
  PHONE_CONTACT: 'phoneInput0',
  CONTAINER_BUTTONS: 'rowButtons',
  ID_PHONE_INPUT: 'phoneInput',
  SELECT_GENDER_CONTACT: 'genderContact',
  BUTTON_CREATE_CONTACT: 'createContact',
  BUTTON_REFRESH_CONTACT: 'refreshContacts',
  INPUT_IMAGE: 'inputImage',
  IMAGE_CONTACT: 'imageContact'
};
var REGEXP = {
  NAME: /^[A-Z|a-z]{3,50}/,
  SURNAME: /^[A-Z|a-z]{4,50}/,
  AGE: /^[0-9]{1,2}/,
  PHONE: /^[6789]{1}[0-9]{8}$/
};
var ATTRIBUTE_HTML = {
  ID: 'id'
};
var ELEMENTS_HTML = {
  DIV: 'div',
  LABEL: 'label',
  IMG: 'img',
  P: 'p',
  INPUT: 'input',
  SPAN: 'span',
  BUTTON: 'button'
};
var MODEL = {
  PHOTO: 'assets/img/contacts.png',
  CAMERA: 'assets/img/camera.png'
};
var STYLE = {
  LETTER: 'letter',
  ROW: 'row',
  FORM_CONTROL: 'form-control',
  COL_SM_2: 'col-sm-2',
  COL_SM_4: 'col-sm-4',
  COL_SM_6: 'col-sm-6',
  COL_SM_8: 'col-sm-8',
  COL_SM_12: 'col-sm-12',
  AVATAR: 'avatar',
  CONTACT: 'contact',
  PADDING_TOP_NORMAL: 'padding-top-normal',
  GLYPHICON: 'glyphicon',
  GLYPHICON_MINUS: 'glyphicon-minus',
  ICON: 'icon',
  TEXT_RIGHT: 'text-right',
  TEXT_LEFT: 'text-left',
  BTN: 'btn',
  BTN_INFO: 'btn-info',
  BTN_DANGER: 'btn-danger'
};
var FIELD = {
  NAME: 'Nombre ',
  SURNAME: 'Apellido ',
  AGE: 'Edad ',
  PHONE: 'Telefono ',
  GENDER: 'Género '
};
var CONTACT = {
  DEFAULT: 'Default'
};
//# sourceMappingURL=contact.constant.js.map
