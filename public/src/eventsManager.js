import { Vec } from "./entities";

export class EventsManager {
  constructor(canvas) {
    this.rect = canvas.getBoundingClientRect();

    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
    canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    canvas.addEventListener("touchstart", (e) => this.onTouchStart(e));
    canvas.addEventListener("touchmove", (e) => this.onTouchMove(e));
    canvas.addEventListener("touchend", (e) => this.onTouchEnd(e));

    this.action = {
      left: false,
      right: false,
      shoot: false,
      up: false,
      down: false
    };

    this.bind = {
      KeyA: 'left',
      KeyD: 'right',
      KeyW: 'up',
      KeyS: 'down',
    };

    this.mouseCoords = new Vec(0, 0);
  }

  onKeyDown(event) {
    let action = this.bind[event.code];
    if (action) {
      this.action[action] = true;
      event.preventDefault();
    }
  }

  onKeyUp(event) {
    let action = this.bind[event.code];
    if (action) {
      this.action[action] = false;
      event.preventDefault();
    }
  }

  onTouchStart(event) {
    event.preventDefault();
    for (let touch of event.touches) {
      this.handleTouch(touch, true);
    }
  }

  onTouchMove(event) {
    event.preventDefault();
    for (let touch of event.touches) {
      this.handleTouch(touch, true);
    }
  }
  onTouchEnd(event) {
    event.preventDefault();
    for (let touch of event.changedTouches) {
      this.handleTouch(touch, false);
    }
  }

  handleTouch(touch, isActive) {
    // Determina la posición del toque relativa al canvas
    let touchX = touch.clientX - this.rect.left;
    let touchY = touch.clientY - this.rect.top;

    // Restablece todas las acciones a false para evitar movimientos diagonales persistentes
    this.action['left'] = false;
    this.action['right'] = false;
    this.action['up'] = false;
    this.action['down'] = false;

    // Identifica la dirección del movimiento basada en la posición del toque
    if (touchX < this.rect.width / 2) {
      this.action['left'] = isActive;
    } else {
      this.action['right'] = isActive;
    }

    if (touchY < this.rect.height / 2) {
      this.action['up'] = isActive;
    } else {
      this.action['down'] = isActive;
    }
  }


  onMouseDown(event) {
    if (event.button === 0) {
      this.action["shoot"] = false;
    }
  }

  getMousePos(event) {
    this.mouseCoords = new Vec(event.clientX - this.rect.left, event.clientY - this.rect.top);
  }
}



