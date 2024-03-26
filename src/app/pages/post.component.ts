import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  url = 'http://localhost:5000/tasks'; 
  task: Task = { id: 0, title: '', description: '' };

  constructor(private http: HttpClient) {}

  addTask() {
 
    if (this.task.title.trim() !== '' && this.task.description.trim() !== '') {
    
      this.http.post<Task>(this.url, this.task).subscribe(() => {
        this.task.title = '';
        this.task.description = '';
      });
    } else {
      alert('Por favor, preencha o título e a descrição da tarefa.');
    }
  }
}
