export class GoalCards {
  constructor() {
    this.addEventListenerToAddNewCardButton();
    this.addEventListenerToFixCardButton();
  }

  addEventListenerToAddNewCardButton() {
    const modalAddButton = document.getElementById('goal-cards__modal-add-new-card__ok-button');
    modalAddButton.addEventListener('click', (event) => {
      const modal = event.target.parentElement.parentElement;
      const inputs = modal.querySelectorAll('input');
      const dataArray = [];
      for (const input of inputs) {
        dataArray.push(input.value.trim());
      }
      let goalCardIDNumber = localStorage.getItem('goal_card_ID_number');
      localStorage.setItem(`goal_card_${goalCardIDNumber}`, dataArray);
      localStorage.setItem('goal_card_ID_number', ++goalCardIDNumber);
      M.toast({
        html: 'リロードします...',
        classes: 'cyan'
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }

  addEventListenerToFixCardButton() {
    const cards = document.querySelectorAll('#goal-cards__container .card');
    for (const card of cards) {
      card.addEventListener('click', (event) => {
        const currentlySelectedGoalCardID = event.target.closest('a').querySelector('div').id;
        const currentlySelectedGoalCardIDNumber = currentlySelectedGoalCardID.slice(-1);
        localStorage.setItem('currentlySelectedGoalCardIDNumber', currentlySelectedGoalCardIDNumber);

        const modal = document.getElementById('goal-cards__modal-fix-card');
        modal.querySelector('#goal-cards__modal-fix-card__input-goal').value = card.querySelector('.card-title').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-content').value = card.querySelector('#goal-cards__template-card__content').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-now').value = card.querySelector('#goal-cards__template-card__progress-now').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-all').value = card.querySelector('#goal-cards__template-card__all').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-background-color').value = card.classList.item(1);
        modal.querySelectorAll('input').forEach(element => {
          element.classList.add('blue-grey-text');
          element.addEventListener('click', () => {
            element.classList.remove('blue-grey-text');
          });
        });
      });
    }

    const modalFixOkButton = document.getElementById('goal-cards__modal-fix-card__ok-button');
    modalFixOkButton.addEventListener('click', () => {
      const modal = event.target.parentElement.parentElement;
      const inputs = modal.querySelectorAll('input');
      const fixedDataArray = [];
      for (const input of inputs) {
        fixedDataArray.push(input.value.trim());
      }
      const currentlySelectedGoalCardIDNumber = localStorage.getItem('currentlySelectedGoalCardIDNumber');
      localStorage.setItem(`goal_card_${currentlySelectedGoalCardIDNumber}`, fixedDataArray);
      M.toast({
        html: 'リロードします...',
        classes: 'cyan'
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
    });

    const modalFixDeleteButton = document.getElementById('goal-cards__modal-fix-card__delete-button');
    modalFixDeleteButton.addEventListener('click', () => {
      const currentlySelectedGoalCardIDNumber = localStorage.getItem('currentlySelectedGoalCardIDNumber');
      localStorage.removeItem(`goal_card_${currentlySelectedGoalCardIDNumber}`);
      M.toast({
        html: 'リロードします...',
        classes: 'cyan'
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }
}

// example data structure goalCardNum = [goal, content, date, now, all, backgroundColor, barColor]