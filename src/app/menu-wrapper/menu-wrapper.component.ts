import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-menu-wrapper',
  templateUrl: './menu-wrapper.component.html',
  styleUrls: ['./menu-wrapper.component.css']
})
export class MenuWrapperComponent implements OnInit {

  searchWord: string = '';
  menuClosed: boolean = false;
  constructor() { }

  @ViewChild('menu', { static: true }) menu: MatDrawer | any;

  @Output() init = new EventEmitter<MatDrawer>();

  ngOnInit(): void {
    this.init.emit(this.menu);
  }

  assignSearchWord(event: string) {
    this.searchWord = event;
  }

  closeMenu(){
    this.menu.close();
    this.menuClosed = !this.menuClosed;
  }



}
