import { Component, inject} from '@angular/core';
import { Curso } from '../../../models/curso';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../service/curso.service';

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
    cursoService = inject(CursoService);
    roteador = inject(Router);


    constructor(){
      let id = this.rotaAtivida.snapshot.params['id'];
       if(id){
      this.findById (id);
    }
    }

    findById(id: number){
      this.cursoService.findById(id).subscribe({
        next: (cursoRetornando) => {
          this.curso = cursoRetornando;
        },
        error:  (erro) => {
          alert('Deu Ruim!!!');
        }
      })
    }



    save(){
      if(this.curso.id > 0){
        // UPDATE
        this.cursoService.update(this.curso, this.curso.id).subscribe({
          next: (mensagem) => {
            alert(mensagem);
           this.roteador.navigate(['admin/curso']);
           // this.meuEvento.emit("OK");
          },
          error: (erro) => {
            alert(erro.error)
          }
        });
  
  
      }else{
        // SAVE
        this.cursoService.save(this.curso).subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.roteador.navigate(['admin/professor']);
           // this.meuEvento.emit("OK");
          },
          error: (erro) => {
            alert(erro.error)
          }
        });
  
  
      }
    
  
  }

}