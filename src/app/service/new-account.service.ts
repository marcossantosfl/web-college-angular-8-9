import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppServer} from '../appserver';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {

  constructor(private http: HttpClient, private router: Router) {
  }

  create(account) {
    return this.http.post<any>(AppServer.serverAccount, account).pipe(map(data => {
      return data;
    }));
  }
}
