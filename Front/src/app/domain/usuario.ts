import { Moment } from 'moment';

export class Usuario {
  id: number = 0;
  nome: string = '';
  sobrenome: string = '';
  email: string = '';
  dataNascimento: Moment;
  escolaridade: string = '';
}
