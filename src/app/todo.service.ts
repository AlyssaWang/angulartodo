import { Injectable } from '@angular/core';
import {log} from 'util';
import {ListItem} from './list-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  list = [];

  constructor() { }

  addToList(task: ListItem) {
    this.list.push(task);
  }

  removeFromList(index: number) {
    for (let i = 0; i < this.list.length; i++) {
      if (index === i) {
        this.list.splice(i, 1);
      }
    }
  }

  editListItem(index: number, task: ListItem) {
    this.list[index] = task;
  }

  getList() {
    return this.list;
  }

  getListItem(index: number) {
    return this.list[index];
  }
}
