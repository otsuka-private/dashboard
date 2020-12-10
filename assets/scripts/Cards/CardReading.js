export class CardReading {
  constructor() {
    this.addEventListenerToBookNowReading();
    this.addEventListenerToProgressBtn();
    this.addEventListenerToPageAllBtn();
  }

  addEventListenerToBookNowReading() {
    document.getElementById('modal-book-now-reading-btn').addEventListener('click', () => {
      const bookTitle = document.querySelector('#modal-book-now-reading input').value;
      localStorage.setItem('bookTitle', bookTitle);
      document.getElementById('book-now-reading').textContent = bookTitle;
    });
  }

  addEventListenerToProgressBtn() {
    document.getElementById('modal-reading-page-btn').addEventListener('click', () => {
      const pageRead = +document.querySelector('#modal-reading-page-read input').value;
      if (pageRead) {
        localStorage.setItem('pageRead', pageRead);
        document.getElementById('page-read').textContent = pageRead;
      }
    })
  }

  addEventListenerToPageAllBtn() {
    document.getElementById('modal-reading-page-all-btn').addEventListener('click', () => {
      localStorage.setItem('pageAll', document.querySelector('#modal-reading-page-all input').value);
    });
  }
}
