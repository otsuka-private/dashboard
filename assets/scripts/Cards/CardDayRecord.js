import { CalcCategoryTime } from './CalcCategoryTime.js';
import { FetchData } from '../Database/FetchData.js';

export class CardDayRecord {
  constructor() {
    this.recordNumber;
    this.addDayRecord();
    this.deleteDayRecord();
  }

  addDayRecord() {
    const cardContentDayRecord = document.getElementById('card-content-day-record');
    const modalDayRecordBtn = document.getElementById('decide-day-record');
    modalDayRecordBtn.addEventListener('click', () => {

      const nowTime = new Date();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();

      const thingArray = document.getElementsByName('day-record-thing');
      for (let thing of thingArray) {
        if (thing.checked) {
          const template = document.getElementById('template-record-p');
          const clone = template.content.cloneNode(true);
          clone.querySelector('p').textContent = hour + ' : ' + ('0' + minute).slice(-2) + '　'+ thing.value;
          this.recordNumber = localStorage.getItem(`recordNumber`);
          this.recordNumber++;
          localStorage.setItem(`hour${this.recordNumber}`, hour);
          localStorage.setItem(`minute${this.recordNumber}`, minute);
          localStorage.setItem(`thing${this.recordNumber}`, thing.value);
          localStorage.setItem(`recordNumber`, this.recordNumber);
          cardContentDayRecord.append(clone);
        }
      }
      new CalcCategoryTime(false);
      this.calcPrintWorkingTime();
      setTimeout(() => {
        location.reload(true);
      }, 4000);
      M.toast({html: '新しい行動を記録しました', classes: 'cyan'});
    });
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

  deleteDayRecord() {
    const deleteDayRecordButton = document.getElementById('delete-day-record-button');
    deleteDayRecordButton.addEventListener('click', () => {
      const cardContentDayRecord = document.getElementById('card-content-day-record');
      cardContentDayRecord.innerHTML = `
      <span class="card-title">Day Record</span>
      <template id="template-record-p">
        <div class="row">
          <p class="col s12"></p>
        </div>
      </template>
        `;
      const recordNumber = localStorage.getItem('recordNumber');
      for (let i = 1; i <= recordNumber; i++) {
        localStorage.removeItem(`hour${i}`);
        localStorage.removeItem(`minute${i}`);
        localStorage.removeItem(`thing${i}`);
      }
      localStorage.removeItem(`recordNumber`);
      localStorage.removeItem('categoryTodaiHour');
      localStorage.removeItem('categoryTodaiMinute');
      localStorage.removeItem('categoryJsHour');
      localStorage.removeItem('categoryJsMinute');
      localStorage.removeItem('categoryWebsiteHour');
      localStorage.removeItem('categoryWebsiteMinute');
      localStorage.removeItem('categoryReadingHour');
      localStorage.removeItem('categoryReadingMinute');
      localStorage.removeItem('categoryRestHour');
      localStorage.removeItem('categoryRestMinute');
      new FetchData().fetchCategoryTimeLocalStorage();
      this.recordNumber = 0;
      M.toast({html: '本日の記録をリセットしました', classes: 'orange'});
    })
  }
}
