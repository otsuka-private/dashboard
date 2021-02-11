////////// 時間を計算する関数 //////////

export function calcAndAddTime(finalCalc) {
  const recordNumber = localStorage.getItem('recordNumber');
  let i = +recordNumber - 1;
  if (finalCalc === true) {
    i = recordNumber;
    if (localStorage.getItem(`thing${i}`) == 'true') {
    const startHour = localStorage.getItem(`hour${i}`);
    const startMinute = localStorage.getItem(`minute${i}`);
    const endHour = localStorage.getItem('endHour');
    const endMinute = localStorage.getItem('endMinute');
    const timeArray = calcTime(+startHour, +startMinute, +endHour, +endMinute);
    addTime(timeArray[0], timeArray[1]);
    }
  } else {
    const startHour = localStorage.getItem(`hour${i}`);
    const startMinute = localStorage.getItem(`minute${i}`);
    let iCopy = i;
    const iPlus1 = ++iCopy;
    const endHour = localStorage.getItem(`hour${iPlus1}`);
    const endMinute = localStorage.getItem(`minute${iPlus1}`);
    const timeArray = calcTime(+startHour, +startMinute, +endHour, +endMinute);
    addTime(timeArray[0], timeArray[1]);
  }
}

export function calcTime(startHour, startMinute, endHour, endMinute) {
  let minute = 0;
  let hour = 0;
  if (startMinute <= endMinute) {
    minute = endMinute - startMinute;
  } else {
    minute = endMinute + 60 - startMinute;
    hour--;
  }
  if (startHour <= endHour) {
    hour += (endHour - startHour);
  } else {
    hour += (endHour + 24 - startHour);
  }
  return [hour, minute];
}

export function addTime(hour, minute) {
  const oldMinute = +localStorage.getItem('working_minute');
  let newMinute = oldMinute + minute;
  const oldHour = +localStorage.getItem('working_hour');
  const newHour = oldHour + hour + ((newMinute - newMinute % 60) / 60);
  localStorage.setItem('working_hour', newHour);
  newMinute = newMinute % 60;
  localStorage.setItem('working_minute', newMinute);
  const workingTime = newHour + (newMinute / 60);
  localStorage.setItem(`workingTime${localStorage.getItem('dayToday')}`, workingTime);
}

////////// リロード後のトーストを決めてリロードする関数 //////////

export function setToastAndReload(message, color) {
  const toastArray = ['true', message, color];
  localStorage.setItem('toast_to_show_after_reloading', toastArray);
  M.toast({
    html: 'リロードします...',
    classes: 'orange'
  });
  setTimeout(() => {
    location.reload(false);
  }, 1000);
}

////////// 多重クリック防止 //////////

export function disableButtonsWhenClicked() {
  const specificButtons = document.getElementsByClassName('disable-when-clicked');
  for (const element of specificButtons) {
    element.addEventListener('click', () => {
      element.setAttribute('disabled', 'disabled');
    });
  }
}
