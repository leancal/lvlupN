import { Vec } from "./entities";

export class EventsManager {
  constructor(canvas) {
    this.rect = canvas.getBoundingClientRect();

    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
    canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));

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

  onMouseDown(event) {
    if (event.button === 0) {  // Verifica si el clic es con el botón izquierdo (0 es izquierdo)
      this.action["shoot"] = false;  // Evita activar el disparo al hacer clic izquierdo
    }
  }

  getMousePos(event) {
    this.mouseCoords = new Vec(event.clientX - this.rect.left, event.clientY - this.rect.top);
    // Mantén la lógica original si es necesario para obtener la posición del mouse
    // this.action["shoot"] = true;
  }
}
