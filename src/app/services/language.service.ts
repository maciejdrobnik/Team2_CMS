import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language = "english";

  constructor(){
  }

  setLanguage(lang: string){
    this.language = lang;
  }

  getLanguage(){
    return this.language;
  }
}


