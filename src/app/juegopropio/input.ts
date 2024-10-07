export class UserKeyInput {
  direccionInput = { x: 0, y: 0 };
  ultimaDireccionInput = { x: 0, y: 0 };

  getInputs() {
    window.addEventListener('keydown', (e) => {
      this.setDirection(e.key);
    });
  }

  setDirection(direccion: string) {
    switch (direccion) {
      case 'ArrowUp':
        if (this.ultimaDireccionInput.y !== 0) break;
        this.direccionInput = { x: 0, y: -1 };
        break;

      case 'ArrowDown':
        if (this.ultimaDireccionInput.y !== 0) break;
        this.direccionInput = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.ultimaDireccionInput.x !== 0) break;
        this.direccionInput = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.ultimaDireccionInput.x !== 0) break;
        this.direccionInput = { x: 1, y: 0 };
        break;
    }
  }

  getDireccionInput() {
    this.ultimaDireccionInput = this.direccionInput;
    return this.direccionInput;
  }
}
