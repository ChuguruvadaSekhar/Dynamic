import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';

import { FieldConfig } from '../models/form-fields';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private subject = new Subject<any>();
  data: FieldConfig[] | any
  baseUrl = 'http://localhost:3000/fieldInfo';

  constructor(private httpClient: HttpClient) {}

  

  getNewSample() {
    return this.httpClient.get<FieldConfig[]>(`./assets/mocks/sample.json`)
    // return this.httpClient.get<FieldConfig[]>(this.baseUrl)
    .pipe(catchError(this.handleError));
  }

  addNewSample(data: FieldConfig):Observable<FieldConfig>{
    return this.httpClient.post<FieldConfig>(`./assets/mocks/sample.json`, data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }



  callApiEvent(jsonName: any) {
    this.subject.next(jsonName);
  }


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}

  getApiEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
