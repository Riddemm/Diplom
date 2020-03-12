const togglePopup = () => {

  const callBtns = document.querySelectorAll('button.call-btn');
  const popupCall = document.querySelector('.popup-call');

  const sentenceBtns = document.querySelectorAll('.sentence-btn');
  const popupDiscount = document.querySelector('.popup-discount');

  const checkBtn = document.querySelector('.check-btn');
  const popupCheck = document.querySelector('.popup-check');

  // Открытие модальных окон
  document.addEventListener('click', (event) => {

    let target = event.target;

    callBtns.forEach(btn => {
      if (target === btn) {
        popupCall.style.display = 'block';
      }
    });

    sentenceBtns.forEach(btn => {
      if (target === btn) {
        popupDiscount.style.display = 'block';
      }
    });

    if (target === checkBtn) {
      popupCheck.style.display = 'block';
    }

  })

  // Закрытие модальных окон
  const closePopup = (popup) => {

    popup.addEventListener('click', (event) => {

      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  }

  closePopup(popupCall);
  closePopup(popupDiscount);
  closePopup(popupCheck);
}

togglePopup();

const moreBlocks = () => {

  const moreBtn = document.querySelector('.add-sentence-btn');
  const hiddenBlocks = document.querySelectorAll('.sentence-hidden');

  moreBtn.addEventListener('click', (event) => {

    moreBtn.style.display = 'none';

    hiddenBlocks.forEach(block => {

      if (block.classList.contains('hidden')) {
        block.classList.remove('hidden');
      };
      
      if (block.classList.contains('visible-sm-block')) {
        block.classList.remove('visible-sm-block');
      };
    })
  });
}

moreBlocks();

// Отправка ajax-form

const sendForm = (form) => {

  const errorMessage = 'Что-то пошло не так';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Ваша заявка отправлена!';

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem';
  statusMessage.style.color = 'red';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
  }

  form.addEventListener('submit', (event) => {

    event.preventDefault();

    form.append(statusMessage);
    statusMessage.textContent = loadMessage;

    const formData = new FormData(form);
    let body = {};
    formData.forEach((key, val) => {
      body[key] = val;
    });

    postData(body)
      .then(response => {
        if (response.status === 200) {
          statusMessage.textContent = successMessage;
        } else {
          statusMessage.textContent = errorMessage;
        }
        setTimeout(() => {
          statusMessage.style.display = 'none';
        }, 3000);
      })
      .catch(error => console.error(error));

  });

  // Запрет ввода символов для имени и телефона
  [...document.forms].forEach((form) => {

    [...form.elements].forEach((elem) => {

      if (elem.classList.contains('person-name')) {
        const pattern = /^[А-Яа-я\s]+$/;
        let saveInput = '';
        elem.addEventListener('input', () => {
          if (pattern.test(elem.value) || elem.value === '') {
            saveInput = elem.value;
          } else {
            elem.value = saveInput;
          }
        });
      }

      if (elem.classList.contains('phone-user')) {
        const pattern = /^[\+\d]+$/;
        let saveInput = '';
        elem.addEventListener('input', () => {
          if (pattern.test(elem.value) || elem.value === '') {
            saveInput = elem.value;
          } else {
            elem.value = saveInput;
          }
        });
      }
    });
  });
}

[...document.forms].forEach((form) => {
  sendForm(form);
});
