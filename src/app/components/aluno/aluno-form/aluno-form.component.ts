import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Aluno } from '../../../models/aluno';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../../service/aluno.service';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent {
  aluno: Aluno = new Aluno();
  rotaAtivida = inject(ActivatedRoute);
  alunoService = inject(AlunoService);
  roteador = inject(Router);


  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById (id);
    }
  }

  findById(id: number){
    this.alunoService.findById(id).subscribe({
      next: (alunoRetornando) => {
        this.aluno = alunoRetornando;
      },
      error:  (erro) => {
        alert('Deu Ruim!!!');
      }
    })
  }


  save(){
    if(this.aluno.id > 0){
      // UPDATE
      this.alunoService.update(this.aluno, this.aluno.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
         this.roteador.navigate(['admin/aluno']);
         // this.meuEvento.emit("OK");
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }else{
      // SAVE
      this.alunoService.save(this.aluno).subscribe({
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