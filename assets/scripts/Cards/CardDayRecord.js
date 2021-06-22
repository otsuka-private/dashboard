import * as functions from '../Functions/functions.js';

export class CardDayRecord {
  constructor() {
    this.enableButton();
    this.addDayRecord();
  }

  enableButton() {
    const recordNumber = localStorage.getItem('recordNumber');
    const workStartButton = document.getElementById('button-work-start');
    const restStartButton = document.getElementById('button-rest-start');
    const hasDayStarted = localStorage.getItem('startHour');
    const hasDayEnded = localStorage.getItem('endHour');
    if (hasDayStarted == null || hasDayEnded != null) {
      restStartButton.setAttribute('disabled', 'disabled');
      workStartButton.setAttribute('disabled', 'disabled');
    } else if (+recordNumber % 2 == 0) {
      restStartButton.setAttribute('disabled', 'disabled');
    } else if (+recordNumber % 2 == 1) {
      workStartButton.setAttribute('disabled', 'disabled');
    }
  }

  addDayRecord() {
    const workStartButton = document.getElementById('button-work-start');
    const restStartButton = document.getElementById('button-rest-start');

    workStartButton.addEventListener('click', () => {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();

      let recordNumber = +localStorage.getItem('recordNumber');
      recordNumber++;
      localStorage.setItem(`hour${recordNumber}`, hour);
      localStorage.setItem(`minute${recordNumber}`, minute);
      localStorage.setItem(`thing${recordNumber}`, true);
      localStorage.setItem('recordNumber', recordNumber);

      functions.setToastAndReload('新しい行動を記録しました', 'teal accent-4');
    });

    restStartButton.addEventListener('click', () => {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();

      let recordNumber = +localStorage.getItem('recordNumber');
      recordNumber++;
      localStorage.setItem(`hour${recordNumber}`, hour);
      localStorage.setItem(`minute${recordNumber}`, minute);
      localStorage.setItem(`thing${recordNumber}`, false);
      localStorage.setItem('recordNumber', recordNumber);

      functions.calcAndAddTime(false);
      functions.setToastAndReload('新しい行動を記録しました', 'teal accent-4');
    });
  }
}
