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
  language:string;

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(
      lang => {this.language = lang}
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
    console.log("Odpala się")
    this.languageService.setLanguage(lang);
  }
}
