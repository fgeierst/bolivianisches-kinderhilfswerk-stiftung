export class SwipeListener {
  constructor(rootSelector) {
    this.elem = document.querySelector(rootSelector);
    this.touchstartX = 0;
    this.touchendX = 0;
    this.touchstartY = 0;
    this.touchendY = 0;

    this.elem.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.elem.addEventListener('touchend', this.handleTouchEnd.bind(this));

    this.handlers = {
      swipeUp: [],
      swipeDown: [],
      swipeLeft: [],
      swipeRight: [],
      tap: []
    };
  }

  handleTouchStart(evt) {
    this.touchstartX = evt.touches[0].clientX;
    this.touchstartY = evt.touches[0].clientY;
  }

  handleTouchEnd(evt) {
    this.touchendX = evt.changedTouches[0].clientX;
    this.touchendY = evt.changedTouches[0].clientY;
    this.handleSwipe();
  }

  handleSwipe() {
    const distX = this.touchendX - this.touchstartX;
    const distY = this.touchendY - this.touchstartY;
    const absDistX = Math.abs(distX);
    const absDistY = Math.abs(distY);

    if (absDistX < 20 && absDistY < 20) {
      this.handlers.tap.forEach(fn => fn());
      return;
    }

    if (absDistX > absDistY) {
      if (distX > 0) {
        this.handlers.swipeRight.forEach(fn => fn());
      } else {
        this.handlers.swipeLeft.forEach(fn => fn());
      }
    } else {
      if (distY > 0) {
        this.handlers.swipeDown.forEach(fn => fn());
      } else {
        this.handlers.swipeUp.forEach(fn => fn());
      }
    }
  }

  on(eventType, handler) {
    if (typeof this.handlers[eventType] === 'undefined') {
      throw new Error(`Unrecognized event type: ${eventType}.`);
    }

    this.handlers[eventType].push(handler);
  }
}
