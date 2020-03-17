const togglePopup = () => {

  const callBtns = document.querySelectorAll('button.call-btn');
  const popupCall = document.querySelector('.popup-call');

  const sentenceBtns = document.querySelectorAll('.sentence-btn');
  const countBtn = document.querySelector('.count-btn');
  const popupDiscount = document.querySelector('.popup-discount');

  const checkBtn = document.querySelector('.check-btn');
  const popupCheck = document.querySelector('.popup-check');

  const consultationBtn = document.querySelector('.consultation-btn');
  const popupConsultation = document.querySelector('.popup-consultation');

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

    if (target === countBtn) {
      popupDiscount.style.display = 'block';
    }

    if (target === checkBtn) {
      popupCheck.style.display = 'block';
    }

    if (target === consultationBtn) {
      popupConsultation.style.display = 'block';
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
  closePopup(popupConsultation);
};

export default togglePopup;