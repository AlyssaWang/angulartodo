import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ListItem } from '../list-item';
import { TodoService} from '../todo.service';
import {log} from 'util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  item;
  list;
  textInputForm;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
  ) {
    this.list = this.todoService.getList();

    this.textInputForm = this.formBuilder.group({
      task: '',
    });
  }

  ngOnInit() {
  }

  onSubmit(taskObject) {
    this.item = new ListItem();
    this.item.text = taskObject.task;
    this.item.done = false;

    this.addToList(this.item);

    this.textInputForm.reset();
  }

  onDone(item) {
    item.done = true;
  }

  addToList(task) {
    this.todoService.addToList(task);
  }
}
