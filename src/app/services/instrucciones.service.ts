export interface EntradaEjercicio {
  m1: number;
  m2: number;
  n: number;
  instruccion1: string;
  instruccion2: string;
  mensaje: string;
}

export interface ResultadoEjercicio {
  entrada: EntradaEjercicio;
  mensajeNormalizado: string;
  instruccion1Encontrada: boolean;
  instruccion2Encontrada: boolean;
}

export class InstruccionesService {
  parsearEntrada(contenido: string): EntradaEjercicio {
    const lineas = contenido
      .split(/\r?\n/)
      .map((linea) => linea.trim())
      .filter((linea) => linea.length > 0);

    if (lineas.length < 4) {
      throw new Error('El archivo debe tener al menos 4 lineas.');
    }

    const [m1, m2, n] = lineas[0].split(/\s+/).map(Number);

    if ([m1, m2, n].some((valor) => Number.isNaN(valor))) {
      throw new Error('La primera linea debe contener tres numeros: M1 M2 N.');
    }

    return {
      m1,
      m2,
      n,
      instruccion1: lineas[1],
      instruccion2: lineas[2],
      mensaje: lineas[3],
    };
  }

  normalizarMensaje(mensaje: string): string {
    if (!mensaje) {
      return '';
    }

    let normalizado = mensaje[0];

    for (let i = 1; i < mensaje.length; i++) {
      if (mensaje[i] !== mensaje[i - 1]) {
        normalizado += mensaje[i];
      }
    }

    return normalizado;
  }

  contieneInstruccion(instruccion: string, mensajeNormalizado: string): boolean {
    return mensajeNormalizado.includes(instruccion);
  }

  resolver(contenido: string): ResultadoEjercicio {
    const entrada = this.parsearEntrada(contenido);
    const mensajeNormalizado = this.normalizarMensaje(entrada.mensaje);

    return {
      entrada,
      mensajeNormalizado,
      instruccion1Encontrada: this.contieneInstruccion(
        entrada.instruccion1,
        mensajeNormalizado,
      ),
      instruccion2Encontrada: this.contieneInstruccion(
        entrada.instruccion2,
        mensajeNormalizado,
      ),
    };
  }
}
