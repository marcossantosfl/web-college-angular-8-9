import {Component, ElementRef, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AccountService} from '../../service/account/account.service';
import {Account} from '../../model/account/account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  account = new Account();

  reminder;

  isPrincipalshowed = false;
  isSubjectShowed = false;
  isComingShowed = false;
  spinningEffect = false;

  constructor(private accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {

    this.hiddenAll();

    this.isPrincipalshowed = true;

    this.getAccountDetail();
  }

  showTasks() {
    return this.isSubjectShowed === false ? this.isSubjectShowed = true : this.isSubjectShowed = false;
  }

  hiddenNavitation(id) {

    this.spinningEffect = true;

    this.hiddenAll();

    if (id === 0) {
      this.isPrincipalshowed = true;
      this.spinningEffect = false;
    }
    else if (id === 1) {
      this.isSubjectShowed = true;
      this.spinningEffect = false;
    } else if (id === 2) {
      this.isComingShowed = true;
      this.spinningEffect = false;
    }
  }

  hiddenAll() {
    this.isSubjectShowed = false;
    this.isComingShowed = false;
    this.isPrincipalshowed = false;
  }

  getAccountDetail() {

    const login = localStorage.getItem('login');

    this.accountService.getAccountDetails(login).pipe(first())
      .subscribe(
        data => {
          this.account = data;
        },
        error => {
          this.hiddenAll();
          alert('Error in getting information: Error');
        });
  }

  getAllSubjectCompleted() {
    let total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.account.subject.length; ++i) {
      if (this.account.subject[i].grade >= 40) {
        total++;
      }
    }

    return total;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
