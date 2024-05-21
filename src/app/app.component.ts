import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, provideRouter, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/Task';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  title = 'KorpUX';
  http = inject(HttpClient);
  url = 'http://localhost:5000';

  ngOnInit(): void {
    this.getTasks();
  }

  // Buscar Tarefas
  tasks$?: Observable<Task[]>;

  getTasks(){
    this.tasks$ = this.http.get<Task[]>(`${this.url}/tasks`)
  }

  // Buscar Tarefa Específica
  searchTerm: string = '';
  foundTasks$?: Observable<Task[]>;

  getSpecificTask(){

    // Validação 
    if(this.searchTerm === ''){
      this.foundTasks$ = undefined;
      return;
    }

    this.foundTasks$ = this.http.get<Task[]>(`${this.url}/tasks/${this.searchTerm}`)
  }

  // Adicionar Tarefa
  title$?: Observable<string>;
  description$?: Observable<string>;

  addTask(){

    if(!this.title$ || !this.description$){
      return;
    }

    const newTask = {
      title: this.title$,
      description: this.description$,
    }

    this.http.post<void>(`${this.url}/tasks`, newTask)
      .subscribe(_ => this.getTasks())
  }

  // Editar Tarefa
  editTask(id: number){
    console.log(this.title$, this.description$)
    this.http.put<void>(`${this.url}/tasks/${id}`, {title: this.title$, description: this.description$})
    .subscribe(_ => this.getTasks())
  }

  // Deletar Tarefa
  deleteTask(id: number){
    this.http.delete<void>(`${this.url}/tasks/${id}`)
    .subscribe(_ => this.getTasks())
  }
}
