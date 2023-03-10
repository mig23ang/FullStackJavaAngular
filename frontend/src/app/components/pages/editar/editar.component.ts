import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, switchMap, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Clientes } from '../../interfaces/clientes';
import { ClienteServiceService } from '../../services/cliente-service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  cliente: Clientes = new Clientes("", "", "");


  constructor(private clienteService: ClienteServiceService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }
  cargarCliente(): void {
    this.activatedRouter.params.pipe(
      switchMap(params => this.clienteService.getClientesById(params['id'])),
      tap(cliente => this.cliente = cliente),
      catchError(error => {
        Swal.fire('Error al cargar', error.error.mensaje, 'error');
        return throwError(() => new Error(error.error.mensaje));
      }),
      finalize(() => console.log('Se completó la solicitud de cargar cliente'))
    ).subscribe();
  }

  public update(): void {
    this.clienteService.updateClientes(this.cliente).pipe(
      tap(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente actualizado', `El cliente ${this.cliente.nombre} ha sido actualizado con éxito`, 'success');
      }),
      catchError(error => {
        Swal.fire('Error al actualizar', error.error.mensaje, 'error');
        return throwError(() => new Error(error.error.mensaje));
      }),
      finalize(() => {
        console.log('Se completó la solicitud de actualizar cliente');
      })
    ).subscribe();
  }

}
