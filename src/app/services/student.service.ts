import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL = "https://studentaapiapp.azurewebsites.net/api/studentsapi";

  constructor(public _http: Http) { }


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

  getStudentsObservable() : Observable<Student[]> {
    return this._http.get(this.URL)
    .pipe(
      map(
        (response: Response) => response.json()
      )
    );
  }

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
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
