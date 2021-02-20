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

const tabsLis = $('.tabs li');
const testingCards = document.querySelectorAll('#test .testing-card');
let i = 0;
for (let i = 0; i < 3; i++) {
  testingCards[i].addEventListener('click', () => {
    tabsLis[i].childNodes[0].click();
  });
}
// testingCards[0].addEventListener('click', () => {
//   tabsLis[0].childNodes[0].click();
// });
// testingCards[1].addEventListener('click', () => {
//   tabsLis[1].childNodes[0].click();
// });
// testingCards[2].addEventListener('click', () => {
//   tabsLis[2].childNodes[0].click();
// });