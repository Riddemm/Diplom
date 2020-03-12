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
};

export default togglePopup;