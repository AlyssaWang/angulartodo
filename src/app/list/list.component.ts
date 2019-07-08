import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ListItem } from '../list-item';
import { TodoService} from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list;
  edit;

  textInputForm;
  listGroup;


  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
) {
    this.list = this.todoService.getList();

    this.listGroup = new FormGroup({
      list: new FormArray([]),
    });

    this.textInputForm = this.formBuilder.group({
      task: '',
    });
  }

  ngOnInit() {
  }

  onSubmit(task) {
    const listItem = new ListItem();
    listItem.text = task.task;
    listItem.done = false;

    this.addToList(listItem);

    this.textInputForm.reset();
  }

  onChecked(task: ListItem) {
    task.done = true;
  }

  onEdited(index: number) { // TODO: (ngSubmit) vs (click)
    const text = this.getInputText(index);

    const listItem = this.todoService.getListItem(index);
    listItem.text = text;

    this.editListItem(index, listItem);
  }

  addToList(task: ListItem) {
    this.todoService.addToList(task);
    this.listGroup.get('list').push(new FormControl(task.text));
  }

  removeFromList(index: number) {
    this.todoService.removeFromList(index);
    this.listGroup.get('list').removeAt(index);
  }

  getInputText(index: number): ListItem {
    return this.listGroup.get('list').at(index).value;
  }

  editListItem(index: number, task: ListItem) {
    this.todoService.editListItem(index, task);
    this.edit = false;
  }
}
