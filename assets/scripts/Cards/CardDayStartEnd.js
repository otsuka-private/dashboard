import { calcTime} from '../Functions/calc_function.js';
import { CalcCategoryTime } from './CalcCategoryTime.js';

export class CardDayStartEnd {
  constructor() {
    this.showNewWeekBtn();
    this.startTime = 0,
    this.endTime = 0,
    this.addStartEnd();
    this.setNewWeek();
    this.deleteDayStartEnd();
  }

  showNewWeekBtn() {
    const day = new Date();
    if (day.getDay() === 1) {
      document.getElementById('modal-set-new-week-btn').style.display = 'inline-block';
    } else {
      document.getElementById('modal-set-new-week-btn').style.display = 'none';
    }
  }

  addStartEnd() {
    const radioStart = document.getElementById('radio-start');
    const radioEnd = document.getElementById('radio-end');
    document.getElementById('decide-day-start-end-button').addEventListener('click', () => {
      if (radioStart.checked) {
        const nowTime = new Date();
        const minute = nowTime.getMinutes();
        const hour = nowTime.getHours();
        const day = nowTime.getDay();
        localStorage.setItem('startHour', hour);
        localStorage.setItem('startMinute', minute);
        localStorage.setItem('dayToday', day);
        document.getElementById('wake-time').textContent = hour + ' : ' + ('0' + minute).slice(-2);
        M.toast({html: '開始時間を記録しました。<br>素晴らしい１日に感謝して今日も精一杯生きましょう！', classes: 'cyan'});
      } else if (radioEnd.checked) {
        const nowTime = new Date();
        const minute = nowTime.getMinutes();
        const hour = nowTime.getHours();
        localStorage.setItem('endHour', hour);
        localStorage.setItem('endMinute', minute);
        document.getElementById('end-time').textContent = hour + ' : ' + ('0' + minute).slice(-2);
        this.calcPrintWakingTime();
        new CalcCategoryTime(true);
        this.calcPrintWorkingTime();
        setTimeout(() => {
          location.reload(true);
        }, 4000);
        M.toast({html: '終了時間を記録しました 今日もよく頑張りました！🎉', classes: 'cyan'});
      }
    })
  }

  calcPrintWakingTime() {
    const startMinute = localStorage.getItem('startMinute');
    const endMinute = localStorage.getItem('endMinute');
    const startHour = localStorage.getItem('startHour');
    const endHour = localStorage.getItem('endHour');
    const timeArray = calcTime(+startHour, +startMinute, +endHour, +endMinute);
    const wakingTime = +timeArray[0] + (+timeArray[1] / 60);
    localStorage.setItem('wakingHour', timeArray[0]);
    localStorage.setItem('wakingMinute', timeArray[1]);
    localStorage.setItem(`wakingTime${localStorage.getItem('dayToday')}`, wakingTime);
    document.getElementById('waking-time').textContent = timeArray[0] + 'h ' + timeArray[1] + 'm';
  }

  calcPrintWorkingTime() {
    const workingMinuteAmount = +localStorage.getItem('categoryTodaiMinute') + +localStorage.getItem('categoryJsMinute') + +localStorage.getItem('categoryWebsiteMinute') + +localStorage.getItem('categoryReadingMinute');
    const workingMinute = workingMinuteAmount % 60;
    const workingHour = (workingMinuteAmount - workingMinute) / 60 + +localStorage.getItem('categoryTodaiHour') + +localStorage.getItem('categoryJsHour') + +localStorage.getItem('categoryWebsiteHour') + +localStorage.getItem('categoryReadingHour');
    localStorage.setItem('workingHour', workingHour);
    localStorage.setItem('workingMinute', workingMinute);
    const workingTime = workingHour + (workingMinute / 60);
    localStorage.setItem(`workingTime${localStorage.getItem('dayToday')}`, workingTime);
    document.getElementById('working-time').textContent = workingHour + 'h ' + workingMinute + 'm';
  }

  setNewWeek() {
    document.getElementById('decide-set-new-week-button').addEventListener('click', () => {
      for (let i = 0; i <= 6; i++) {
        localStorage.setItem(`workingTime${i}LastWeek`, localStorage.getItem(`workingTime${i}`));
        localStorage.setItem(`wakingTime${i}LastWeek`, localStorage.getItem(`wakingTime${i}`));
        localStorage.setItem(`workingTime${i}`, null);
        localStorage.setItem(`wakingTime${i}`, null);
      }
    });
  }

  deleteDayStartEnd() {
    const deleteDayStartEndButton = document.getElementById('delete-day-start-end-button');
    deleteDayStartEndButton.addEventListener('click', () => {
      document.getElementById('wake-time').textContent = '--';
      document.getElementById('end-time').textContent = '--';
      document.getElementById('waking-time').textContent = '--';
      document.getElementById('working-time').textContent = '--';
      localStorage.removeItem('startHour');
      localStorage.removeItem('startMinute');
      localStorage.removeItem('endHour');
      localStorage.removeItem('endMinute');
      localStorage.removeItem('wakingHour');
      localStorage.removeItem('wakingMinute');
      localStorage.removeItem('workingHour');
      localStorage.removeItem('workingMinute');
      M.toast({html: '開始時間と終了時間をリセットしました', classes: 'orange'});
    });
  }
}
