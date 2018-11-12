import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public studentArray:Student[] = [];

  rec: Student;
  constructor(private _svc: StudentService, private myRoute: Router) { }
  
  ngOnInit() {
    this.getStudentsPromise(); 
    //this.getStudentsObservable();
  }
  
  getStudentsPromise(): void {
    this._svc.getStudentsPromise()
    .then(data => this.studentArray = data);
  }
  
  getStudentsObservable(): void {
    this._svc.getStudentsObservable()
      .subscribe(
        data => this.studentArray= data,
        error => console.log(error)
      );
  }

  onView(rec): void{
    alert('Calling student Service View(GET) method with Id: ' + rec.studentId );
    localStorage.removeItem('viewStudentId');
    localStorage.setItem('viewStudentId', rec.studentId);

    this.myRoute.navigate(['view-student']);
  }

  onEdit(rec): void{
    alert('Calling student Service Edit Method with Id: ' + rec.studentId);
    localStorage.removeItem('editStudentId');
    localStorage.setItem('editStudentId', rec.studentId);
    this.myRoute.navigate(['edit-student']);
  }

  onAdd(rec): void{
    alert('Calling Add method to Add new Student');
    this.myRoute.navigate(['add-student']);
  }

  onDelete(rec): void{
    alert('Calling student Service Delete Method with Id: ' + rec.studentId);
    this._svc.delteStudentPromist(rec.studentId).then(data => {
      alert("Record Id: " + rec.studentId + " deleted Successful !");
      this.refresh();
    });
  }

  refresh() {
    this.myRoute.navigate(['student']);
    this.ngOnInit();   }
}
