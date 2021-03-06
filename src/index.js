import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

import togglePopup from './modules/togglePopup';
import moreBlocks from './modules/moreBlocks';
import accordeonQuestions from "./modules/accordeonQuestions";
import accordeonConstructor from "./modules/accordeonConstructor";
import {calc} from "./modules/calc";
import sendForm from './modules/sendForm';

togglePopup();
moreBlocks();
accordeonQuestions();
accordeonConstructor();
calc();

[...document.forms].forEach((form) => {
    sendForm(form);
});