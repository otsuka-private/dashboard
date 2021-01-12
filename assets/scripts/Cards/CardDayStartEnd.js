import * as functions from '../Functions/functions.js';
import {
  CalcCategoryTime
} from './CalcCategoryTime.js';

export class CardDayStartEnd {
  constructor() {
    this.showNewWeekBtn();
    this.enableButton();
    this.startTime = 0,
      this.endTime = 0,
      this.addStartEnd();
    this.setNewWeek();
    this.deleteDay();
  }

  showNewWeekBtn() {
    const day = new Date();
    if (day.getDay() === 1 && localStorage.getItem('was_week_updated') == 'false') {
      document.getElementById('modal-set-new-week-btn').style.display = 'inline-block';
    } else {
      if (day.getDay() !== 1) {
        localStorage.was_week_updated = false;
      }
      document.getElementById('modal-set-new-week-btn').style.display = 'none';
    }
  }

  enableButton() {
    const hasDayStarted = localStorage.getItem('startHour');
    const hasDayEnded = localStorage.getItem('endHour');
    const dayStartButton = document.getElementById('button-day-start');
    const dayEndButton = document.getElementById('button-day-end');
    const deleteDayStartEndButton = document.getElementById('button-modal-trigger-delete-day-start-end');
    if (hasDayStarted == null) {
      dayEndButton.setAttribute('disabled', 'disabled');
      deleteDayStartEndButton.setAttribute('disabled', 'disabled');
    } else if (hasDayStarted != null && hasDayEnded == null) {
      dayStartButton.setAttribute('disabled', 'disabled');
      dayStartButton.querySelector('i').classList.remove('animate__slideInUp');
      deleteDayStartEndButton.setAttribute('disabled', 'disabled');
    } else if (hasDayEnded != null) {
      dayEndButton.setAttribute('disabled', 'disabled');
      dayStartButton.setAttribute('disabled', 'disabled');
      dayStartButton.querySelector('i').classList.remove('animate__slideInUp');
    }
  }

  addStartEnd() {
    const dayStartButton = document.getElementById('button-day-start');
    const dayEndButton = document.getElementById('button-day-end');
    dayStartButton.addEventListener('click', () => {
      const nowTime = new Date();
      const minute = nowTime.getMinutes();
      const hour = nowTime.getHours();
      const day = nowTime.getDay();
      localStorage.setItem('startHour', hour);
      localStorage.setItem('startMinute', minute);
      localStorage.setItem('dayToday', day);
      functions.setToastAndReload('開始時間を記録しました。<br>素晴らしい１日に感謝して今日も精一杯生きましょう！', 'cyan');
    });
    dayEndButton.addEventListener('click', () => {
      const nowTime = new Date();
      const minute = nowTime.getMinutes();
      const hour = nowTime.getHours();
      localStorage.setItem('endHour', hour);
      localStorage.setItem('endMinute', minute);
      this.calcPrintWakingTime();
      new CalcCategoryTime(true);
      this.calcPrintWorkingTime();
      functions.setToastAndReload('終了時間を記録しました 今日もよく頑張りました！🎉', 'cyan');
    });
  }

  calcPrintWakingTime() {
    const startMinute = localStorage.getItem('startMinute');
    const endMinute = localStorage.getItem('endMinute');
    const startHour = localStorage.getItem('startHour');
    const endHour = localStorage.getItem('endHour');
    const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
    const wakingTime = +timeArray[0] + (+timeArray[1] / 60);
    localStorage.setItem('wakingHour', timeArray[0]);
    localStorage.setItem('wakingMinute', timeArray[1]);
    localStorage.setItem(`wakingTime${localStorage.getItem('dayToday')}`, wakingTime);
  }

  calcPrintWorkingTime() {
    const workingMinute = localStorage.getItem('working_minute');
    const workingHour = localStorage.getItem('working_hour');
    const workingTime = workingHour + (workingMinute / 60);
    localStorage.setItem(`workingTime${localStorage.getItem('dayToday')}`, workingTime);
  }

  setNewWeek() {
    document.getElementById('decide-set-new-week-button').addEventListener('click', () => {
      for (let i = 0; i <= 6; i++) {
        localStorage.setItem(`workingTime${i}LastWeek`, localStorage.getItem(`workingTime${i}`));
        localStorage.setItem(`wakingTime${i}LastWeek`, localStorage.getItem(`wakingTime${i}`));
        localStorage.setItem(`workingTime${i}`, null);
        localStorage.setItem(`wakingTime${i}`, null);
      }
      localStorage.was_week_updated = true;
    });
  }

  deleteDay() {
    const deleteDayStartEndButton = document.getElementById('delete-day-start-end-button');
    deleteDayStartEndButton.addEventListener('click', () => {
      this.deleteDayRecord();
      this.deleteDayStartEnd();
      functions.setToastAndReload('1日をリセットしました', 'cyan');
    });
  }

  deleteDayStartEnd() {
    localStorage.removeItem('startHour');
    localStorage.removeItem('startMinute');
    localStorage.removeItem('endHour');
    localStorage.removeItem('endMinute');
    localStorage.removeItem('wakingHour');
    localStorage.removeItem('wakingMinute');
    localStorage.removeItem('working_hour');
    localStorage.removeItem('working_minute');
  }

  deleteDayRecord() {
    // const cardContentDayRecord = document.getElementById('card-content-day-record');
    // cardContentDayRecord.innerHTML = `
    // <span class="card-title">Day Record</span>
    // <template id="template-record-p">
    //   <div class="row">
    //     <p class="col s12"></p>
    //   </div>
    // </template>
    //   `;
    const recordNumber = localStorage.getItem('recordNumber');
    for (let i = 1; i <= recordNumber; i++) {
      localStorage.removeItem(`hour${i}`);
      localStorage.removeItem(`minute${i}`);
      localStorage.removeItem(`thing${i}`);
    }
    localStorage.removeItem('recordNumber');
    localStorage.removeItem('working_hour');
    localStorage.removeItem('working_minute');
  }
}
