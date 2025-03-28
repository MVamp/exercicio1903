import { Component, inject } from '@angular/core';
import { Turma } from '../../../models/turma';
import { TurmaService } from '../../../service/turma.service';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss'
})
export class TurmaListComponent {
  lista: Turma[] = [];
  turmaService = inject(TurmaService)
  
    constructor(){
      this.findAll();
      
    }
    findAll(){
      this.turmaService.findAll().subscribe({
        next: (listaRetornada ) => {
          this.lista = listaRetornada;
        },
        error: (erro) => {
          alert(erro.error)
        }
      });
    
    }
  
    delete(turma: Turma){
                if(confirm('Deseja deletar isso aí?')){
              
                  this.turmaService.delete(turma.id).subscribe({
                    next: (mensagem) => {
                      alert(mensagem);
                      this.findAll();
                    },
                    error: (erro) => {
                      alert('Deu erro!');
                    }
                  });
            
                }
              }

}