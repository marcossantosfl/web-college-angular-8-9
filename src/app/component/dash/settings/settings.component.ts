import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../model/account/account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AccountService} from '../../../service/account/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  @Input() accountGetObject;

  account: Account;

  submitted = false;
  success = false;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  accountPattern = '[A-Za-z0-9]+';

  constructor(private accountService: AccountService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.account = this.accountGetObject;
  }

  getAccountDetails() {
    this.accountService.getAccountDetailsById(this.account.id).pipe(first())
      .subscribe(
        data => {
          this.account = data;
        },
        error => {
          alert('Error in getting information: Error');
        });
  }

  send() {

    this.submitted = true;

    this.accountService.updateAccount(this.account).pipe(first())
      .subscribe(
        data => {
          this.submitted = false;
          this.success = true;
        },
        error => {
          alert('Error in updating information: Error');
          this.submitted = false;
          this.success = false;
        });
  }
}
