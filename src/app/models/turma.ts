import { Aluno } from "./aluno";
import { Curso } from "./curso";
import { Professor } from "./professor";

export class Turma {

id!: number;
nomeTurma!: String;
semestre!: String;
ano!: number;
turno!: String;

alunos!: Aluno[];
curso!: Curso;
professores!:Professor[];
}
