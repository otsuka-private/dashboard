export class SetTodaiCardContent {
  constructor() {
    this.addEventListnerToCardContent();
    this.setNewContent();
    }

    addEventListnerToCardContent() {
      const todaiCardPhrases = document.querySelectorAll('#todai .card .card a');
      for (const todaiCardPhrase of todaiCardPhrases) {
        todaiCardPhrase.addEventListener('click', event => {
          localStorage.setItem('currentSelectedTodaiCardContentId', `${event.target.id}`);
          document.querySelector('#modal-todai-set-card-content input').value = event.target.textContent;
          document.querySelector('#modal-todai-set-card-content input').style.color = 'rgba(0, 0, 0, 0.5)';
          document.querySelector('#modal-todai-set-card-content input').addEventListener('click', () => {
          document.querySelector('#modal-todai-set-card-content input').style.color = 'rgba(0, 0, 0, 1)';
          });
        });
      }
    }

    setNewContent() {
      document.getElementById('set-todai-card-content-btn').addEventListener('click', () => {
        const content = document.querySelector('#modal-todai-set-card-content input').value;
        if (content) {
          const id = localStorage.getItem('currentSelectedTodaiCardContentId');
          localStorage.setItem(`${id}`, content);
        }
      })
    }
  }
