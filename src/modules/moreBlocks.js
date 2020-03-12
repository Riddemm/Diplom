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
};

export default moreBlocks;