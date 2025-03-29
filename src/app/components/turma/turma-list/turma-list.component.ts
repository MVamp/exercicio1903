import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Turma } from '../../../models/turma';
import { TurmaService } from '../../../service/turma.service';
import { TurmaFormComponent } from '../turma-form/turma-form.component';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [TurmaFormComponent, MdbModalModule],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss'
})
export class TurmaListComponent {
  lista: Turma[] = [];

  turmaService = inject(TurmaService);

  @ViewChild("modalTurmaForm") modalTurmaForm!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois


  turmaEdit!: Turma;
  
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


              new(){
               this.turmaEdit = new Turma(); //limpando o carroEdit para um novo cadastro
               this.modalRef = this.modalService.open(this.modalTurmaForm, { modalClass: 'modal-xl'});
              }

              edit(turma:Turma){
                this.turmaEdit = turma; //carregando o carroEdit com o carro clicado na tabela
                this.modalRef = this.modalService.open(this.modalTurmaForm, { modalClass: 'modal-xl'});
              }


              retornoTurmaForm(mensagem:any){
                this.findAll();
                this.modalRef.close();
              }


}