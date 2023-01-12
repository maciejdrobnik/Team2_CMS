import {Component, HostBinding, SimpleChange} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {FormControl} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamProject';
  menu?: MatDrawer;
  loggedIn = false;

  @HostBinding('class') className = '';
  darkModeControl = new FormControl(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.loggedIn = this.getLogin();
    console.log(this.loggedIn)
    this.darkModeControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });

  }

  isInLogin() {
    return this.location.path() === '/login';
  }

  getLogin(): boolean {
    if(sessionStorage.getItem("loggedIn") ===  null) {
      sessionStorage.setItem('loggedIn', 'false');
    }
    return Boolean(sessionStorage.getItem("loggedIn"));
  }

  switchDarkMode(): void {
    this.darkModeControl.setValue(!this.darkModeControl.value);
  }


  setLogin(event: any, value: boolean) {
    sessionStorage.setItem('username', value ? event : '');
    this.loggedIn = value;
    sessionStorage.setItem('loggedIn', String(value));
    if(!this.loggedIn){
      this.router.navigateByUrl('login');
    }
  }


}
