import {
  materializeInitialize
} from './assets/scripts/Libraries/materializeJquery.js';
import {
  CardDayStartEnd
} from './assets/scripts/Cards/CardDayStartEnd.js';
import {
  Category
} from './assets/scripts/Categories/Category.js';
import {
  CardDayRecord
} from './assets/scripts/Cards/CardDayRecord.js';
import {
  FetchData
} from './assets/scripts/Database/FetchData.js';
import {
  SetTodaiCardContent
} from './assets/scripts/Cards/SetTodaiCardContent.js';
import {
  CardProgramming
} from './assets/scripts/Cards/CardProgramming.js';
import {
  CardReading
} from './assets/scripts/Cards/CardReading.js';

class App {
  constructor() {
    materializeInitialize();
    new FetchData();
    new CardDayStartEnd();
    new CardDayRecord();
    new Category();
    new SetTodaiCardContent();
    new CardProgramming();
    new CardReading();
    this.deleteAllBtn();
  }

  deleteAllBtn() {
    document.getElementById('modal-day-start-end-delete-yes').addEventListener('click', () => {
      localStorage.clear();
    });
  }
}

new App();

// test below

const testButton = document.getElementById('test-modal-button-ok');
testButton.addEventListener('click', (event) => {
  const modal = event.target.parentElement.parentElement;
  const inputs = modal.querySelectorAll('input');
  const testArray = [];
  for (const input of inputs) {
    testArray.push(input.value);
  }
  const container = document.getElementById('test-container');
  const template = document.getElementById('template-goal-card');
  const clone = template.content.cloneNode(true);
  clone.querySelector('span').textContent = testArray[0];
  clone.querySelector('#first-span').textContent = testArray[1];
  clone.querySelector('#second-span').textContent = testArray[2];
  const percentage = parseInt(testArray[1] * 100 / testArray[2]);
  clone.querySelector('.chart').setAttribute('data-percent', percentage);
  clone.querySelector('.chart').setAttribute('id', 'random');
  new EasyPieChart(clone.querySelector('.chart'), {
    barColor: '#00bfa5',
    scaleColor: false,
    lineWidth: 15,
    size: 200
  });
  clone.querySelector('.chart').querySelector('p').textContent = `${percentage}%`;
  container.append(clone);
});
