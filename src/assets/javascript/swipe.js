export class SwipeListener {
  constructor(rootSelector) {
    this.elem = document.querySelector(rootSelector);
    this.touchstartX = 0;
    this.touchendX = 0;

    this.elem.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.elem.addEventListener('touchend', this.handleTouchEnd.bind(this));

    this.handlers = {
      swipeLeft: [],
      swipeRight: [],
      tap: []
    };
  }

  handleTouchStart(evt) {
    this.touchstartX = evt.touches[0].clientX;
  }

  handleTouchEnd(evt) {
    this.touchendX = evt.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const distX = this.touchendX - this.touchstartX;
    const absDistX = Math.abs(distX);

    if (absDistX < 20) {
      this.handlers.tap.forEach(fn => fn());
      return;
    }

    if (distX > 0) {
      this.handlers.swipeRight.forEach(fn => fn());
    } else {
      this.handlers.swipeLeft.forEach(fn => fn());
    }
  }

  on(eventType, handler) {
    if (typeof this.handlers[eventType] === 'undefined') {
      throw new Error(`Unrecognized event type: ${eventType}.`);
    }

    this.handlers[eventType].push(handler);
  }
}
