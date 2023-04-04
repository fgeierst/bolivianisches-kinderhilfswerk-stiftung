import { ExpandingNav } from './navigation.js';
import { SwipeListener } from './swipe.js';

customElements.define("expanding-nav", ExpandingNav);

const swipeListener = new SwipeListener('body');

const nav = document.querySelector('expanding-nav');

swipeListener.on('swipeLeft', () => nav.open());
swipeListener.on('swipeRight', () => nav.close());
