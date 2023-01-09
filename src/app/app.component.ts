import {Component, HostBinding} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamProject';
  menu?: MatDrawer;
  clickTarget: any;

  @HostBinding('class') className = '';
  darkModeControl = new FormControl(false);

  ngOnInit(): void {
    this.darkModeControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });
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
}
