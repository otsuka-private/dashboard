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
  barColor: '#ff6d00',
  scaleColor: false,
  lineWidth: 15,
  size: 200
});
