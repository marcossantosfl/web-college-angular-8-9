import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../model/account/account';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {ComingService} from '../../../service/service/coming.service';
import {Coming} from '../../../model/coming/coming';
import SweetAlert from '../../../../assets/vendor/sweetalert2/dist/sweetalert2.min';
import {Subject} from '../../../model/subject/subject';

declare var $: any;

@Component({
  selector: 'app-coming',
  templateUrl: './coming.component.html',
  styleUrls: ['./coming.component.css']
})

export class ComingComponent implements OnInit {

  account: Account;
  coming = new Coming();

  submitted = false;

  loading = false;
  fail = false;
  success = false;

  index: number;

  @Input() accountGetObject;

  constructor(private routerActive: ActivatedRoute, private comingService: ComingService) {
  }

  ngOnInit(): void {
    this.account = this.accountGetObject;
    $('#datepicker').datepicker().on('change', (e: any) => {
      this.coming.date = e.target.value;
    });
  }

  newComing() {
    this.success = false;
    this.fail = false;
    this.coming.id = null;
    this.coming.tittle = null;
    this.coming.description = null;
    this.coming.date = null;
    this.coming.notified = null;
    this.coming.account = this.account.id;
  }

  editComing(index) {
    this.success = false;
    this.fail = false;
    this.coming.id = this.account.coming[index].id;
    this.coming.tittle = this.account.coming[index].tittle;
    this.coming.description = this.account.coming[index].description;
    this.coming.date = this.account.coming[index].date;
    this.coming.notified = this.account.coming[index].notified;
    this.coming.account = this.account.id;
    this.index = index;
  }

  get() {
    this.comingService.getComing(this.account.id).pipe(first())
      .subscribe(
        data => {
          this.account.coming = data;
        },
        error => {
          alert('Error in sending information: Error');
        });
  }

  send() {
    this.loading = true;

    if (this.coming.id != null) {
      this.update();
      return;
    }

    this.submitted = true;
    this.success = false;

    this.coming.account = this.account.id;

    this.comingService.registerComing(this.coming).pipe(first())
      .subscribe(
        data => {
          setTimeout(() => {
            this.loading = false;
            this.success = true;
            this.submitted = false;
            this.coming = new Coming();
          }, 1000);
          this.get();
        },
        error => {
          alert(error);
          this.submitted = false;
          this.success = false;
        });
  }

  update() {

    this.submitted = true;
    this.success = false;

    this.comingService.updateComing(this.coming).pipe(first())
      .subscribe(
        data => {
          setTimeout(() => {
            this.loading = false;
            this.success = true;
            this.submitted = false;
            this.account.coming[this.index].tittle = this.coming.tittle;
            this.account.coming[this.index].description = this.coming.description;
            this.account.coming[this.index].date = this.coming.date;
            this.account.coming[this.index].notified = this.coming.notified;
          }, 1000);
        },
        error => {
          alert('Error in sending information: Error');
          this.submitted = false;
          this.success = false;
        });
  }

  deleteComing(id, index) {
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
        this.comingService.deleteComing(id).pipe(first())
          .subscribe(
            data => {
              this.account.coming.splice(index, 1);
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
