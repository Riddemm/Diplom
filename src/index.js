import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

import togglePopup from './modules/togglePopup';
import moreBlocks from './modules/moreBlocks';
import sendForm from './modules/sendForm';
import accordeonQuestions from "./modules/accordeonQuestions";
import accordeonConstructor from "./modules/accordeonConstructor";

togglePopup();
moreBlocks();
accordeonQuestions();
accordeonConstructor();

[...document.forms].forEach((form) => {
    sendForm(form);
});