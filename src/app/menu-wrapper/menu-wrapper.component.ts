import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-menu-wrapper',
  templateUrl: './menu-wrapper.component.html',
  styleUrls: ['./menu-wrapper.component.css']
})
export class MenuWrapperComponent implements OnInit {
  searchWord: string = '';


  constructor() { }

  @ViewChild('menu', { static: true }) menu: MatDrawer | any;

  @Output() init = new EventEmitter<MatDrawer>();

  @Input() menuClosed: boolean = true;
  @Input() currentlyOpenPage: number = -1;

  ngOnInit(): void {
    this.init.emit(this.menu);
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let menuClose:  SimpleChange = changes['menuClosed'];
    if (menuClose && menuClose.currentValue == true) {
      this.searchWord = '';
    }
  }


  assignSearchWord(event: string) {
    this.searchWord = event;
  }

  closeMenu(){
    this.menu.close();
    this.searchWord = '';
  }

}
