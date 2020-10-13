import { Component, OnInit } from '@angular/core';

import {ITodo} from '../../models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: ITodo[];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    // this.todos = this.todoService.getTodo();
    this.todoService.getTodo()
      .subscribe(
        res => {
          this.todos = res;
        },
        err => console.log(err)
      );
  }

  deleteTodo(todo: ITodo) {
    // console.log('delete me');
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from Server
    this.todoService.deleteTodo(todo)
      .subscribe();
  }

  addTodo(todo: ITodo) {
    this.todoService.addTodo(todo)
      .subscribe(
        res => {
          this.todos.push(todo);
        }
      )
  }

}