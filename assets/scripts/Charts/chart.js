'use strict';

////////// chart style configuration

Chart.defaults.global.elements.point.backgroundColor = 'transparent';
Chart.defaults.global.elements.line.borderCapStyle = 'round';
Chart.defaults.global.animation.duration = 2000;
Chart.defaults.global.animation.easing = 'easeInOutCubic';

////////// drawing charts

new Chart(document.getElementById('waking-time-bar'), {
  'type': 'line',
  'data': {
    'labels': ['月', '火', '水', '木', '金', '土', '日'],
    'datasets': [{
      'label': '今週',
      'data': [
        localStorage.getItem('wakingTime1'),
        localStorage.getItem('wakingTime2'),
        localStorage.getItem('wakingTime3'),
        localStorage.getItem('wakingTime4'),
        localStorage.getItem('wakingTime5'),
        localStorage.getItem('wakingTime6'),
        localStorage.getItem('wakingTime0'),
      ],
      'borderColor': '#f50057',
      lineTension: 0.2,
      'fill': false,
    }, {
      'label': '先週',
      'data': [
        localStorage.getItem('wakingTime1LastWeek'),
        localStorage.getItem('wakingTime2LastWeek'),
        localStorage.getItem('wakingTime3LastWeek'),
        localStorage.getItem('wakingTime4LastWeek'),
        localStorage.getItem('wakingTime5LastWeek'),
        localStorage.getItem('wakingTime6LastWeek'),
        localStorage.getItem('wakingTime0LastWeek'),
      ],
      'type': 'line',
      'fill': false,
      'borderColor': '#ff80ab',
      lineTension: 0.2
    }]
  },
  'options': {
    'scales': {
      'yAxes': [{
        'ticks': {
          'beginAtZero': true
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
    'scales': {
      'yAxes': [{
        'ticks': {
          'beginAtZero': true
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
    'scales': {
      'yAxes': [{
        'ticks': {
          'beginAtZero': true
        }
      }]
    }
  }
});
