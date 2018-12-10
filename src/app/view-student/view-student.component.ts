import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { Student } from '../models/student';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  public studentFormLabel: string = 'View Student';
  public std: Student = new Student();
  private _svc: StudentService;

  constructor(private svc: StudentService, private myRoute: Router) {
    this._svc = svc;
  }

  ngOnInit() {

    let myStudentId = localStorage.getItem('viewStudentId');
    alert('Student Id: ' + myStudentId);

    this._svc.getStudentById(+myStudentId)
      .subscribe(data=>{
        this.std = data as Student;
      });
  }

  onEdit(std): void {
    alert("Calling Edit from View with Id: " + std.studentId);
    localStorage.removeItem('editStudentId');
    localStorage.setItem('editStudentId', std.studentId);
    this.myRoute.navigate(['edit-student']);
  }
}
