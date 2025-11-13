import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.api}/solicitud`;

  constructor(private http: HttpClient) { }

    // 🔹 Listar todas las solicitudes
  getSolicitudes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // 🔹 Crear nueva solicitud
  createSolicitud(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // 🔹 Obtener filtros progresivos
  getFacultades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/facultades`);
  }

  getEspecialidades(facultad: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/especialidades/${facultad}`);
  }

  getCiclos(facultad: string, especialidad: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ciclos/${facultad}/${especialidad}`);
  }

  getModalidades(facultad: string, especialidad: string, ciclo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/modalidades/${facultad}/${especialidad}/${ciclo}`);
  }

  getCursos(facultad: string, especialidad: string, ciclo: number, modalidad: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/${facultad}/${especialidad}/${ciclo}/${modalidad}`);
  }

}
