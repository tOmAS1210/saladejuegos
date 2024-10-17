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
  private apiUrlGeneral =
    'https://api-preguntas-cuvbhex9m-thomas-aguilars-projects.vercel.app/api/preguntasGeneral';
  private apiUrlEntretenimiento =
    'https://api-preguntas-cuvbhex9m-thomas-aguilars-projects.vercel.app/api/preguntasEntretenimiento';
  private apiUrlJuegos =
    'https://api-preguntas-cuvbhex9m-thomas-aguilars-projects.vercel.app/api/preguntasJuegos';

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
