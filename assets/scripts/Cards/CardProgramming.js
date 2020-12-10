export class CardProgramming {
  constructor() {
    this.addEventListenerToProgressBtn();
    this.addEventListenerToAllBtn();
  }

  addEventListenerToProgressBtn() {
    document.getElementById('decide-programming-progress-btn').addEventListener('click', () => {
      const programmingNow = +document.querySelector('#modal-programming-progress-now input').value;
      if (programmingNow) {
        localStorage.setItem('programmingNow', programmingNow);
        document.getElementById('programming-progress-now').textContent = programmingNow;
      }
    })
  }

  addEventListenerToAllBtn() {
    document.getElementById('decide-programming-all-btn').addEventListener('click', () => {
      const programmingAll = +document.querySelector('#modal-programming-all input').value;
      if (programmingAll) {
        localStorage.setItem('programmingAll', programmingAll);
        document.getElementById('programming-all').textContent = programmingAll;
      }
    });
  }
}
