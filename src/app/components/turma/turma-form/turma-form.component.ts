import { Component , inject} from '@angular/core';
import { Turma } from '../../../models/turma';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss'
})
export class TurmaFormComponent {
 turma: Turma = new Turma();
  rotaAtivida = inject(ActivatedRoute);
  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      let turma1 = new Turma();
      turma1.id = 1;
      turma1.nomeTurma = 'ADS';
      turma1.semestre = "2";
      turma1.ano = 2000;
      turma1.turno = 'noturno'
      this.turma = turma1;
    }
  }
  save(){
    if(this.turma && this.turma.id > 0){
      alert('estou fazendo atualizacao...');
    }else{
      alert('Salvando');
    }
  }

}