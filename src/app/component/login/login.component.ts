import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account/account.service';
import {Account} from '../../model/account/account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: any = [{login: '', password: ''}];

  registerForm: FormGroup;

  submitted = false;
  loading = false;
  fail = false;

  constructor(private loginService: LoginService, private accountService: AccountService,
              private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f()
  {
    return this.registerForm.controls;
  }

 send()
  {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid)
    {
      this.loading = false;
      return;
    }
    this.account = this.registerForm.value;

    this.loginService.login(this.account).pipe(first())
      .subscribe(
        data => {
          this.submitted = false;
          this.fail = false;
          this.router.navigate(['dash']);
        },
        error => {
          this.loading = false;
          this.submitted = false;
          this.fail = true;
        });
  }

}
