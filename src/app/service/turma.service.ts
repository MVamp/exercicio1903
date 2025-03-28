import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

 http = inject(HttpClient);
    
API = 'http://localhost:8080/api/turma';


  constructor() { }

findAll(): Observable<Turma[]>{
      return this.http.get<Turma[]>(this.API+'/findAll');
    }
  
    findById(id: number): Observable<Turma>{
      return this.http.get<Turma>(this.API+'/findById/'+id)
    }
  
    delete(id: number): Observable<string>{
      return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'})
    }
  
    save(turma: Turma): Observable<string> {
      return this.http.post<string>(this.API+'/save', turma, {responseType: 'text' as 'json'})
    }
  
    update(turma: Turma, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, turma, {responseType: 'text' as 'json'})
    }


}
