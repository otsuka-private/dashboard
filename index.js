import {
  materializeInitialize
} from './assets/scripts/Libraries/materializeInitialize.js';
import {
  materializeCSSSelectFixed
} from './assets/scripts/Libraries/materializeCSSSelectFixed.js'
import {
  FetchData
} from './assets/scripts/Database/FetchData.js';
import {
  CardDayStartEnd
} from './assets/scripts/Cards/CardDayStartEnd.js';
import {
  CardDayRecord
} from './assets/scripts/Cards/CardDayRecord.js';
import {
  GoalCards
} from './assets/scripts/Cards/GoalCards.js';
import {
  progressCircle
} from './assets/scripts/Libraries/progress_circle.js';
import {
  disableButtonsWhenClicked
} from './assets/scripts/Functions/functions.js';

class App {
  constructor() {
    materializeInitialize();
    materializeCSSSelectFixed();
    new FetchData();
    new CardDayStartEnd();
    new CardDayRecord();
    new GoalCards();
    progressCircle();
    disableButtonsWhenClicked();
  }
}

new App();

// test below
