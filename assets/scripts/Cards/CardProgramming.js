export class CardProgramming {
  constructor() {
    this.addEventListenerToModalBtn();
    this.addEventListenerToProgressBtn();
    this.addEventListenerToAllBtn();
  }

  addEventListenerToModalBtn() {
    document.getElementById('programming-progress-now').addEventListener('click', () => {
      if(+localStorage.getItem('programmingProgress1')) {
        document.getElementById('programming-progress-1').value = +localStorage.getItem('programmingProgress1');
      }
    });
  }

  addEventListenerToProgressBtn() {
    document.getElementById('decide-programming-progress-btn').addEventListener('click', () => {
      const programmingProgress1 = +document.querySelector('#programming-progress-1').value;
      const programmingProgress2 = +document.querySelector('#programming-progress-2').value;
      console.log(programmingProgress1);
      if (programmingProgress1 != 0) {
        localStorage.setItem('programmingProgress1', programmingProgress1);
      }
      localStorage.setItem('programmingProgress2', programmingProgress2);
      document.getElementById('programming-progress-now').textContent = +localStorage.getItem('programmingProgress1') + +programmingProgress2;
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
