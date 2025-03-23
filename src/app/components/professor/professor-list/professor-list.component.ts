import { Component } from '@angular/core';
import { Professor } from '../../../models/professor';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss'
})
export class ProfessorListComponent {
  lista: Professor[] = [];
  
    constructor(){
      this.findAll();
      
    }
    findAll(){
      let professor1 = new Professor();
      professor1.id = 1;
      professor1.nomeProfessor = 'pedro1';
      professor1.cpf = '999.999.999-99';
      professor1.email = 'alo1@h.com';
      professor1.especialidade = 'aula1';
  
      let professor2 = new Professor();
      professor2.id = 2;
      professor2.nomeProfessor = 'Pedrpedro2o';
      professor2.cpf = '900.000.000.12';
      professor2.email = 'pedro@gt.com';
      professor2.especialidade = 'aulao';
  
      let professor3 = new Professor();
      professor3.id = 3;
      professor3.nomeProfessor = 'Roberto';
      professor3.cpf = '1111.111.111-11';
      professor3.email = 'roberto@roberoto.com.br';
      professor3.especialidade = 'ed religiosa';
      
      this.lista.push(professor1,professor2,professor3);
    }
  
    delete(professor: Professor){
      let indice = this.lista.findIndex(x => {return x.id == professor.id});
      if(confirm('Deseja deletar?')){
        this.lista.splice(indice, 1);
      }
    }

}