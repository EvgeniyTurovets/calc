"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // расчет формы (Калькулятор Своё дело. КАСКО)
  if (document.getElementById('form1')) {
    var form1 = document.getElementById('form1'); // валидация

    Pristine.addValidator("my-range", function (value, param1, param2) {
      return parseInt(param1) <= value && value <= parseInt(param2);
    }, "Значение должно быть не больше ${2}", 5, false);
    Pristine.addValidator("my-range2", function (value) {
      return value.indexOf('_') == -1;
    }, "Телефон указан неверно", 5, false);
    var pristine = new Pristine(form1, {
      classTo: 'form-group',
      errorClass: 'error',
      successClass: 'has-success',
      // class of the parent element where error text element is appended
      errorTextParent: 'form-group',
      // type of element to create for the error text
      errorTextTag: 'div',
      // class of the error text element
      errorTextClass: 'error__text'
    });
    form1.addEventListener('submit', function (e) {
      e.preventDefault(); // check if the form is valid

      var valid = pristine.validate(); // returns true or false

      if (valid) {
        form1.classList.add('active');
      }
    });
    Inputmask({
      "mask": "+7 (999) 999-99-99"
    }).mask(document.querySelectorAll(".phone")); // Поля формы

    var form1__typeInput = document.getElementById('form1__typeInput').querySelectorAll('input');
    var form1__type = document.querySelectorAll('.form1__type');
    var form1__type__arr = [[1.8, 2.5, 1, 4], [1.08, 1.5, 0.6, 2.4]];
    var total = document.getElementById('total');
    var totalInput = document.getElementById('total-input');
    var priceInput = document.getElementById('price'); // подписка на события

    priceInput.addEventListener('input', function () {
      formCounter();
    });
    form1.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('change', function () {
        formCounter();
      });
    });
    form1__type.forEach(function (el) {
      return el.addEventListener('change', function () {
        refreshCoef(el);
      });
    }); // Изменить кофициенты

    var refreshCoef = function refreshCoef(el) {
      var val = el.getAttribute('value');
      form1__typeInput.forEach(function (input, index) {
        input.setAttribute('value', form1__type__arr[val][index]);
      });
      formCounter();
    }; // Расчет премии


    var formCounter = function formCounter() {
      var coef = document.getElementById('form1__typeInput').querySelector('input:checked').value;
      var price = document.getElementById('price').value;
      var totalPrice = coef / 100 * price;
      totalPrice = Math.floor(totalPrice);
      total.textContent = totalPrice;
      totalInput.setAttribute('value', totalPrice);
    };

    formCounter();
  }
});
//# sourceMappingURL=main.js.map
