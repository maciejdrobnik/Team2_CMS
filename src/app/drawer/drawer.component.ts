import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  constructor() { }

  @ViewChild('menu', { static: true }) menu: MatDrawer | any;

  @Output() init = new EventEmitter<MatDrawer>();

  ngOnInit(): void {
    this.init.emit(this.menu);
  }

}
