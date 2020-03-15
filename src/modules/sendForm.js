import {obj} from "./calc";

const sendForm = (form) => {

  const modalDirectorForm = document.querySelector('.capture-director-form');
  const captureForms = document.querySelectorAll('.capture-form');
  const directorInput = document.querySelector('.user_quest');

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
      body[val] = key;
    });

    if (form === modalDirectorForm) {
      body['user_quest'] = directorInput.value;
    }

    captureForms.forEach(captureForm => {
      if (form === captureForm) {
        body = Object.assign({}, obj, body); 
      }
    })

    postData(body)
      .then(response => {
        if (response.status === 200) {
          statusMessage.textContent = successMessage;
        } else {
          statusMessage.textContent = errorMessage;
        }

        setTimeout(() => {
          statusMessage.textContent = '';
        }, 3000);

        [...document.forms].forEach((form) => {
          [...form.elements].forEach((elem) => {
            elem.value = '';
          });
        });
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
};

export default sendForm;