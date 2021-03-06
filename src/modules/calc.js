const calc = () => {

  const constructorSection = document.querySelector('.constructor');
  const switchTypeInput = constructorSection.querySelectorAll('.onoffswitch-checkbox')[0];
  const secondWell = constructorSection.querySelector('.second-well');
  const diameterSelects = constructorSection.querySelectorAll('.diameter');
  const ringsSelects = constructorSection.querySelectorAll('.rings');
  const switchFloorInput = constructorSection.querySelectorAll('.onoffswitch-checkbox')[1];
  const distanceInput = constructorSection.querySelector('.distance');
  const resultInput = constructorSection.querySelector('#calc-result');

  let data = {
    price: 10000,
    type: true, //true - однокамерный, false - двухкамерный
    diameters: ['1.4 метра'],
    rings: ['1 штука'],
    floor: true, //true - есть днище, false - нет днища
    distance: 0,
  };

  const getData = () => {

    // Блок "Тип септика"

    secondWell.style.display = 'none';

    switchTypeInput.addEventListener('input', event => {
      if (switchTypeInput.checked) { //однокамерный

        data.type = true;
        secondWell.style.display = 'none';
        data.price = 10000;

        if (data.diameters.length > 1) {
          data.diameters.pop();
        }

        if (data.rings.length > 1) {
          data.rings.pop();
        }

      } else { //двухкамерный
        data.type = false;
        secondWell.style.display = 'block';
        data.price = 15000;
        data.diameters.push('1.4 метра');
        data.rings.push('1 штука');
      }
    });

    // Блок "Диаметр и количество колец"

    diameterSelects.forEach((diameterSelect, index) => {
      diameterSelect.addEventListener('change', event => {
        data.diameters[index] = diameterSelect.value;
      })
    });

    ringsSelects.forEach((ringsSelect, index) => {
      ringsSelect.addEventListener('change', event => {
        data.rings[index] = ringsSelect.value;
      });
    });


    // Блок "Наличие колодца"

    switchFloorInput.addEventListener('change', event => {

      if (switchFloorInput.checked) {
        data.floor = true;
      } else {
        data.floor = false;
      }
    })

    // Блок "Расстояние от септика до дома"

    distanceInput.addEventListener('input', event => {
      data.distance = distanceInput.value;
    })
  }

  getData();

  const distanceValidate = () => {

    const pattern = /^[\+\d]+$/;
    let saveInput = '';
    distanceInput.addEventListener('input', () => {
      if (pattern.test(distanceInput.value) || distanceInput.value === '') {
        saveInput = distanceInput.value;
      } else {
        distanceInput.value = saveInput;
      }
    });
  }

  distanceValidate();

  // Расчет

  const count = (data) => {

    let startPrice = 0;
    let floorPrice = 0;
    let ringsRatio = 1;
    let diametrRatio = 1;

    if (data.type) {
      startPrice = 10000;
    } else {
      startPrice = 15000;
    }

    diameterSelects.forEach((diameterSelect) => {
      if (diameterSelect.value === '2 метра') {
        diametrRatio *= 1.2;
      }
    })

    ringsSelects.forEach((ringsSelect) => {
      if (ringsSelect.value === '2 штуки') {
        ringsRatio *= 1.3;
      } else if (ringsSelect.value === '3 штуки') {
        ringsRatio *= 1.5;
      }
    });

    if (data.floor && data.type) {
      floorPrice = 1000;
    } else if (data.floor && !data.type) {
      floorPrice = 2000;
    }

    data.price = Math.floor(startPrice * ringsRatio * diametrRatio + floorPrice);

  }

  // Вывод при изменении в инпутах и селектах калькулятора

  constructorSection.addEventListener('change', event => {

    let target = event.target;

    if (target === switchFloorInput || target === switchTypeInput) {
      count(data);
      resultInput.value = data.price;
    }

    diameterSelects.forEach((diameterSelect) => {
      if (target === diameterSelect) {
        count(data);
        resultInput.value = data.price;
      }
    });

    ringsSelects.forEach((ringsSelect) => {
      if (target === ringsSelect) {
        count(data);
        resultInput.value = data.price;
      }
    });
  });

  return data;
};

const obj = calc();

export {
  calc,
  obj
};