
import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Professor } from '../../../models/professor';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../../service/professor.service';


@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [ MdbFormsModule , FormsModule ],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.scss'
})
export class ProfessorFormComponent {

  professor: Professor = new Professor();
  rotaAtivida = inject(ActivatedRoute);
  professorService = inject(ProfessorService);
  roteador = inject(Router);



  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById (id);
    }
  }

  findById(id: number){
    this.professorService.findById(id).subscribe({
      next: (professorRetornando) => {
        this.professor = professorRetornando;
      },
      error:  (erro) => {
        alert('Deu Ruim!!!');
      }
    })
  }


  save(){
      if(this.professor.id > 0){
        // UPDATE
        this.professorService.update(this.professor, this.professor.id).subscribe({
          next: (mensagem) => {
            alert(mensagem);
           this.roteador.navigate(['admin/professor']);
           // this.meuEvento.emit("OK");
          },
          error: (erro) => {
            alert(erro.error)
          }
        });
  
  
      }else{
        // SAVE
        this.professorService.save(this.professor).subscribe({
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