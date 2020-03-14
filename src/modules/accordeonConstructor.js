const accordeonConstructor = () => {

  const constructorSection = document.querySelector('.constructor');
  const captions = constructorSection.querySelectorAll('.panel-heading');
  const constents = constructorSection.querySelectorAll('.panel-collapse');
  const buttons = constructorSection.querySelectorAll('.construct-btn');

  captions.forEach((caption, captionIndex) => {
    constents.forEach((content, contentIndex) => {
      caption.addEventListener('click', (event) => {
        event.preventDefault();
        if (captionIndex === contentIndex) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    })
  });

  buttons.forEach((button, index) => {
    if (index !== buttons.length - 1) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        button.parentNode.parentNode.style.display = 'none';
        button.parentNode.parentNode.parentNode.nextElementSibling.childNodes[3].style.display = 'block';
      });
    }
  });

};

export default accordeonConstructor;