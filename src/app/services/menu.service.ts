import {Injectable} from '@angular/core';
import { Page} from "./mock-menu-data";
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LanguageService} from "./language.service";

const URL = 'http://localhost:8080/';

const PAGE_URL = URL + 'menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient, private languageService: LanguageService) {
  }

  getMenuData(): Observable<Page[]> {
    const lang = this.languageService.getLanguage();
    const url = PAGE_URL + '/' + lang; //for now to test language change this part manually to eg
   // const url = PAGE_URL + '/' + 'polish';
    return this.http.get<Page[]>(url, {responseType: 'json'});
  }
}
