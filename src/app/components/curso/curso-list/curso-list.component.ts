import { Component, inject } from '@angular/core';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../service/curso.service';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.scss'
})
export class CursoListComponent {
  lista: Curso[] = [];
  cursoService = inject(CursoService)
  
    constructor(){
      this.findAll();
      
    }

    findAll(){
      this.cursoService.findAll().subscribe({
        next: (listaRetornada ) => {
          this.lista = listaRetornada;
        },
        error: (erro) => {
          alert(erro.error)
        }
      });
    
    }
  
    delete(curso: Curso){
            if(confirm('Deseja deletar isso aí?')){
          
              this.cursoService.delete(curso.id).subscribe({
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