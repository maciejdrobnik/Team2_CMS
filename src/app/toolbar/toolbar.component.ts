import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() {
  }

  @Output() menuOpened = new EventEmitter<void>();
  @Output() darkModeSwitched = new EventEmitter<void>();

  darkModeEnabled = false;

  ngOnInit(): void {
  }

  switchDarkMode() {
    this.darkModeSwitched.emit();
    this.darkModeEnabled = !this.darkModeEnabled;
  }
}
