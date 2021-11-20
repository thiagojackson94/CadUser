import { Moment } from 'moment';

export class CadUsuarioRequest {
  nome: string = '';
  sobrenome: string = '';
  email: string = '';
  dataNascimento: Moment;
  escolaridade: string = '';
}
