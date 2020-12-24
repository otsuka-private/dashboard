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

const modalTestDecideBtn = document.getElementById('modal-test-decide-btn');
console.log(modalTestDecideBtn);
modalTestDecideBtn.addEventListener('click', () => {

  const modal = document.getElementById('modal-test');
  const classTitle = modal.querySelector('#class-title').value.trim();
  const classAssignment = modal.querySelector('#class-assignment').value.trim();
  console.log(classTitle, classAssignment);
  const template = document.getElementById('todai-monday-template');
  const clone = template.content.cloneNode(true);
  console.log(clone.querySelector('.card .card-content span'));
  clone.querySelector('.card .card-content span').textContent = classTitle;
  clone.querySelector('a').textContent = classAssignment;

  const mondayCardPlace = document.getElementById('todai-monday-card-place');
  mondayCardPlace.append(clone);
});
