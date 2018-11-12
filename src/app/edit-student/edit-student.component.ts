import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  public studentFormLabel: string = 'Edit Student';
  public editForm: FormGroup;
  public btnVisibility: boolean = true;
  public studentFormBtn: String;
  private _svc: StudentService;
  private myStudent: Student;


  constructor(private svc: StudentService, private _frmBuilder: FormBuilder, private myRouter: Router ) { 
    this._svc = svc;
  }

  ngOnInit() {
    
    this.editForm = this._frmBuilder.group({
      StudentId: [''],
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      School: ['', [Validators.required, Validators.minLength(3)]],
      Startdate: ['', [Validators.required, Validators.minLength(3)]]
    });


    let myStudentId = localStorage.getItem('editStudentId');

    if (+myStudentId > 0) {
      //this._svc.getChildById(+childId).subscribe(data => {  
      //  this.addForm.patchValue(data);
      //})

      this._svc.getStudentsPromiseById(+myStudentId).then(data=>{
        this.editForm.patchValue({
          StudentId: data.studentId,
          FirstName: data.firstName,
          LastName: data.lastName,
          School: data.school,
          Startdate: data.startDate
        });
        this.myStudent = data;
      });
      

      this.btnVisibility = false;
      this.studentFormBtn = 'Update';
    }
  }

  onUpdate(): void{
    alert('Callig API with Updated record for Id: ' + this.editForm.value.StudentId);
    this._svc.updateStudentPromise(this.editForm.value).then(x=>{
      this.myRouter.navigate(['student']);
    });  
  }
}
