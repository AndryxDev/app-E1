import { Component, inject, signal } from '@angular/core';
import {
  InstruccionesService,
  ResultadoEjercicio,
} from './services/instrucciones.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly instruccionesService = inject(InstruccionesService);

  protected readonly nombreArchivo = signal<string | null>(null);
  protected readonly resultado = signal<ResultadoEjercicio | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly procesando = signal(false);

  protected onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    this.nombreArchivo.set(archivo.name);
    this.error.set(null);
    this.resultado.set(null);
    this.procesando.set(true);

    const lector = new FileReader();

    lector.onload = () => {
      try {
        const contenido = lector.result as string;
        this.resultado.set(this.instruccionesService.resolver(contenido));
      } catch (err) {
        this.error.set(
          err instanceof Error ? err.message : 'No se pudo procesar el archivo.',
        );
      } finally {
        this.procesando.set(false);
      }
    };

    lector.onerror = () => {
      this.error.set('No se pudo leer el archivo.');
      this.procesando.set(false);
    };

    lector.readAsText(archivo, 'utf-8');
  }

  protected respuesta(valor: boolean): string {
    return valor ? 'SI' : 'NO';
  }
}
