import { Vec } from "./entities";

export class EventsManager {
  constructor(canvas) {
    this.rect = canvas.getBoundingClientRect();

    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
    canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    canvas.addEventListener("touchstart", (e) => this.onTouchStart(e)); // Agregar evento de inicio de toque
    canvas.addEventListener("touchend", (e) => this.onTouchEnd(e));     // Agregar evento de fin de toque

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
    let touch = event.touches[0];
    this.handleTouch(touch, true);
  }

  onTouchEnd(event) {
    event.preventDefault();
    let touch = event.changedTouches[0];
    this.handleTouch(touch, false);
  }

  handleTouch(touch, isActive) {
    // Determina la posición del toque relativa al canvas
    let touchX = touch.clientX - this.rect.left;
    let touchY = touch.clientY - this.rect.top;

    // Identifica si el toque está en una zona específica del canvas y asigna acciones
    if (touchX < this.rect.width / 2) {
      this.action['left'] = isActive;
      this.action['right'] = !isActive;
    } else {
      this.action['right'] = isActive;
      this.action['left'] = !isActive;
    }

    if (touchY < this.rect.height / 2) {
      this.action['up'] = isActive;
      this.action['down'] = !isActive;
    } else {
      this.action['down'] = isActive;
      this.action['up'] = !isActive;
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

