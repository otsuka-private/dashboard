export class Category {
  constructor() {
    this.addEventListnerToCardContent();
    this.setNewContent();
    }

    addEventListnerToCardContent() {
      const categoryGoals = document.querySelectorAll('.category-goal');
      for (const categoryGoal of categoryGoals) {
        categoryGoal.addEventListener('click', event => {
          localStorage.setItem('currentSelectedCategoryGoal', `${event.target.id}`);
          document.querySelector('#modal-category-goal-set-new input').value = event.target.textContent;
          document.querySelector('#modal-category-goal-set-new input').style.color = 'rgba(0, 0, 0, 0.5)';
          document.querySelector('#modal-category-goal-set-new input').addEventListener('click', () => {
          document.querySelector('#modal-category-goal-set-new input').style.color = 'rgba(0, 0, 0, 1)';
          });
        });
      }
    }

    setNewContent() {
      document.getElementById('decide-category-goal-btn').addEventListener('click', () => {
        const content = document.querySelector('#modal-category-goal-set-new input').value;
        if (content) {
          const id = localStorage.getItem('currentSelectedCategoryGoal');
          localStorage.setItem(`${id}`, content);
        }
      })
    }
  }
