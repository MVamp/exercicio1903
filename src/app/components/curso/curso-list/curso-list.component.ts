import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  cursoService = inject(CursoService);

   @Input("modoModal") modoModal: boolean = false;
   @Output("meuEvento") meuEvento = new EventEmitter();
  
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


          selecionar(curso: Curso){
            this.meuEvento.emit(curso);
          }

          

}