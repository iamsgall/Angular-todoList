import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {ITodo} from '../../models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: ITodo;
  @Output() deleteTodo: EventEmitter<ITodo> = new EventEmitter();

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: max-line-length
  // Set Dynamic Classes => afecta al CSS, ** is completed ** lleva comillas porque la palabra esta compuesta por ** - **, sino no fuese necesario
  setClasses() {
    const classes =  {
      todo: true,
      'is-completed': this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    // console.log('toggle');
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on Server
    this.todoService.toggleCompleted(todo)
      .subscribe(
        res => console.log(res)
      );
  }

  onDelete(todo) {
    // console.log('delete');
    this.deleteTodo.emit(todo);
  }

}
