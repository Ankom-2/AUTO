import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Form } from './app/form';
import { Experiment } from './app/experiment'
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  //Subject for publishing data.
  private subject = new Subject<any>();

  private dataURL = 'assets/data_table.json';
  private experiment = 'assets/experiment.json'
  private postURL = 'http://localhost:8080/experiment';
  private uploadURL = 'http://localhost:8080/upload'
  constructor(private http: HttpClient) { }

  sendData(id: number, name: String) {
    this.subject.next({ " data_id": id, "data_name": name });
  }
  getURIData(): Observable<any> {
    return this.subject.asObservable();
  }
  getData(): Observable<Form[]> {
    return this.http.get<Form[]>(this.dataURL).pipe(
      catchError(this.handleError));
  }
  getExperiment(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(this.experiment).pipe(
      catchError(this.handleError));
  }
  getDataSet(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/getdataSet').pipe(
      catchError(this.handleError));
  }
  getExperiments(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/getExperiment').pipe(
      catchError(this.handleError));
  }
  //Service for Main screen to upload data-set to backend:
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.uploadURL, formData, { responseType: 'text' });
  }

  //Service for Input screen to post experiemnt data to backend:
  postFormData(data: any): Observable<any> {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return <Observable<any>>this.http.post(this.postURL, data, { responseType: 'text' });
  }

  //Making call to Python API for result and scatter plot.
  getResultData(): Observable<any> {
    return <Observable<any>>this.http.get('https://automlrestapi.herokuapp.com/experiment/' + 1)
  }

  //Error Handler
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return Observable.throw(err.error() || 'Server error');
  }
}
