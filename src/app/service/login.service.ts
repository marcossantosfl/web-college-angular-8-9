import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AppServer} from '../appserver';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  login(account){
    return this.http.post<any>(AppServer.serverLogin, account).pipe(map(data => {
      const token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
      localStorage.setItem('token', token);
      localStorage.setItem('login', account.login);
      return data;
    }));
  }
}
