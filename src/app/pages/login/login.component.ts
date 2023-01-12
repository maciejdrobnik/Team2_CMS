import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() logIn = new EventEmitter<string>();

  warning: string = '';
  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  logInClick(username: string, password: string) {
    if(username === '' || password === '') {
      this.warning = 'Fields cannot be empty.'
    } else {
      this.logIn.emit(username);
      this.router.navigateByUrl("english/home");
      this.warning = '';
    }
  }


}
