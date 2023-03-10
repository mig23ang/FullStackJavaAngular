export class Clientes {
  public id?: number;
  public nombre: string;
  public apellido: string;
  public email: string;
  public createAt?: string;

  constructor(nombre: string, apellido: string, email: string, id?: number, createAt?: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.createAt = createAt;
  }
}






export const CLIENTES = [
  { id: 1, nombre: 'juan', apellido: 'juan', email: 'juan', createAt: 'juan' },
  { id: 2, nombre: 'Carlos', apellido: 'car', email: 'car@', createAt: 'juan' },
  { id: 3, nombre: 'camilo', apellido: 'camilo', email: 'camilo@mail', createAt: 'juan' },
]
