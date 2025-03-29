import { Component , EventEmitter, inject, Input, Output} from '@angular/core';
import { Turma } from '../../../models/turma';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../../service/turma.service';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss'
})
export class TurmaFormComponent {
  @Input("turma")  turma: Turma = new Turma();
  @Output("meuEvento") meuEvento = new EventEmitter();

  rotaAtivida = inject(ActivatedRoute);
  turmaService = inject(TurmaService);
  roteador = inject(Router);



  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById (id);
    }
  }

  findById(id: number){
    this.turmaService.findById(id).subscribe({
      next: (turmaRetornando) => {
        this.turma = turmaRetornando;
      },
      error:  (erro) => {
        alert('Deu Ruim!!!');
      }
    })
  }




  save(){
    if(this.turma.id > 0){
      // UPDATE
      this.turmaService.update(this.turma, this.turma.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
         this.roteador.navigate(['admin/turma']);
         // this.meuEvento.emit("OK");
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }else{
      // SAVE
      this.turmaService.save(this.turma).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/turma']);
         // this.meuEvento.emit("OK");
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }
  

}

}