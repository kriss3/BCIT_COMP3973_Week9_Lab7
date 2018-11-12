import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  
  addForm: FormGroup;
  btnvisibility: boolean = true;
  public studentFormLabel: string = "Add Student";
  public studentFormBtn: string = "Create";
  _svc: StudentService

  constructor(private svc: StudentService, private _frmBuilder: FormBuilder, private myRouter: Router) {
    this._svc = svc;
   }

  ngOnInit() {
    this.addForm = this._frmBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      School: ['', [Validators.required, Validators.minLength(3)]],
      Startdate: ['', [Validators.required, Validators.minLength(3)]]
    });

    let studentId = localStorage.getItem('addStudentId');
    if (+studentId > 0) {
      //this._svc.getChildById(+childId).subscribe(data => {  
      //  this.addForm.patchValue(data);
      //})

      var data = this._svc.getStudentsPromiseById(+studentId);
      this.addForm.patchValue(data);

      this.btnvisibility = false;
      this.studentFormLabel = 'Add Student';
      this.studentFormBtn = 'Create';
    }
  }

  onCreate(): void {
    alert('Saving Record: ' + JSON.stringify(this.addForm.value));
    this._svc.addStudentPromise(this.addForm.value).then(data => {
      this.myRouter.navigate(['student']);
    });
  }
}
