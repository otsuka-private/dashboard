import {
  materializeInitialize
} from './assets/scripts/Libraries/materializeInitialize.js';
import {
  MaterializeSelectFixed
} from './assets/scripts/Libraries/MaterializeSelectFixed.js'
import {
  FetchData
} from './assets/scripts/Database/FetchData.js';
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
  GoalCards
} from './assets/scripts/Cards/GoalCards.js';

class App {
  constructor() {
    materializeInitialize();
    MaterializeSelectFixed();
    new FetchData();
    new CardDayStartEnd();
    new CardDayRecord();
    new Category();
    new GoalCards();
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
