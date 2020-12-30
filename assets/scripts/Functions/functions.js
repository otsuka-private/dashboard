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
  console.log();
  return [hour, minute];
}

export function addTime(hour, minute, categoryName) {
  const oldMinute = +localStorage.getItem(`category${categoryName}Minute`);
  let newMinute = oldMinute + minute;
  const oldHour = +localStorage.getItem(`category${categoryName}Hour`);
  const newHour = oldHour + hour + ((newMinute - newMinute % 60) / 60);
  localStorage.setItem(`category${categoryName}Hour`, newHour);
  newMinute = newMinute % 60;
  localStorage.setItem(`category${categoryName}Minute`, newMinute);
  return [newHour, newMinute];
}

////////// リロード後のトーストを決めてリロードする関数 //////////

export function setToastAndReload(message, color) {
  const toastArray = ['true', message, color];
  localStorage.setItem('toast_to_show_after_reloading', toastArray);
  M.toast({
    html: 'リロードします...',
    classes: 'cyan'
  });
  setTimeout(() => {
    location.reload();
  }, 2000);
}
