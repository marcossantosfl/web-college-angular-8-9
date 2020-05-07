import {Component, Input, OnInit} from '@angular/core';
import {Subject} from '../../../model/subject/subject';
import {first} from 'rxjs/operators';
import {SubjectService} from '../../../service/subject/subject.service';
import {ActivatedRoute} from '@angular/router';
import SweetAlert from '../../../../assets/vendor/sweetalert2/dist/sweetalert2.min.js';
import {Account} from '../../../model/account/account';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  account: Account;
  subject = new Subject();

  submitted = false;

  loading = false;
  fail = false;
  success = false;

  index: number;

  @Input() accountGetObject;

  constructor(private routerActive: ActivatedRoute, private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.account = this.accountGetObject;
  }

  newSubject() {
    this.success = false;
    this.fail = false;
    this.subject.id = null;
    this.subject.name = null;
    this.subject.grade = null;
    this.subject.account = this.account.id;
  }

  editSubject(index) {
    this.success = false;
    this.fail = false;
    this.subject.id = this.account.subject[index].id;
    this.subject.name = this.account.subject[index].name;
    this.subject.grade = this.account.subject[index].grade;
    this.subject.account = this.account.id;
    this.index = index;
  }

  get() {
    this.subjectService.getSubject(this.account.id).pipe(first())
      .subscribe(
        data => {
          this.account.subject = data;
        },
        error => {
          alert('Error in sending information: Error');
        });
  }

  send() {

    this.loading = true;

    if (this.subject.id != null) {
      this.update();
      return;
    }

    this.submitted = true;

    this.subject.account = this.account.id;

    this.subjectService.registerSubject(this.subject).pipe(first())
      .subscribe(
        data => {
          setTimeout(() => {
            this.loading = false;
            this.success = true;
            this.submitted = false;
            this.subject = new Subject();
          }, 1000);
          this.get();
        },
        error => {
          alert('Error in sending information: Error');
          this.submitted = false;
          this.success = false;
          this.fail = true;
          this.loading = false;
        });
  }

  update() {

    this.submitted = true;

    this.subjectService.updateSubject(this.subject).pipe(first())
      .subscribe(
        data => {
          setTimeout(() => {
            this.loading = false;
            this.success = true;
            this.submitted = false;
            this.account.subject[this.index].name = this.subject.name;
            this.account.subject[this.index].grade = this.subject.grade;
          }, 1000);

        },
        error => {
          alert('Error in sending information: Error');
          this.submitted = false;
          this.fail = true;
        });
  }

  deleteSubject(id, index) {
    SweetAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      if (result.value) {
        // Delete event
        this.subjectService.deleteSubject(id).pipe(first())
          .subscribe(
            data => {
              this.account.subject.splice(index, 1);
            },
            error => {
            });
        // Show confirmation
        SweetAlert({
          title: 'Deleted',
          text: 'The subject has been deleted!',
          type: 'success',
          buttonsStyling: !1,
          confirmButtonClass: 'btn btn-success'
        });
      }
    });
  }
}
