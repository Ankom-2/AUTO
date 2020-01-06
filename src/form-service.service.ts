import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Form } from './app/form';
import { Experiment } from './app/experiment'
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private dataURL = 'assets/data_table.json';
  private experiment = 'assets/experiment.json'
  private postURL = 'http://localhost:8080/experiment';
  private uploadURL = 'http://localhost:8080/upload'
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getData(): Observable<Form[]> {
    return this.http.get<Form[]>(this.dataURL).pipe(
      catchError(this.handleError));
  }
  getExperiment(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(this.experiment).pipe(
      catchError(this.handleError));
  }
  //Service for Main screen to upload data-set to backend:
  uploadFile(formData: FormData): Observable<any>{
    return this.http.post(this.uploadURL, formData);
  }
  
  //Service for Input screen to post experiemnt data to backend:
  postFormData(data:any): Observable<any> {
    return <Observable<any>> this.http.post(this.postURL,data);
  }

  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return Observable.throw(err.error() || 'Server error');
  }
}
