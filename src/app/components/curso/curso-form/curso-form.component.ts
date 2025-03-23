import { Component, inject} from '@angular/core';
import { Curso } from '../../../models/curso';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss'
})
export class CursoFormComponent {
  curso: Curso = new Curso();
    rotaAtivida = inject(ActivatedRoute);
    constructor(){
      let id = this.rotaAtivida.snapshot.params['id'];
      if(id){
        let curso1 = new Curso();
        curso1.id = 1;
        curso1.nomeCurso = 'ADM';
        
        this.curso = curso1;
      }
    }
    save(){
      if(this.curso && this.curso.id > 0){
        alert('estou fazendo atualizacao...');
      }else{
        alert('Salvando');
      }
    }

}