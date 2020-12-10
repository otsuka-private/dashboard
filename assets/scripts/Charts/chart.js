'use strict';

////////// chart style configuration

Chart.defaults.global.elements.point.backgroundColor = 'transparent';
Chart.defaults.global.elements.line.borderCapStyle = "round";
Chart.defaults.global.animation.duration = 2000;
Chart.defaults.global.animation.easing = 'easeInOutCubic';

////////// drawing charts

new Chart(document.getElementById('waking-time-bar'), {
  "type": "line",
  "data": {
    "labels": ['月', '火', '水', '木', '金', '土', '日'],
    "datasets": [{
      "label": "今週",
      "data": [
        localStorage.getItem('wakingTime1'),
        localStorage.getItem('wakingTime2'),
        localStorage.getItem('wakingTime3'),
        localStorage.getItem('wakingTime4'),
        localStorage.getItem('wakingTime5'),
        localStorage.getItem('wakingTime6'),
        localStorage.getItem('wakingTime0'),
      ],
      "borderColor": "#f50057",
      lineTension: 0.2,
      "fill": false,
    }, {
      "label": "先週",
      "data": [
        localStorage.getItem('wakingTime1LastWeek'),
        localStorage.getItem('wakingTime2LastWeek'),
        localStorage.getItem('wakingTime3LastWeek'),
        localStorage.getItem('wakingTime4LastWeek'),
        localStorage.getItem('wakingTime5LastWeek'),
        localStorage.getItem('wakingTime6LastWeek'),
        localStorage.getItem('wakingTime0LastWeek'),
      ],
      "type": "line",
      "fill": false,
      "borderColor": "#ff80ab",
      lineTension: 0.2
    }]
  },
  "options": {
    "scales": {
      "yAxes": [{
        "ticks": {
          "beginAtZero": true
        }
      }]
    }
  }
});

new Chart(document.getElementById('working-time-bar'), {
  type: 'line',
  data: {
    labels: ['月', '火', '水', '木', '金', '土', '日'],
    datasets: [{
        label: '今週',
        data: [
          localStorage.getItem('workingTime1'),
          localStorage.getItem('workingTime2'),
          localStorage.getItem('workingTime3'),
          localStorage.getItem('workingTime4'),
          localStorage.getItem('workingTime5'),
          localStorage.getItem('workingTime6'),
          localStorage.getItem('workingTime0'),
        ],
        borderColor: '#00bfa5',
        fill: false,
        lineTension: 0.2
      },
      {
        label: '先週',
        data: [
          localStorage.getItem('workingTime1LastWeek'),
          localStorage.getItem('workingTime2LastWeek'),
          localStorage.getItem('workingTime3LastWeek'),
          localStorage.getItem('workingTime4LastWeek'),
          localStorage.getItem('workingTime5LastWeek'),
          localStorage.getItem('workingTime6LastWeek'),
          localStorage.getItem('workingTime0LastWeek'),
        ],
        borderColor: '#64ffda',
        fill: false,
        lineTension: 0.2
      }
    ]
  },
  options: {
    "scales": {
      "yAxes": [{
        "ticks": {
          "beginAtZero": true
        }
      }]
    }
  }
});

new Chart(document.getElementById('working-time-percentage-bar'), {
  type: 'line',
  data: {
    labels: ['月', '火', '水', '木', '金', '土', '日'],
    datasets: [{
        label: '今週',
        data: [
          parseInt(localStorage.getItem('workingTime1') / localStorage.getItem('wakingTime1') * 100),
          parseInt(localStorage.getItem('workingTime2') / localStorage.getItem('wakingTime2') * 100),
          parseInt(localStorage.getItem('workingTime3') / localStorage.getItem('wakingTime3') * 100),
          parseInt(localStorage.getItem('workingTime4') / localStorage.getItem('wakingTime4') * 100),
          parseInt(localStorage.getItem('workingTime5') / localStorage.getItem('wakingTime5') * 100),
          parseInt(localStorage.getItem('workingTime6') / localStorage.getItem('wakingTime6') * 100),
          parseInt(localStorage.getItem('workingTime0') / localStorage.getItem('wakingTime0') * 100)
          ],
        borderColor: '#ff6d00',
        fill: false,
        lineTension: 0.2
      },
      {
        label: '先週',
        data: [
          parseInt(localStorage.getItem('workingTime1LastWeek') / localStorage.getItem('wakingTime1LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime2LastWeek') / localStorage.getItem('wakingTime2LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime3LastWeek') / localStorage.getItem('wakingTime3LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime4LastWeek') / localStorage.getItem('wakingTime4LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime5LastWeek') / localStorage.getItem('wakingTime5LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime6LastWeek') / localStorage.getItem('wakingTime6LastWeek') * 100),
          parseInt(localStorage.getItem('workingTime0LastWeek') / localStorage.getItem('wakingTime0LastWeek') * 100)
        ],
        borderColor: '#ffd180',
        fill: false,
        lineTension: 0.2
      }
    ]
  },
  options: {
    "scales": {
      "yAxes": [{
        "ticks": {
          "beginAtZero": true
        }
      }]
    }
  }
});

const todai = +localStorage.getItem('categoryTodaiHour') * 60 + +localStorage.getItem('categoryTodaiMinute');
const js = +localStorage.getItem('categoryJsHour') * 60 + +localStorage.getItem('categoryJsMinute');
const website = +localStorage.getItem('categoryWebsiteHour') * 60 + +localStorage.getItem('categoryWebsiteMinute');
const reading = +localStorage.getItem('categoryReadingHour') * 60 + +localStorage.getItem('categoryReadingMinute');
const rest = +localStorage.getItem('categoryRestHour') * 60 + +localStorage.getItem('categoryRestMinute');
const amount = todai + js + website + reading + rest;

new Chart(document.getElementById('category-time-doughnut'), {
  type: 'doughnut',
  data: {
    labels: ['東大', 'プログラミング', 'ポケヨビ', '読書', '休憩'],
    datasets: [{
      data: [
        todai / amount * 100,
        js / amount * 100,
        website / amount * 100,
        reading / amount * 100,
        rest / amount * 100
      ],
      backgroundColor: ['#f44336', '#90a4ae', '#e91e63', '#795548', '#4caf50']
    }]
  },
});

new Chart(document.getElementById('this-month-spent'), {
  type: 'line',
  data: {
    labels: ['1', '2', '3','4', '5', '6','7', '8', '9','10', '11', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '',],
    datasets: [{
      data: [2000, 4000, 2400, 2400, 3400, 1000, 4200,2000, 4000, 2400, 2400, 3400, 1000, 4200,2000, 4000, 2400, 2400, 3400, 1000, 4200,2000, 4000, 2400, 2400, 3400, 1000, 4200,2000],
      borderColor: '#ff8f00',
      fill: false,
      lineTension: 0.2,
      borderWidth: 2,
      radius: 3
    }]
  },
});

new Chart(document.getElementById('category-money-doughnut'), {
  type: 'doughnut',
  data: {
    labels: ['食費', '交通費', '生活費', '公共料金＆その他'],
    datasets: [{
      data: [
        40,
        20,
        15,
        25
      ],
      backgroundColor: ['#f44336', '#90a4ae', '#e91e63', '#795548'],
    }]
  },
});
