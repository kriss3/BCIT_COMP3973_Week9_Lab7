import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'bogus',
  templateUrl: './bogus.component.html',
  //template: `<h3>HELLOOOO</h3>`,
  styleUrls: ['./bogus.component.css']
})
export class BogusComponent implements OnInit {
  temperature:number = 40;
  isOk: boolean = false;

  constructor(public taskSrv: TasksService) { }

  ngOnInit() {
  }

  onClick() {
    alert("You just clicked my button");
  }
}
