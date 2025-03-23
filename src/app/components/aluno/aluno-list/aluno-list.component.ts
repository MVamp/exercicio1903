import { Component } from '@angular/core';
import { Aluno } from '../../../models/aluno';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss'
})
export class AlunoListComponent {

  lista: Aluno[] = [];

  constructor(){
    this.findAll();
    
  }
  findAll(){
    let aluno1 = new Aluno();
    aluno1.id = 1;
    aluno1.nomeAluno = 'Marcio';
    aluno1.cpf = '123.456.956-99';
    aluno1.telefone = '99999-9999';

    let aluno2 = new Aluno();
    aluno2.id = 2;
    aluno2.nomeAluno = 'Pedroenzo';
    aluno2.cpf = '945.330.345.09';
    aluno2.telefone = '99999-9999';

    let aluno3 = new Aluno();
    aluno3.id = 3;
    aluno3.nomeAluno = 'Guilherme';
    aluno3.cpf = '899.123.123-88';
    aluno3.telefone = '99999-6051';
    
    this.lista.push(aluno1,aluno2,aluno3);
  }

  delete(aluno: Aluno){
    let indice = this.lista.findIndex(x => {return x.id == aluno.id});
    if(confirm('Deseja deletar?')){
      this.lista.splice(indice, 1);
    }
  }
}