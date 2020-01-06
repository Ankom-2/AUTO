import { Injectable } from '@angular/core'; 
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }
  private subject = new Subject<any>(); 

  sendMessage(msg: string) {
      this.subject.next(msg); 
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable(); 
  }
}
