export class FetchData {
  constructor() {
    this.fetchDayStartEndLocalStorage();
    this.fetchDayRecordLocalStorage();
    this.fetchCategoryTimeLocalStorage();
    this.fetchTodaiCardContentLocalStorage();
    this.fetchCategoryGoalLocalStorage();
    this.fetchGoalCardsLocalStorage();
    this.showToast();
  }

  fetchDayStartEndLocalStorage() {
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
  const workingHour = localStorage.getItem('workingHour');
  const workingMinute = localStorage.getItem('workingMinute');
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
      clone.querySelector('p').textContent = `${localStorage.getItem(`hour${i}`)} : ${(`0${+localStorage.getItem(`minute${i}`)}`).slice(-2)}　${localStorage.getItem(`thing${i}`)}`;
      cardContentDayRecord.append(clone);
    }
  }

  fetchCategoryTimeLocalStorage() {
    const categoryTodai = document.getElementById('category-p-todai');
    const categoryJs = document.getElementById('category-p-js');
    const categoryWebsite = document.getElementById('category-p-website');
    const categoryReading = document.getElementById('category-p-reading');
    const categoryRest = document.getElementById('category-p-rest');
    categoryTodai.textContent = `${+localStorage.getItem('categoryTodaiHour')} : ${(`0${+localStorage.getItem('categoryTodaiMinute')}`).slice(-2)}`;
    categoryJs.textContent = `${+localStorage.getItem('categoryJsHour')} : ${(`0${+localStorage.getItem('categoryJsMinute')}`).slice(-2)}`;
    categoryWebsite.textContent = `${+localStorage.getItem('categoryWebsiteHour')} : ${(`0${+localStorage.getItem('categoryWebsiteMinute')}`).slice(-2)}`;
    categoryReading.textContent = `${+localStorage.getItem('categoryReadingHour')} : ${(`0${+localStorage.getItem('categoryReadingMinute')}`).slice(-2)}`;
    categoryRest.textContent = `${+localStorage.getItem('categoryRestHour')} : ${(`0${+localStorage.getItem('categoryRestMinute')}`).slice(-2)}`;
  }

  fetchTodaiCardContentLocalStorage() {
    const todaiCardContents = document.querySelectorAll('#todai .card .card a');
    for (const todaiCardContent of todaiCardContents) {
      if (localStorage.getItem(`${todaiCardContent.id}`)) {
        todaiCardContent.textContent = localStorage.getItem(`${todaiCardContent.id}`);
      }
    }
    const todaiCardIdNumber = localStorage.getItem('todaiCardIdNumber');
    for (let i = 0; i <= todaiCardIdNumber; i++) {
      if (!localStorage.getItem(`todaiClassCard${i}`)) {
        continue;
      }
      const cardContentArray = localStorage.getItem(`todaiClassCard${i}`).split(',');
      const template = document.getElementById('todai-class-template');
      const clone = template.content.cloneNode(true);
      clone.querySelector('span').textContent = cardContentArray[1];
      clone.querySelector('p').textContent = cardContentArray[2];
      clone.querySelector('div').classList.add(`todaiClassCard${i}`);
      const cardContainerId = cardContentArray[0];
      const cardContainer = document.getElementById(cardContainerId);
      cardContainer.append(clone);
    }
  }

  fetchCategoryGoalLocalStorage() {
    const categoryGoals = document.querySelectorAll('.category-goal');
    for (const categoryGoal of categoryGoals) {
      if (localStorage.getItem(`${categoryGoal.id}`)) {
        categoryGoal.textContent = localStorage.getItem(`${categoryGoal.id}`);
      }
    }
  }

  fetchGoalCardsLocalStorage() {
    const goalCardsIDNumber = localStorage.getItem('goal_card_ID_number');
    if (!goalCardsIDNumber) {
      localStorage.setItem('goal_card_ID_number', 0);
      return;
    }
    const container = document.getElementById('goal-cards__container');

    for (let i = 0; i < goalCardsIDNumber; i++) {
      const dataArrayLocalStorage = localStorage.getItem(`goal_card_${i}`);
      if (!dataArrayLocalStorage) {
        continue;
      }
      const dataArray = dataArrayLocalStorage.split(',');
      const template = document.getElementById('goal-cards__template-card');
      const clone = template.content.cloneNode(true);

      const title = dataArray[0];
      const content = dataArray[1];
      const progressNow = dataArray[3];
      const all = dataArray[4];
      const backgroundColor = dataArray[5].toLocaleLowerCase();
      clone.querySelector('.card-title').textContent = title;
      clone.querySelector('#goal-cards__template-card__content').textContent = content;
      // clone.querySelector('#date').textContent = dataArray[2];
      const percentage = parseInt(progressNow * 100 / all);
      clone.querySelector('.chart').setAttribute('data-percent', percentage);
      clone.querySelector('.chart').querySelector('p').textContent = `${percentage}%`;
      clone.querySelector('#goal-cards__template-card__progress-now').textContent = progressNow;
      clone.querySelector('#goal-cards__template-card__all').textContent = all;
      clone.querySelector('.card').classList.add(`${backgroundColor}`);
      clone.querySelector('.card').classList.add('lighten-3');
      clone.querySelector('.card').setAttribute('id', `goal-cards__card${i}`);
      // const barColor = `#${dataArray[6]}`;

      new EasyPieChart(clone.querySelector('.chart'), {
        barColor: '#00bfa5',
        scaleColor: false,
        lineWidth: 15,
        size: 200
      });

      container.append(clone);
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
