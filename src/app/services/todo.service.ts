import { Injectable } from '@angular/core';
import { ITodo } from '../models/Todo';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private httpClient: HttpClient
  ) { }

  getTodo(): Observable<ITodo[]> {
  //   return [
  //     {
  //       id: 1,
  //       title: 'test1',
  //       completed: false
  //     },
  //     {
  //       id: 2,
  //       title: 'test2',
  //       completed: false
  //     },
  //     {
  //       id: 3,
  //       title: 'test3',
  //       completed: false
  //     }
  //   ];
  // }

  return this.httpClient.get<ITodo[]>(`${this.todoUrl}?_limit=5`);

  }

  // Toggle Completed
  toggleCompleted(todo: ITodo): Observable<any> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.httpClient.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: ITodo): Observable<ITodo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.httpClient.delete<ITodo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo: ITodo): Observable<ITodo> {
    return this.httpClient.post<ITodo>(this.todoUrl, todo, httpOptions);
  }

}
