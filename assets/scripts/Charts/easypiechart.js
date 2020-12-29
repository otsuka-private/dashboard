'use strict';

// workingTimePercentage

const workingTimeToday = localStorage.getItem(`workingTime${localStorage.getItem('dayToday')}`);
const wakingTimeToday = localStorage.getItem(`wakingTime${localStorage.getItem('dayToday')}`);
const workingPercontageToday = +workingTimeToday / +wakingTimeToday * 100;
if (parseInt(workingPercontageToday)) {
  document.getElementById('chart-working-percentage').setAttribute('data-percent', workingPercontageToday);
  document.querySelector('#chart-working-percentage p').textContent = `${parseInt(workingPercontageToday)}%`;
} else {
  document.querySelector('#chart-working-percentage p').textContent = '0%';
}

new EasyPieChart(document.getElementById('chart-working-percentage'), {
  barColor: '#00bfa5',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});

const programmingProgress1 = localStorage.getItem(`programmingProgress1`);
const programmingProgress2 = localStorage.getItem(`programmingProgress2`);
const programmingAll = localStorage.getItem(`programmingAll`);

const programmingPercentage = (+programmingProgress1 + +programmingProgress2) / +programmingAll * 100;
if (programmingPercentage) {
  document.getElementById('chart-programming-percentage').setAttribute('data-percent', programmingPercentage);
  document.querySelector('#chart-programming-percentage p').textContent = `${parseInt(programmingPercentage)}%`;
} else {
  document.querySelector('#chart-programming-percentage p').textContent = '0%';
}

new EasyPieChart(document.getElementById('chart-programming-percentage'), {
  barColor: '#90a4ae',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});

// readingProgress

if (+localStorage.getItem('pageRead') && +localStorage.getItem('pageAll')) {
  document.getElementById('chart-reading').setAttribute('data-percent', parseInt(+localStorage.getItem('pageRead') * 100 / localStorage.getItem('pageAll')));
  document.querySelector('#chart-reading p').textContent = parseInt(+localStorage.getItem('pageRead') * 100 / localStorage.getItem('pageAll')) + '%';
} else {
  document.querySelector('#chart-reading p').textContent = '0%';
}

new EasyPieChart(document.getElementById('chart-reading'), {
  barColor: '#8d6e63',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});

// new EasyPieChart(document.getElementById('chart-test'), {
//   barColor: '#8d6e63',
//   scaleColor: false,
//   lineWidth: 15,
//   size: 200
// });
