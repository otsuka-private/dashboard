export class GoalCards {
  constructor() {
    this.addEventListenerToAddNewCardButton();
  }

  addEventListenerToAddNewCardButton() {
    const modalAddButton = document.getElementById('goal-cards__modal-add-new-card__ok-button');
    modalAddButton.addEventListener('click', (event) => {
      const modal = event.target.parentElement.parentElement;
      const inputs = modal.querySelectorAll('input');
      const dataArray = [];
      for (const input of inputs) {
        dataArray.push(input.value);
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
}

// example data structure goalCardNum = [goal, content, date, now, all, backgroundColor, barColor]
