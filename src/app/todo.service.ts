import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  list = [];

  constructor() { }

  addToList(task) {
    this.list.push(task);
  }

  getList() {
    return this.list;
  }
}
