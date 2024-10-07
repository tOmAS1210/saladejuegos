const tamanio_cuadricula = 21;

export function posicionCuadriculaRandom() {
  return {
    x: Math.floor(Math.random() * tamanio_cuadricula) + 1,
    y: Math.floor(Math.random() * tamanio_cuadricula) + 1,
  };
}

export function cuadriculaExterior(position: any) {
  return (
    position.x < 1 ||
    position.x > tamanio_cuadricula ||
    position.y < 1 ||
    position.y > tamanio_cuadricula
  );
}
