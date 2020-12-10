export interface Encuesta {
    idTurno: string;
    idEncuesta?: string;
    preguntas?: PreguntaEncuesta[];
}

export interface PreguntaEncuesta {
    idPregunta: number
    pregunta: string;
    respuesta?: any;
  }
  
