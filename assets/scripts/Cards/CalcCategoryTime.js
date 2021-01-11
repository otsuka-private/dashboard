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
      const startHour = localStorage.getItem(`hour${i}`);
      const startMinute = localStorage.getItem(`minute${i}`);
      const endHour = localStorage.getItem('endHour');
      const endMinute = localStorage.getItem('endMinute');
      const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
      const category = localStorage.getItem(`thing${i}`);
      this.print(timeArray[0], timeArray[1], category);
    } else if (i === 0) {
      i++;
      const startHour = +localStorage.getItem('startHour');
      const startMinute = +localStorage.getItem('startMinute');
      const endHour = localStorage.getItem(`hour${i}`);
      const endMinute = localStorage.getItem(`minute${i}`);
      const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
      const category = '休憩';
      this.print(timeArray[0], timeArray[1], category);
    } else {
      const startHour = localStorage.getItem(`hour${i}`);
      const startMinute = localStorage.getItem(`minute${i}`);
      let iCopy = i;
      const iPlus1 = ++iCopy;
      const endHour = localStorage.getItem(`hour${iPlus1}`);
      const endMinute = localStorage.getItem(`minute${iPlus1}`);
      const timeArray = functions.calcTime(+startHour, +startMinute, +endHour, +endMinute);
      const category = localStorage.getItem(`thing${i}`);
      this.print(timeArray[0], timeArray[1], category);
    }
  }

  print(hour, minute, category) {
    const categoryTodai = document.getElementById('category-p-todai');
    const categoryJs = document.getElementById('category-p-js');
    const categoryWebsite = document.getElementById('category-p-website');
    const categoryReading = document.getElementById('category-p-reading');
    const categoryRest = document.getElementById('category-p-rest');
    switch (category) {
      case '東大': {
        const todaiTimeArray = functions.addTime(hour, minute, 'Todai');
        categoryTodai.textContent = `${todaiTimeArray[0]} : ${(`0${+todaiTimeArray[1]}`).slice(-2)}`;
        break;
      }
      case 'プログラミング': {
        const jsTimeArray = functions.addTime(hour, minute, 'Js');
        categoryJs.textContent = `${jsTimeArray[0]} : ${(`0${+jsTimeArray[1]}`).slice(-2)}`;
        break;
      }
      case 'ポケヨビ': {
        const websiteTimeArray = functions.addTime(hour, minute, 'Website');
        categoryWebsite.textContent = `${websiteTimeArray[0]} : ${(`0${+websiteTimeArray[1]}`).slice(-2)}`;
        break;
      }
      case '読書': {
        const readingTimeArray = functions.addTime(hour, minute, 'Reading');
        categoryReading.textContent = `${readingTimeArray[0]} : ${(`0${+readingTimeArray[1]}`).slice(-2)}`;
        break;
      }
      case '休憩': {
        const restTimeArray = functions.addTime(hour, minute, 'Rest');
        categoryRest.textContent = `${restTimeArray[0]} : ${(`0${+restTimeArray[1]}`).slice(-2)}`;
        break;
      }
      default:
        alert('Computer calculated how long you worked on each category, but it seems like you did not work a single minute today.');
    }
  }
}
