import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['init']);
    } else {
      this.router.navigate(['dash']);
    }
  }

  hideMenu() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').trim.toString() !== null) {
      return false;
    } else {
      return true;
    }
  }
}
