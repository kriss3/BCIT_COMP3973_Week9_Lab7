import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: String[] = [
    "Get cup of coffee",
    "Buy some groceries",
    "Fill car with gas",
    "Do my homework"
  ]
  constructor() { }
}
