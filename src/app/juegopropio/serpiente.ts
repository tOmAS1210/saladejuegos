import { UserKeyInput } from './input';

export const VELOCIDAD_SERPIENTE = 7;

export class Serpiente {
  cuerpoSerpiente = [{ x: 11, y: 11 }];

  nuevoSegmento = 0;
  input = new UserKeyInput();

  listenToInputs() {
    this.input.getInputs();
  }

  update() {
    this.addSegments();
    const direccionInput = this.input.getDireccionInput();
    for (let i = this.cuerpoSerpiente.length - 2; i >= 0; i--) {
      this.cuerpoSerpiente[i + 1] = { ...this.cuerpoSerpiente[i] };
    }
    this.cuerpoSerpiente[0].x += direccionInput.x;
    this.cuerpoSerpiente[0].y += direccionInput.y;
  }

  dibujar(tableroJuego: any) {
    this.cuerpoSerpiente.forEach((segment) => {
      const elementoSerpiente = document.createElement('div');
      elementoSerpiente.style.gridRowStart = segment.y.toString();
      elementoSerpiente.style.gridColumnStart = segment.x.toString();
      elementoSerpiente.style.backgroundColor = '#fed049';
      elementoSerpiente.style.border = '0.25vmin solid black';
      elementoSerpiente.style.transition = 'all .3ms ease-in';
      elementoSerpiente.classList.add('serpiente');
      tableroJuego.appendChild(elementoSerpiente);
    });
  }

  expandirSerpiente(cantidad: number) {
    this.nuevoSegmento += cantidad;
  }

  getCabezaSerpiente() {
    return this.cuerpoSerpiente[0];
  }

  interseccionSerpiente() {
    return this.onSnake(this.cuerpoSerpiente[0], { ignorarCabeza: true });
  }

  onSnake(posicion: any, { ignorarCabeza = false } = {}) {
    return this.cuerpoSerpiente.some((segment, index) => {
      if (ignorarCabeza && index === 0) return false;
      return this.posicionesIguales(segment, posicion);
    });
  }

  posicionesIguales(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  addSegments() {
    for (let i = 0; i < this.nuevoSegmento; i++) {
      this.cuerpoSerpiente.push({
        ...this.cuerpoSerpiente[this.cuerpoSerpiente.length - 1],
      });
    }
    this.nuevoSegmento = 0;
  }
}
