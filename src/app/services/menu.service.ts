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
  language:string;

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe(
      lang => {this.language = lang}
    );
  }

  getMenuData(): Observable<Page[]> {
    const url = PAGE_URL + '/' + this.language;
    return this.http.get<Page[]>(url, {responseType: 'json'});
  }
}
