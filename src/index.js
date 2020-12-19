import { CardDayStartEnd } from '../assets/scripts/Cards/CardDayStartEnd.js';
import { Category } from '../assets/scripts/Categories/Category.js';
import { CardDayRecord } from '../assets/scripts/Cards/CardDayRecord.js';
import { FetchData } from '../assets/scripts/Database/FetchData.js';
import { SetTodaiCardContent } from '../assets/scripts/Cards/SetTodaiCardContent.js';
import { CardProgramming } from '../assets/scripts/Cards/CardProgramming.js';
import { CardReading } from '../assets/scripts/Cards/CardReading.js';

class App {
  constructor() {
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
