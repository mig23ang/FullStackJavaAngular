import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Clientes } from '../../interfaces/clientes';
import { ClienteServiceService } from '../../services/cliente-service.service';
import Swal from 'sweetalert2';
import { catchError, finalize, switchMap, tap, throwError } from 'rxjs';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  cliente: Clientes = new Clientes("", "", "");


  constructor(private clienteService: ClienteServiceService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.clienteService.createClientes(this.cliente).pipe(
      tap(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
      }),
      catchError(error => {
        Swal.fire('Error al crear', error.error.mensaje, 'error');
        return throwError(() => new Error(error.error.mensaje));
      }),
      finalize(() => {
        console.log('Se completó la solicitud de crear cliente');
      })
    ).subscribe();
  }

}
