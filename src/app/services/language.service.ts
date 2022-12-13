import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language = new Subject<string>();

  constructor(){
  }

  setLanguage(lang: string){
    this.language.next(lang);
  }

  getLanguage(){
    return this.language;
  }
}


