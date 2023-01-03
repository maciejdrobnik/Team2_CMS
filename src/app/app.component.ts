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
    this.darkModeControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });
    this.location.subscribe(loc => {
      if(loc.url === '/login') {
        this.loggedIn = false;
        this.router.navigateByUrl('login');
      }
    });

    if(location.pathname !== 'login' && !this.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }


  switchDarkMode(): void {
    this.darkModeControl.setValue(!this.darkModeControl.value);
  }

  toggleLogin() {
    this.loggedIn = !this.loggedIn;
    if(!this.loggedIn){
      this.router.navigateByUrl('login');
    }

  }
}
