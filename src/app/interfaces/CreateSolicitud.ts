export interface Turno {
  turno: string;
  horaInicio: string;
  horaFin: string;
}

export interface Disponibilidad {
  dia: string;
  turnos: Turno[];
}

export interface CreateSolicitud {
  facultad: string;
  especialidad: string;
  ciclo: number;
  curso: string[];
  tipo: string;
  modalidad: string;
  horasDictar: number;
  pagoHoras: number;
  prioridad: number;
  observaciones?: string;
  disponibilidades: Disponibilidad[];
}
