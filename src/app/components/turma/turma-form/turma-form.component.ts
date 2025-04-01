import { Component , EventEmitter, inject, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import { Turma } from '../../../models/turma';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../../service/turma.service';
import { ProfessorListComponent } from "../../professor/professor-list/professor-list.component";
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProfessorService } from '../../../service/professor.service';
import { Professor } from '../../../models/professor';
import { CursoListComponent } from '../../curso/curso-list/curso-list.component';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ProfessorListComponent, CursoListComponent],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss'
})
export class TurmaFormComponent {
  listaProfessor!:Professor[];
  @Input("turma")  turma: Turma = new Turma();
  @Output("meuEvento") meuEvento = new EventEmitter();

  rotaAtivida = inject(ActivatedRoute);
  turmaService = inject(TurmaService);
  professorService = inject(ProfessorService);
  roteador = inject(Router);

  @ViewChild("modalProfessorList") modalProfessorList!: TemplateRef<any>; //referência ao template da modal
  @ViewChild("modalCursoList") modalCursoList!: TemplateRef<any>; //referência ao template da modal
    modalService = inject(MdbModalService); //para abrir a modal
    modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois



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
          this.meuEvento.emit("OK");
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
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }
  

}

findAllProfessor(){

  this.professorService.findAll().subscribe({
    next: (lista) => {
      this.listaProfessor = lista;
    },
    error: (erro) => {
      Swal.fire(erro.error, '', 'error');
    }
  });

}

compareId(a: Turma, b: Turma) {
  return a && b ? a.id === b.id : a === b;
}



meuEventoTratamento(professor: Professor){
  if (this.turma.professores == null)
    this.turma.professores = [];
  this.turma.professores.push(professor);
  this.modalRef.close();
}

buscarProfessor(){
  this.modalRef = this.modalService.open(this.modalProfessorList, {modalClass: 'modal-xl'});
}


deletarProfessor(professor: Professor){
  let indice = this.turma.professores.findIndex(x =>{return x.id == professor.id});
  this.turma.professores.splice(indice,1);

}

buscarCurso(){
  this.modalRef = this.modalService.open(this.modalCursoList, {modalClass: 'modal-xl'});
}

meuEventoTratamento2(curso: Curso){
  this.turma.curso = curso;
  this.modalRef.close();
}




}