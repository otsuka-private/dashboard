export class SetTodaiCardContent {
  constructor() {
    this.addEventListnerToCardContent();
    this.addEventListnerToAddClassButton();
    this.setNewCardContent();
    this.addEventListnerToDeleteCardButton();
  }

  addEventListnerToCardContent() {
    const todaiCardPhrases = document.querySelectorAll('.todai-class-card a');
    for (const todaiCardPhrase of todaiCardPhrases) {
      todaiCardPhrase.addEventListener('click', event => {
        document.querySelector('#modal-todai-set-card-content #modai-input-todai-card-title').value = event.target.parentElement.querySelector('span').textContent;
        document.querySelector('#modal-todai-set-card-content #modai-input-todai-card-assignment').value = event.target.parentElement.querySelector('p').textContent;
        document.querySelectorAll('#modal-todai-set-card-content input').forEach(element => {
          element.classList.add('blue-grey-text');
          element.addEventListener('click', () => {
            element.classList.remove('blue-grey-text');
          });
        });
      });
    }
  }

  addEventListnerToAddClassButton() {
    const btns = document.getElementsByClassName('todai-add-class');
    for (const btn of btns) {
      btn.addEventListener('click', event => {
        const cardContainer = event.target.previousElementSibling.firstElementChild.id;
        const array = [cardContainer];
        if (!localStorage.getItem('todaiCardIdNumber')) {
          localStorage.setItem('todaiCardIdNumber', 0);
        }
        const cardId = localStorage.getItem('todaiCardIdNumber');
        localStorage.setItem(`todaiClassCardArray${cardId}`, array);
      });
    }

    const modalTodaiAddClassCardDecideBtn = document.getElementById('modal-btn-decide-todai-add-class-card');
    modalTodaiAddClassCardDecideBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-todai-add-class-card');
      const classTitle = modal.querySelector('#class-title').value.trim();
      const classAssignment = modal.querySelector('#class-assignment').value.trim();
      let cardId = localStorage.getItem('todaiCardIdNumber');
      const array = localStorage.getItem(`todaiClassCardArray${cardId}`).split(',');
      localStorage.removeItem(`todaiClassCardArray${cardId}`);
      array.push(classTitle, classAssignment);
      localStorage.setItem(`todaiClassCard${cardId}`, array);
      localStorage.setItem('todaiCardIdNumber', ++cardId);

      const cardContentArray = localStorage.getItem(`todaiClassCard${--cardId}`).split(',');
      const template = document.getElementById('todai-class-template');
      const clone = template.content.cloneNode(true);
      clone.querySelector('span').textContent = cardContentArray[1];
      clone.querySelector('p').textContent = cardContentArray[2];
      const cardContainerId = cardContentArray[0];
      const cardContainer = document.getElementById(cardContainerId);
      cardContainer.append(clone);

      M.toast({html: '新しい授業カードを追加しました', classes: 'cyan'});

      this.addEventListnerToCardContent();
      this.clearInputValue();
    });
  }

  setNewCardContent() {
    const cards = document.getElementsByClassName('todai-class-card');
    for (const card of cards) {
      const cardContent = card.querySelector('a');
      cardContent.addEventListener('click', event => {
        if (event.target.parentElement.parentElement.classList.contains('todai-class-card')) {
          for (const className of event.target.parentElement.parentElement.classList) {
            if (className.includes('ClassCard')) {
              localStorage.setItem('currentlySelectedTodaiCardId', className);
            }
          }
        } else {
          for (const className of event.target.parentElement.parentElement.parentElement.classList) {
            if (className.includes('ClassCard')) {
              localStorage.setItem('currentlySelectedTodaiCardId', className);
            }
          }
        }
      });
    }

    const setNewCardContentButton = document.getElementById('set-todai-card-content-btn');
    setNewCardContentButton.addEventListener('click', () => {
      const titleInputValue = document.getElementById('modai-input-todai-card-title').value.trim();
      const assignmentInputValue = document.getElementById('modai-input-todai-card-assignment').value.trim();
      const cardId = localStorage.getItem('currentlySelectedTodaiCardId');
      const cardContent = localStorage.getItem(cardId);
      const cardContentArray = cardContent.split(',');
      if (!titleInputValue || !assignmentInputValue) {
        return;
      }
      cardContentArray[1] = titleInputValue;
      cardContentArray[2] = assignmentInputValue;
      localStorage.setItem(cardId, cardContentArray);
      M.toast({html: '授業カードの情報を更新しました', classes: 'cyan'
      });
      const currentSelectedCard = document.getElementsByClassName(`${cardId}`);
      currentSelectedCard[0].querySelector('span').textContent = titleInputValue;
      currentSelectedCard[0].querySelector('p').textContent = assignmentInputValue;
    });
  }

  addEventListnerToDeleteCardButton() {
    const deleteCardButton = document.getElementById('delete-todai-card-btn');
    deleteCardButton.addEventListener('click', () => {
      const cardId = localStorage.getItem('currentlySelectedTodaiCardId');
      const selectedCard = document.getElementsByClassName(cardId)[0];
      selectedCard.remove();
      localStorage.removeItem(cardId);
      M.toast({html: '🎉 よく頑張りました！', classes: 'cyan'});
    });
  }

  clearInputValue() {
    $('#class-title').val('');
    $('#class-title').next().removeClass('active');
    $('#class-assignment').val('');
    $('#class-assignment').next().removeClass('active');
  }
}
