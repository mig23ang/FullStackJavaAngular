import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { CLIENTES, Clientes } from '../interfaces/clientes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.urlEndPoint).pipe(
      catchError((e) => {
        console.log(e.error.mensaje)
        Swal.fire('Error al obtener clientes', e.error.mensaje, 'error');
        return throwError(() => new Error(e.error.mensaje));
      }), finalize(() => {
        console.log('Se completó la solicitud de clientes');
      })
    );
  }

  getClientesById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje)
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e.error.mensaje));
      }),
      finalize(() => {
        console.log('Se completó la solicitud de clientes por ID');
      })
    );
  }



  createClientes(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        console.log(e.error.mensaje)
        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(() => new Error(e.error.mensaje));
      }),
      map((response: any) => response.cliente as Clientes),
      finalize(() => {
        console.log('Se completó la solicitud de crear cliente');
      })
      )
  }

  updateClientes(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje)
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e.error.mensaje));
      }),
      map((response: any) => response.cliente as Clientes),
      finalize(() => {
        console.log('Se completó la solicitud de editar cliente');
      })
    )
  }

  deleteClientes(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje)
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(() => new Error(e.error.mensaje));
      }),
      finalize(() => {
        console.log('Se completó la solicitud de eliminar cliente');
      })
    )
  }

}


