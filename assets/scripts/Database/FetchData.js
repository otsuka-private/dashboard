export class FetchData {
  constructor() {
    this.fetchDayStartEndLocalStorage();
    this.fetchDayRecordLocalStorage();
    this.fetchGoalCardsLocalStorage();
    this.showToast();
  }

  fetchDayStartEndLocalStorage() {
    const wasWeekUpdated = localStorage.getItem('was_week_updated');
    if (wasWeekUpdated == null) {
        localStorage.was_week_updated = false;
    }
    const startHour = localStorage.getItem('startHour');
    const startMinute = localStorage.getItem('startMinute');
    if (!startHour) {
      return;
    }
    document.getElementById('wake-time').textContent = `${startHour} : ${(`0${startMinute}`).slice(-2)}`;
    const endHour = localStorage.getItem('endHour');
    const endMinute = localStorage.getItem('endMinute');
    if (endHour) {
      document.getElementById('end-time').textContent = `${endHour} : ${(`0${endMinute}`).slice(-2)}`;
      const wakingHour = localStorage.getItem('wakingHour');
      const wakingMinute = localStorage.getItem('wakingMinute');
      document.getElementById('waking-time').textContent = `${wakingHour}h ${wakingMinute}m`;
    }
    const workingHour = localStorage.getItem('working_hour');
    const workingMinute = localStorage.getItem('working_minute');
    if (workingMinute != null) {
      document.getElementById('working-time').textContent = `${workingHour}h ${workingMinute}m`;
    }
  }

  fetchDayRecordLocalStorage() {
    const cardContentDayRecord = document.getElementById('card-content-day-record');
    const recordNumber = localStorage.getItem('recordNumber');
    for (let i = 1; i <= recordNumber; i++) {
      const template = document.getElementById('template-record-p');
      const clone = template.content.cloneNode(true);
      let workOrRest;
      if (localStorage.getItem(`thing${i}`) == 'true') {
        workOrRest = '働く';
      } else {
        workOrRest = '休む';
        clone.querySelector('p').classList.add('grey-text', 'text-darken-1');
      }
      clone.querySelector('p').textContent = `${localStorage.getItem(`hour${i}`)} : ${(`0${+localStorage.getItem(`minute${i}`)}`).slice(-2)}　${workOrRest}`;
      cardContentDayRecord.append(clone);
    }

    let lastWeekWorkingTimeSum = 0;
    for (let i = 0; i < 7; i++) {
      lastWeekWorkingTimeSum = lastWeekWorkingTimeSum + parseInt(+localStorage.getItem(`workingTime${i}LastWeek`) * 100);
    }
    const lastWeekWorkingTimeMinute = parseInt((lastWeekWorkingTimeSum % 100) * 60 / 100);
    const lastWeekWorkingTimeHour = parseInt(lastWeekWorkingTimeSum / 100);
    const spanLastWeekWorkingTimeHour = document.getElementById('card-last-week-working-time-sum__span-hour');
    const spanLastWeekWorkingTimeMinute = document.getElementById('card-last-week-working-time-sum__span-minute');
    spanLastWeekWorkingTimeHour.textContent = lastWeekWorkingTimeHour;
    spanLastWeekWorkingTimeMinute.textContent = lastWeekWorkingTimeMinute;

    const cardLastWeekWorkingTimeSum = document.getElementById('card-last-week-working-time-sum');
    if (lastWeekWorkingTimeHour > 80) {
      cardLastWeekWorkingTimeSum.classList.add('blue', 'lighten-2');
    }else if (lastWeekWorkingTimeHour > 40) {
      cardLastWeekWorkingTimeSum.classList.add('amber', 'lighten-2');
    } else {
      cardLastWeekWorkingTimeSum.classList.add('pink', 'lighten-2');
    }
  }

  fetchGoalCardsLocalStorage() {
    const goalCardsIDNumber = localStorage.getItem('goal_card_ID_number');
    if (!goalCardsIDNumber) {
      localStorage.setItem('goal_card_ID_number', 0);
      return;
    }
    const container = document.getElementById('goal-cards__container--now-completed');
    const containerCompleted = document.getElementById('goal-cards__container__collapsible-completed');
    for (let i = 1; i <= 3; i++) {

      for (let j = 0; j < goalCardsIDNumber; j++) {
        const dataJSON = localStorage.getItem(`goal_card_${j}`);
        if (!dataJSON) {
          continue;
        }
        const dataObject = JSON.parse(dataJSON);
        const template = document.getElementById('goal-cards__template-card');
        const clone = template.content.cloneNode(true);
        if (dataObject.order == i) {
          clone.querySelector('.card-title').textContent = dataObject.goalTitle;
          clone.querySelector('#goal-cards__template-card__content').textContent = dataObject.goalContent;
          clone.querySelector('#goal-cards__template-card__date').textContent = dataObject.dueDate.toString().slice(-5);
          const percentage = parseInt(dataObject.progressNow * 100 / dataObject.all);
          clone.querySelector('.chart').setAttribute('data-percent', percentage);
          clone.querySelector('.chart').querySelector('p').textContent = `${percentage}%`;
          clone.querySelector('#goal-cards__template-card__progress-now').textContent = dataObject.progressNow;
          clone.querySelector('#goal-cards__template-card__all').textContent = dataObject.all;
          clone.querySelector('.card').classList.add(`${dataObject.backgroundColor}`);
          clone.querySelector('.card').classList.add(`lighten-${i}`);
          if (i == 1) {
            clone.querySelector('.card').classList.add('flash');
          }
          clone.querySelector('.card').setAttribute('id', `goal-cards__card${j}`);

          new EasyPieChart(clone.querySelector('.chart'), {
            barColor: '#00bfa5',
            scaleColor: false,
            lineWidth: 9,
            size: 100,
          });

          if (dataObject.wasCompleted) {
            clone.querySelector('.card').classList.remove('flash');
            containerCompleted.append(clone);
          }
          container.append(clone);
        }
      }
    }
  }

  showToast() {
    const toastArrayData = localStorage.getItem('toast_to_show_after_reloading');
    if (!toastArrayData) {
      localStorage.setItem('toast_to_show_after_reloading', 'false');
      return;
    }
    const toastArray = toastArrayData.split(',');
    const toastObject = {
      bool: toastArray[0],
      message: toastArray[1],
      color: toastArray[2]
    };
    if (toastObject.bool == 'true') {
      M.toast({
        html: toastObject.message,
        classes: toastObject.color,
      });
      const toastArray = ['false'];
      localStorage.setItem('toast_to_show_after_reloading', toastArray);
    }
  }
}
