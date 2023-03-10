import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.scss']
})
export class DirectivaComponent {

  listaCurso: String[] = ['php', 'java'];
  habilitar = false;
  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }
}
