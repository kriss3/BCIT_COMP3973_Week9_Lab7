import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Student } from '../models/student';
import { _getViewData } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL = "https://studentaapiapp.azurewebsites.net/api/studentsapi";

  constructor(public _http: HttpClient) { }

  /*
  getStudentsPromise(): Promise<Student[]> {
    return this._http.get(this.URL)
      .toPromise()
      .then(data => data.json() as Student[])
      .catch(this.handleError);
  }

  getStudentsPromiseById(id): Promise<Student> {
    return this._http.get(this.URL + '/'+id)
      .toPromise()
      .then(data => data.json() as Student)
      .catch(this.handleError);
  }
  */

  //Observables
  getStudents(): Observable<Student[]> {
    const url = `${this.URL}`;
    return this._http.get<Student[]>(url).pipe(
      map((data) => data, 
      catchError(this.handleError)));
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.URL}/${id}`;
    return this._http.get<Student>(url).pipe(
      map((data) => data, 
      catchError(this.handleError)));
  }

  addStudentObs(s: Student): Observable<Student>{
    const url = `${this.URL}`;
    return this._http.post<Student>(url, s).pipe(
      map((data) => data),
      catchError(this.handleError));
  }

  updateStudentObs(s): Observable<Student>{
    alert('In Service, Update: ' + JSON.stringify(s));
    const url = `${this.URL}/${s.StudentId}`;
    return this._http.put<Student>(url, s).pipe(
      map((data)=>data),
      catchError(this.handleError));
  } 

  deleteStudentObs(id: number): Observable<Student>{
    const url = `${this.URL}/${id}`;
    return this._http.delete<Student>(url).pipe(
      map((data)=>data),
      catchError(this.handleError));
  }

  /*

  addStudentPromise(student): Promise<Student> {
    return this._http.post(this.URL, student)
      .toPromise()
      .then(data => data.json() as Student[])
      .catch(this.handleError);
  }

  updateStudentPromise(student): Promise<Student>{
    return this._http.put(this.URL + '/' + student.StudentId, student)
      .toPromise()
      .then(data => data.json() as Student)
      .catch(this.handleError);
  }

  delteStudentPromist(id): Promise<Student> {
    
    return this._http.delete(this.URL + '/' + id)
              .toPromise()
              .then(data => data.json() as Student)
              .catch();
  }
  
  */

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred', error); 
    return observableThrowError(error.message || "Server Error");
  }

}
