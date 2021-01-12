////////// 時間を計算する関数 //////////

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
    location.reload();
  }, 1000);
}
