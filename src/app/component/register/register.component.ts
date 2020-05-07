import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {NewAccountService} from '../../service/new-account.service';
import {Router} from '@angular/router';
import {Account} from '../../model/account/account';
import {LoginService} from '../../service/login.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  account = new Account();

  repassword = '';

  submitted = false;
  loading = false;
  fail = false;
  success = false;

  constructor(private newAccountService: NewAccountService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  send() {

    this.submitted = true;
    this.loading = true;

    this.newAccountService.create(this.account).pipe(first())
      .subscribe(
        () => {
          setTimeout(() => {
            this.loginService.login(this.account).pipe(first())
              .subscribe(
                () => {
                  this.router.navigate(['dash']);
                },
                error => {
                });
          }, 1500);
          this.fail = false;
          this.success = true;
          this.loading = true;
          this.submitted = true;
        },
        error => {
          this.fail = true;
          this.success = false;
          this.loading = false;
          this.submitted = false;
        });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    if (controlName !== matchingControlName) {
      return true;
    } else {
      return false;
    }
  }
}
