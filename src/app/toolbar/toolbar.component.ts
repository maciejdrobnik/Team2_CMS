import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( private languageService: LanguageService) {
  }

  @Output() menuOpened = new EventEmitter<void>();
  @Output() darkModeSwitched = new EventEmitter<void>();
  @Output() fontSideSwitched = new EventEmitter<number>();

  darkModeEnabled = false;

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(
      lang => {console.log(lang)}
    );
  }

  switchDarkMode() {
    this.darkModeSwitched.emit();
    this.darkModeEnabled = !this.darkModeEnabled;
  }

  switchFontSize(fontSize: number) {
    this.fontSideSwitched.emit(fontSize);
  }

  switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getLanguage() {
    return this.languageService.getLanguage();
  }
}
