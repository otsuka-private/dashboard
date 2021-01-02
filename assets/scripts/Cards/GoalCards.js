import * as functions from '../Functions/functions.js';

export class GoalCards {
  constructor() {
    this.addEventListenerToAddNewCardButton();
    this.addEventListenerToFixCardButton();
  }

  addEventListenerToAddNewCardButton() {
    const modalAddButton = document.getElementById('goal-cards__modal-add-new-card__ok-button');
    modalAddButton.addEventListener('click', () => {
      const backgroundSelect = document.getElementById('goal-cards__modal-add-new-card__input-background-color');
      const backgroundSelectInstance = M.FormSelect.getInstance(backgroundSelect);
      const backgrounValue = backgroundSelectInstance.getSelectedValues()[0];
      const orderSelect = document.getElementById('goal-cards__modal-add-new-card__input-order');
      const orderSelectInstance = M.FormSelect.getInstance(orderSelect);
      const orderValue = orderSelectInstance.getSelectedValues()[0];
      const goalCardObject = {
        goalTitle: document.getElementById('goal-cards__modal-add-new-card__input-goal').value.trim(),
        goalContent: document.getElementById('goal-cards__modal-add-new-card__input-content').value.trim(),
        dueDate: document.getElementById('goal-cards__modal-add-new-card__input-date').value.trim(),
        progressNow: document.getElementById('goal-cards__modal-add-new-card__input-now').value.trim(),
        all: document.getElementById('goal-cards__modal-add-new-card__input-all').value.trim(),
        backgroundColor: backgrounValue.toLowerCase(),
        order: orderValue,
      }
      const goalCardObjectJSON = JSON.stringify(goalCardObject);

      let goalCardIDNumber = localStorage.getItem('goal_card_ID_number');
      localStorage.setItem(`goal_card_${goalCardIDNumber}`, goalCardObjectJSON);
      localStorage.setItem('goal_card_ID_number', ++goalCardIDNumber);
      functions.setToastAndReload('新しい目標カードを追加しました！', 'cyan');

    });
  }

  addEventListenerToFixCardButton() {
    const cards = document.querySelectorAll('#goal-cards__container .card');
    for (const card of cards) {
      card.addEventListener('click', (event) => {
        const currentlySelectedGoalCardID = event.target.closest('a').querySelector('div').id;
        const currentlySelectedGoalCardIDNumber = currentlySelectedGoalCardID.slice(16);
        localStorage.setItem('currently_selected_goal_card_ID_number', currentlySelectedGoalCardIDNumber);

        const modal = document.getElementById('goal-cards__modal-fix-card');
        modal.querySelector('#goal-cards__modal-fix-card__input-goal').value = card.querySelector('.card-title').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-content').value = card.querySelector('#goal-cards__template-card__content').textContent;
        modal.querySelector('#goal-cards__modal-fix-card__input-date').value = card.querySelector('#goal-cards__template-card__date').textContent;
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
      const backgroundSelect = document.getElementById('goal-cards__modal-fix-card__input-background-color');
      const backgroundSelectInstance = M.FormSelect.getInstance(backgroundSelect);
      const backgrounValue = backgroundSelectInstance.getSelectedValues()[0];
      if (!backgrounValue) {
        M.toast({
          html: '背景色が選択されていません',
          classes: 'orange'
        });
        return;
      }
      const orderSelect = document.getElementById('goal-cards__modal-fix-card__input-order');
      const orderSelectInstance = M.FormSelect.getInstance(orderSelect);
      const orderValue = orderSelectInstance.getSelectedValues()[0];
      const fixedDataObject = {
        goalTitle: document.getElementById('goal-cards__modal-fix-card__input-goal').value.trim(),
        goalContent: document.getElementById('goal-cards__modal-fix-card__input-content').value.trim(),
        dueDate: document.getElementById('goal-cards__modal-fix-card__input-date').value.trim(),
        progressNow: document.getElementById('goal-cards__modal-fix-card__input-now').value.trim(),
        all: document.getElementById('goal-cards__modal-fix-card__input-all').value.trim(),
        backgroundColor: backgrounValue.toLowerCase(),
        order: orderValue,
      }
      const fixedDataObjectJSON = JSON.stringify(fixedDataObject);
      const currentlySelectedGoalCardIDNumber = localStorage.getItem('currently_selected_goal_card_ID_number');
      localStorage.setItem(`goal_card_${currentlySelectedGoalCardIDNumber}`, fixedDataObjectJSON);
      functions.setToastAndReload('目標カードを修正しました！', 'cyan');
    });

    const modalFixDeleteButton = document.getElementById('goal-cards__modal-fix-card__delete-button');
    modalFixDeleteButton.addEventListener('click', () => {
      const currentlySelectedGoalCardIDNumber = localStorage.getItem('currently_selected_goal_card_ID_number');
      localStorage.removeItem(`goal_card_${currentlySelectedGoalCardIDNumber}`);
      functions.setToastAndReload('目標カードを削除しました！', 'cyan');
    });
  }
}
