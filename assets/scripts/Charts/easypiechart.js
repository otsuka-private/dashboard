'use strict';

// workingTimePercentage

const workingTimeToday = localStorage.getItem(`workingTime${localStorage.getItem('dayToday')}`);
const wakingTimeToday = localStorage.getItem(`wakingTime${localStorage.getItem('dayToday')}`);
const workingPercontageToday = +workingTimeToday / +wakingTimeToday * 100;
document.getElementById('chart-working-percentage').setAttribute('data-percent', workingPercontageToday);
document.querySelector('#chart-working-percentage p').textContent = parseInt(workingPercontageToday) + '%';

new EasyPieChart(document.getElementById('chart-working-percentage'), {
  barColor: '#00bfa5',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});

const programmingNow = localStorage.getItem(`programmingNow`);
const programmingAll = localStorage.getItem(`programmingAll`);
const programmingPercentage = +programmingNow / +programmingAll * 100;
document.getElementById('chart-programming-percentage').setAttribute('data-percent', programmingPercentage);
document.querySelector('#chart-programming-percentage p').textContent = parseInt(programmingPercentage) + '%';

new EasyPieChart(document.getElementById('chart-programming-percentage'), {
  barColor: '#90a4ae',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});

// readingProgress

document.getElementById('chart-reading').setAttribute('data-percent', parseInt(+localStorage.getItem('pageRead') * 100 / localStorage.getItem('pageAll')));
document.querySelector('#chart-reading p').textContent = parseInt(+localStorage.getItem('pageRead') * 100 / localStorage.getItem('pageAll')) + '%';

new EasyPieChart(document.getElementById('chart-reading'), {
  barColor: '#8d6e63',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});
