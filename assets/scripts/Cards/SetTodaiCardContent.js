export class SetTodaiCardContent {
  constructor() {
    this.addEventListnerToCardContent();
    this.setNewClassCard();
  }

  addEventListnerToCardContent() {
    const todaiCardPhrases = document.querySelectorAll('#todai .card .card a');
    for (const todaiCardPhrase of todaiCardPhrases) {
      todaiCardPhrase.addEventListener('click', event => {
        console.log(event.target.parentElement);
        localStorage.setItem('currentSelectedTodaiCardContentId', `${event.target.id}`);
        document.querySelector('#modal-todai-set-card-content input').value = event.target.textContent;
        document.querySelector('#modal-todai-set-card-content input').style.color = 'rgba(0, 0, 0, 0.5)';
        document.querySelector('#modal-todai-set-card-content input').addEventListener('click', () => {
          document.querySelector('#modal-todai-set-card-content input').style.color = 'rgba(0, 0, 0, 1)';
        });
      });
    }
  }

  setNewClassCard() {


    const btns = document.getElementsByClassName('todai-add-class');
    for (const btn of btns) {
      btn.addEventListener('click', event => {
        const cardContainer = event.target.previousElementSibling.firstElementChild.id;
        const order = event.target.parentElement.parentElement.querySelectorAll('.card').length;
        const array = [cardContainer, order];
        const cardId = document.getElementsByClassName('todai-class-card').length;
        localStorage.setItem(`todaiClassCardArray${cardId}`, array);
      });
    }

    const modalTodaiAddClassCardDecideBtn = document.getElementById('modal-btn-decide-todai-add-class-card');
    modalTodaiAddClassCardDecideBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-todai-add-class-card');
      const classTitle = modal.querySelector('#class-title').value.trim();
      const classAssignment = modal.querySelector('#class-assignment').value.trim();
      const cardId = document.getElementsByClassName('todai-class-card').length;
      const array = localStorage.getItem(`todaiClassCardArray${cardId}`).split(',');
      localStorage.removeItem(`todaiClassCardArray${cardId}`);
      array.push(classTitle, classAssignment);
      localStorage.setItem(`todaiClassCard${cardId}`, array);

      const cardContentArray = localStorage.getItem(`todaiClassCard${cardId}`).split(',');
      const template = document.getElementById('todai-class-template');
      const clone = template.content.cloneNode(true);
      clone.querySelector('span').textContent = cardContentArray[2];
      clone.querySelector('p').textContent = cardContentArray[3];
      const cardContainerId = cardContentArray[0];
      const cardContainer = document.getElementById(cardContainerId);
      cardContainer.append(clone);
    });
  }
}
