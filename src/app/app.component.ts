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
  currentlyOpenPage: number = -1;
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
    if(!this.loggedIn){
      this.router.navigateByUrl('login');
    }
    this.darkModeControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });

  }

  isInLogin() {
    return this.location.path() === '/login';
  }

  getLogin(): boolean {
    const username =  sessionStorage.getItem('username');
    const logged = sessionStorage.getItem("loggedIn");
    if(logged ===  null ||
      username === null || username === '') {
      sessionStorage.setItem('loggedIn', 'false');
    }
    return sessionStorage.getItem("loggedIn") === 'true';
  }

  switchDarkMode(): void {
    this.darkModeControl.setValue(!this.darkModeControl.value);
  }


  checkClickOutsideMenu(event: any) {
    const toggleButton = document.getElementById("toggleMenuButton");
    if(this.menu?.opened && toggleButton && !toggleButton.contains(event.target) ) {
      const menuElement = document.getElementById("menu");
      if(menuElement &&  !menuElement.contains(event.target)) {
        this.menu?.close();
      }
    }
  }

  checkMenuOpen(event: any) {
    this.currentlyOpenPage = event;
    this.menu?.toggle();
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
