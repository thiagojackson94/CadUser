import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Escolaridade } from 'src/app/domain/escolaridade';
import { Usuario } from 'src/app/domain/usuario';
import { CadastroService } from 'src/app/services/cadastro.service';
import { EscolaridadeService } from 'src/app/services/escolaridade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css'],
})
export class CadUsuarioComponent implements OnInit {
  cadUsuarioForm: FormGroup;

  listaUsuarios: Usuario[] = [];
  listaEscolaridade: Escolaridade[] = [];

  acao = 'Cadastro';

  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private escolaridadeService: EscolaridadeService
  ) {
    this.cadUsuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      dataNascimento: ['', [this.dateValidator, Validators.required]],
      escolaridade: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getListaUsuarios();
    this.getListaEscolaridades();
  }

  getListaUsuarios() {
    this.cadastroService.getListaUsuarios().then((retorno) => {
      this.listaUsuarios = retorno;
    });
  }

  salvarUsuario() {
    if (this.id == undefined) {
      //Cadastra novo Usuario
      let dataCadUsuario = this.cadUsuarioForm.getRawValue();
      this.cadastroService.salvarNovoUsuario(dataCadUsuario).then((retorno) => {
        this.listaUsuarios = retorno;
        this.cadUsuarioForm.reset();
        this.getListaUsuarios();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuário criado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      const usuario: Usuario = {
        id: this.id,
        nome: this.cadUsuarioForm.get('nome')?.value,
        sobrenome: this.cadUsuarioForm.get('sobrenome')?.value,
        email: this.cadUsuarioForm.get('email')?.value,
        dataNascimento: this.cadUsuarioForm.get('dataNascimento')?.value,
        escolaridade: this.cadUsuarioForm.get('escolaridade')?.value,
      };

      this.cadastroService.editarUsuario(this.id, usuario).subscribe((data) => {
        this.cadUsuarioForm.reset();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuário editado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });

        this.getListaUsuarios();
        this.acao = 'Cadastrar';
        this.id = undefined;
      });
    }
  }

  editarUsuario(usuario: Usuario) {
    this.acao = 'Edição';
    this.id = usuario.id;
    this.cadUsuarioForm.patchValue({
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      dataNascimento: this.formatDate(new Date()),
      escolaridade: usuario.escolaridade,
    });
  }

  getListaEscolaridades() {
    this.escolaridadeService.getListaEscolaridades().then((retorno) => {
      this.listaEscolaridade = retorno;
    });
  }

  deletarUsuario(id: number) {
    this.cadastroService.excluirUsuario(id).subscribe((retorno) => {
      this.getListaUsuarios();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuário deletado com sucesso',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
