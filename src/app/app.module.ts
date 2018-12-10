import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";


import { AppComponent } from './app.component';
import { BogusComponent } from './bogus/bogus.component';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentService } from './services/student.service';

@NgModule({
  declarations: [
    AppComponent,
    BogusComponent,
    StudentComponent,
    AddStudentComponent,
    ViewStudentComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'students', component: StudentComponent },
      { path: 'add-student', component: AddStudentComponent },
      { path: 'edit-student', component: EditStudentComponent },
      { path: 'view-student', component: ViewStudentComponent }  
    ])
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
