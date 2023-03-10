import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Clientes, CLIENTES } from '../../interfaces/clientes';
import { ClienteServiceService } from '../../services/cliente-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Clientes[] = [];


  constructor(private clienteService: ClienteServiceService) {

  }
  ngOnInit() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes
    })
  }
  delete(cliente: Clientes): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then(() => {
      if (cliente.id !== undefined) {
        this.clienteService.deleteClientes(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }
}
