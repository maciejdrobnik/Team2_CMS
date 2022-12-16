import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  initLanguage = window.location.pathname.split("/")[1] ? window.location.pathname.split("/")[1] : "english";
  language = new BehaviorSubject<string>(this.initLanguage);

  constructor(){
  }

  setLanguage(lang: string){
    this.language.next(lang);
  }

  getLanguage(){
    return this.language;
  }
}


