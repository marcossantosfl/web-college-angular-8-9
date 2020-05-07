import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppServer} from '../../appserver';
import {map} from 'rxjs/operators';
import {Coming} from '../../model/coming/coming';

@Injectable({
  providedIn: 'root'
})
export class ComingService {

  constructor(private http: HttpClient) {
  }

  getComing(id): Observable<any> {
    return this.http.get<any>(AppServer.serverComing + id).pipe(map(data => {
      return data;
    }));
  }

  registerComing(coming: Coming): Observable<any> {
    return this.http.post<any>(AppServer.serverComing, coming).pipe(map(data => {
      return data;
    }));
  }

  updateComing(coming: Coming): Observable<any> {
    return this.http.put<any>(AppServer.serverComing, coming).pipe(map(data => {
      return data;
    }));
  }

  deleteComing(id): Observable<any> {
    return this.http.delete(AppServer.serverComing + id, {responseType: 'text'});
  }
}
