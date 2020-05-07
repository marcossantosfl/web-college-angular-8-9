import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppServer} from '../../appserver';
import {map} from 'rxjs/operators';
import {Subject} from '../../model/subject/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }

  getSubject(id): Observable<any> {
    return this.http.get<any>(AppServer.serverSubject + id).pipe(map(data => {
      return data;
    }));
  }

  registerSubject(subject: Subject): Observable<any> {
    return this.http.post<any>(AppServer.serverSubject, subject).pipe(map(data => {
      return data;
    }));
  }

  updateSubject(subject: Subject): Observable<any> {
    return this.http.put<any>(AppServer.serverSubject, subject).pipe(map(data => {
      return data;
    }));
  }

  deleteSubject(id): Observable<any> {
    return this.http.delete(AppServer.serverSubject + id, {responseType: 'text'});
  }
}
