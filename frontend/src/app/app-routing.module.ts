import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/pages/clientes/clientes.component';
import { DirectivaComponent } from './components/pages/directiva/directiva.component';
import { EditarComponent } from './components/pages/editar/editar.component';
import { FormsComponent } from './components/pages/forms/forms.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'crear-cliente', component: FormsComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'eliminar/:id', component: ClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
