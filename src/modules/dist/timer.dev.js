"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timer = void 0;

var timer = function timer(deadline) {
  var timerItems = document.querySelectorAll('.count>span');
  var countName = document.querySelectorAll('.count-name');

  var timing = function timing() {
    var dateStop = new Date(deadline).getTime();
    var dateNow = new Date().getTime();
    var timeGap = (dateStop - dateNow) / 1000;
    var days = Math.floor(timeGap / 60 / 60 / 24);
    var hours = Math.floor(timeGap / 60 / 60) % 24;
    var minutes = Math.floor(timeGap / 60) % 60;
    var seconds = Math.floor(timeGap % 60);
    return {
      timeGap: timeGap,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  };

  var wordDeclension = function wordDeclension(name, value, className) {
    countName.forEach(function (item) {
      if (item.classList.contains("".concat(className))) {
        if (value % 10 > 1 && value % 10 < 5) item.textContent = name[0];else if (value % 10 == 1 && value != 11) item.textContent = name[1];else item.textContent = name[2];
      }
    });
  };

  var timeReload = function timeReload() {
    var getTime = timing();
    timerItems.forEach(function (item) {
      var daysArr = ['Дня', 'День', 'Дней'];
      var hoursArr = ['Часа', 'Час', 'Часов'];
      var minutesArr = ['Минуты', 'Минута', 'Минут'];
      var secondsArr = ['Секунды', 'Секунда', 'Секунд'];

      if (item.classList.contains('count-days')) {
        item.textContent = getTime.days;
        wordDeclension(daysArr, item.textContent, 'days');
      }

      if (item.classList.contains('count-hours')) {
        item.textContent = getTime.hours;
        wordDeclension(hoursArr, item.textContent, 'hours');
      }

      if (item.classList.contains('count-minutes')) {
        item.textContent = getTime.minutes;
        wordDeclension(minutesArr, item.textContent, 'minutes');
      }

      if (item.classList.contains('count-seconds')) {
        item.textContent = getTime.seconds;
        wordDeclension(secondsArr, item.textContent, 'seconds');
      }

      if (item.textContent.length < 2) {
        item.textContent = "0" + item.textContent;
      }
    });
  };

  var getTime = timing();
  var idInterval = setInterval(function () {
    if (getTime.timeGap > 0) {
      timeReload();
    } else {
      clearTimeout(idInterval);
    }
  }, 1000);
};

exports.timer = timer;