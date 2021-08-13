"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.calc'); // валидация

  Pristine.addValidator("my-range", function (value, param1, param2) {
    return parseInt(param1) <= value && value <= parseInt(param2);
  }, "Значение должно быть не больше ${2}", 5, false);
  Pristine.addValidator("my-range2", function (value) {
    return value.indexOf('_') == -1;
  }, "Телефон указан неверно", 5, false);
  var pristine = new Pristine(form, {
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
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // check if the form is valid

    var valid = pristine.validate(); // returns true or false

    if (valid) {
      form.classList.add('active');
    }
  });
  Inputmask({
    "mask": "+7 (999) 999-99-99"
  }).mask(document.querySelectorAll(".phone")); // Калькулятор Своё дело. КАСКО

  if (document.getElementById('form1')) {
    // Поля формы
    var form1__typeInput = document.getElementById('form1__typeInput').querySelectorAll('input');
    var form1__type = document.querySelectorAll('.form1__type');
    var form1__type__arr = [[1.8, 2.5, 1, 4], [1.08, 1.5, 0.6, 2.4]];
    var total = document.getElementById('total');
    var totalInput = document.getElementById('total-input');
    var priceInput = document.getElementById('price'); // подписка на события

    priceInput.addEventListener('input', function () {
      formCounter();
    });
    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('change', function () {
        formCounter();
      });
    });
    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('input', function () {
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
      totalPrice = totalPrice.toFixed(2);
      total.textContent = totalPrice;
      totalInput.setAttribute('value', totalPrice);
    };

    formCounter();
  } // Калькулятор Своё дело.
  // Спецтехника


  if (document.getElementById('form2')) {
    var _total = document.getElementById('total');

    var _totalInput = document.getElementById('total-input');

    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('change', function () {
        _formCounter();
      });
    });
    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('input', function () {
        _formCounter();
      });
    });

    var _formCounter = function _formCounter() {
      var price = document.getElementById('price').value;
      var coef = 0.13;
      var count = document.querySelectorAll('.form2__row').length;
      var totalPrice = price * coef * count;
      totalPrice = totalPrice.toFixed(2);
      _total.textContent = totalPrice;

      _totalInput.setAttribute('value', totalPrice);
    };

    _formCounter();

    var addTech = document.getElementById('add-tech');
    var htmlBlock = document.querySelector('.form2__row');
    document.addEventListener('click', function (e) {
      if (e.target.closest('.delete')) {
        e.target.closest('.form2__row').remove();
        addTech.closest('.calc-add').classList.remove('max');

        _formCounter();
      }
    });
    addTech.addEventListener('click', function () {
      addTechF();
    });

    var addTechF = function addTechF() {
      var count = document.querySelectorAll('.form2__row').length;
      var htmlBlockClone = htmlBlock.cloneNode(true);

      if (count <= 4) {
        document.querySelector('.form2__row-wrap').appendChild(htmlBlockClone);
        document.querySelector('.form2__row-wrap').classList.add('active');

        if (count == 4) {
          addTech.closest('.calc-add').classList.add('max');
        }

        _formCounter();

        pristine = new Pristine(form, {
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
      }
    };
  } // Калькулятор Своё дело.
  // Грузоперевозки


  if (document.getElementById('form3')) {
    var _total2 = document.getElementById('total');

    var _totalInput2 = document.getElementById('total-input');

    var form3Variats = document.getElementById('form3Variat').querySelectorAll('input');
    var form3__type__arr = [[0.0012, 0.0009, 0.0005, 0.0007], [0.002, 0.0017, 0.0013, 0.0015]];
    var form3__typeInputs = document.getElementById('form3__typeInputs').querySelectorAll('input');
    form3Variats.forEach(function (el) {
      return el.addEventListener('change', function () {
        refreshCoef3(el);
      });
    }); // Изменить кофициенты

    var refreshCoef3 = function refreshCoef3(el) {
      var val = el.getAttribute('value');
      form3__typeInputs.forEach(function (input, index) {
        input.setAttribute('value', form3__type__arr[val][index]);
      });

      _formCounter2();
    };

    var _formCounter2 = function _formCounter2() {
      var price = document.getElementById('price').value;
      var coef110 = 1;

      if (document.getElementById('varian110').checked) {
        coef110 = 1.1;
      }

      var coef = document.getElementById('form3__typeInputs').querySelector('input:checked').value;
      var totalPrice = price * coef110 * coef;
      totalPrice = totalPrice.toFixed(2);
      _total2.textContent = totalPrice;

      _totalInput2.setAttribute('value', totalPrice);
    };

    _formCounter2();

    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('change', function () {
        _formCounter2();
      });
    });
    form.querySelectorAll('input').forEach(function (el) {
      return el.addEventListener('input', function () {
        _formCounter2();
      });
    });
  }
});
//# sourceMappingURL=main.js.map
