import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppServer} from '../../appserver';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  authenticatedAccount() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').trim.toString() !== null) {
      return true;
    } else {
      return false;
    }
  }

  getAccountDetails(login): Observable<any> {
    return this.http.get<any>(AppServer.serverAccount + 'find/' + login).pipe(map(data => {
      return data;
    }));
  }

  getAccountDetailsById(id): Observable<any> {
    return this.http.get<any>(AppServer.serverAccount + id).pipe(map(data => {
      return data;
    }));
  }

  updateAccount(account) {
    return this.http.put<any>(AppServer.serverAccount, account).pipe(map(data => {
      return data;
    }));
  }
}
