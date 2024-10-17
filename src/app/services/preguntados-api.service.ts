import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Pregunta {
  categoria: string;
  pregunta: string;
  respuesta_correcta: string;
  respuestas: string[];
  foto: string;
}

@Injectable({
  providedIn: 'root',
})
export class PreguntadosApiService {
  private apiUrlGeneral = 'http://localhost:3000/api/preguntasGeneral';
  private apiUrlEntretenimiento =
    'http://localhost:3000/api/preguntasEntretenimiento';
  private apiUrlJuegos = 'http://localhost:3000/api/preguntasJuegos';

  constructor(private http: HttpClient) {}

  getPreguntasGeneral(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrlGeneral);
  }

  getPreguntasEntretenimiento(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrlEntretenimiento);
  }

  getPreguntasJuegos(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrlJuegos);
  }
}
