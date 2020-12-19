export class FetchData {
  constructor() {
    this.fetchDayStartEndLocalStorage();
    this.fetchDayRecordLocalStorage();
    this.fetchCategoryTimeLocalStorage();
    this.fetchTodaiCardContentLocalStorage();
    this.fetchCategoryGoalLocalStorage();
    this.fetchProgrammingCardLocalStorage();
    this.fetchReadingCardLocalStorage();
  }

  fetchDayStartEndLocalStorage() {
  const startHour = localStorage.getItem('startHour');
  const startMinute = localStorage.getItem('startMinute');
  if (!startHour) {
    return;
  }
  document.getElementById('wake-time').textContent = startHour + ' : ' + ('0' + startMinute).slice(-2);
  const endHour = localStorage.getItem('endHour');
  const endMinute = localStorage.getItem('endMinute');
  if (endHour) {
    document.getElementById('end-time').textContent = endHour + ' : ' + ('0' + endMinute).slice(-2);
    const wakingHour = localStorage.getItem('wakingHour');
    const wakingMinute = localStorage.getItem('wakingMinute');
    document.getElementById('waking-time').textContent = wakingHour + 'h ' + wakingMinute + 'm';
  }
  const workingHour = localStorage.getItem('workingHour');
  const workingMinute = localStorage.getItem('workingMinute');
  document.getElementById('working-time').textContent = workingHour + 'h ' + workingMinute + 'm';
}

  fetchDayRecordLocalStorage() {
    const cardContentDayRecord = document.getElementById('card-content-day-record');
    const recordNumber = localStorage.getItem('recordNumber');
    for (let i = 1; i <= recordNumber; i++) {
      const template = document.getElementById('template-record-p');
      const clone = template.content.cloneNode(true);
      clone.querySelector('p').textContent = localStorage.getItem(`hour${i}`) + ' : ' + ('0' + +localStorage.getItem(`minute${i}`)).slice(-2) + '　' + localStorage.getItem(`thing${i}`);
      cardContentDayRecord.append(clone);
    }
  }

  fetchCategoryTimeLocalStorage() {
    const categoryTodai = document.getElementById('category-p-todai');
    const categoryJs = document.getElementById('category-p-js');
    const categoryWebsite = document.getElementById('category-p-website');
    const categoryReading = document.getElementById('category-p-reading');
    const categoryRest = document.getElementById('category-p-rest');
    categoryTodai.textContent = +localStorage.getItem('categoryTodaiHour') + ' : ' + ('0' + +localStorage.getItem('categoryTodaiMinute')).slice(-2);
    categoryJs.textContent = +localStorage.getItem('categoryJsHour') + ' : ' + ('0' + +localStorage.getItem('categoryJsMinute')).slice(-2);
    categoryWebsite.textContent = +localStorage.getItem('categoryWebsiteHour') + ' : ' + ('0' + +localStorage.getItem('categoryWebsiteMinute')).slice(-2);
    categoryReading.textContent = +localStorage.getItem('categoryReadingHour') + ' : ' + ('0' + +localStorage.getItem('categoryReadingMinute')).slice(-2);
    categoryRest.textContent = +localStorage.getItem('categoryRestHour') + ' : ' + ('0' + +localStorage.getItem('categoryRestMinute')).slice(-2);
  }

  fetchTodaiCardContentLocalStorage() {
    const todaiCardContents = document.querySelectorAll('#todai .card .card a');
    for (const todaiCardContent of todaiCardContents) {
      if (localStorage.getItem(`${todaiCardContent.id}`)) {
        todaiCardContent.textContent = localStorage.getItem(`${todaiCardContent.id}`);
      }
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

  fetchProgrammingCardLocalStorage() {
    if (localStorage.getItem('programmingAll')) {
      document.getElementById('programming-all').textContent = +localStorage.getItem('programmingAll');
    }
    if (localStorage.getItem('programmingProgress1') && localStorage.getItem('programmingProgress1') != 'null') {
      document.getElementById('programming-progress-now').textContent = +localStorage.getItem('programmingProgress1') + +localStorage.getItem('programmingProgress2');
    }
  }

  fetchReadingCardLocalStorage() {
    if (localStorage.getItem('pageAll')) {
      document.getElementById('page-all').textContent = +localStorage.getItem('pageAll');
    }
    if (localStorage.getItem('pageRead') && localStorage.getItem('pageRead') != 'null') {
      document.getElementById('page-read').textContent = localStorage.getItem('pageRead');
    }
    if (localStorage.getItem('bookTitle')) {
      document.getElementById('book-now-reading').textContent = localStorage.getItem('bookTitle');
    }
  }
}
