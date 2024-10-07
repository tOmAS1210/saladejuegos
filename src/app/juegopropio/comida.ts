import { posicionCuadriculaRandom } from '../juegopropio/gameboard-grid.util';

export class Comida {
  EXPANSION_RATE = 1;
  puntaje = 0;
  comida: any;
  serpiente: any;

  constructor(serpiente: any) {
    this.serpiente = serpiente;
    this.comida = this.obtenerPosicionRandomComida();
  }

  update() {
    if (this.serpiente.onSnake(this.comida)) {
      this.serpiente.expandirSerpiente(this.EXPANSION_RATE);
      this.comida = this.obtenerPosicionRandomComida();
      this.aniadirPuntaje = 1;
    }
  }

  dibujar(tableroJuego: any) {
    const ComidaElement = document.createElement('div');
    ComidaElement.style.gridRowStart = this.comida.y;
    ComidaElement.style.gridColumnStart = this.comida.x;
    ComidaElement.classList.add('comida');
    ComidaElement.style.borderRadius = '50%';
    ComidaElement.style.backgroundColor = '#007580';
    ComidaElement.style.transition = 'all .3ms ease-in';
    ComidaElement.style.border = '0.25vmin solid black';
    tableroJuego.appendChild(ComidaElement);
  }

  obtenerPosicionRandomComida() {
    let nuevaPosicionComida;
    while (
      nuevaPosicionComida == null ||
      this.serpiente.onSnake(nuevaPosicionComida)
    ) {
      nuevaPosicionComida = posicionCuadriculaRandom();
    }
    return nuevaPosicionComida;
  }

  set aniadirPuntaje(valor: number) {
    this.puntaje += valor;
  }

  get puntajeActual() {
    return this.puntaje;
  }
}
