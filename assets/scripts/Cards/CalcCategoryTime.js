import * as functions from '../Functions/functions.js';

export class CalcCategoryTime {
  constructor(finalCalc) {
    this.calcTime(finalCalc);
  }

  calcTime(finalCalc) {
    const recordNumber = localStorage.getItem('recordNumber');
    let i = +recordNumber - 1;
    if (finalCalc === true) {
      i = recordNumber;
      if (localStorage.getItem(`thing${i}`) == 'true') {
      const startHour = localStorage.getItem(`hour${i}`);
      const startMinute = localStorage.getItem(`minute${i}`);
      const endHour = localStorage.getItem('endHour');
      const endMinute = localStorage.getItem('endMinute');
      const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
      functions.addTime(timeArray[0], timeArray[1]);
      }
    } else {
      const startHour = localStorage.getItem(`hour${i}`);
      const startMinute = localStorage.getItem(`minute${i}`);
      let iCopy = i;
      const iPlus1 = ++iCopy;
      const endHour = localStorage.getItem(`hour${iPlus1}`);
      const endMinute = localStorage.getItem(`minute${iPlus1}`);
      const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
      functions.addTime(timeArray[0], timeArray[1]);
    }
  }
}
