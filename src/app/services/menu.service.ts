import {Injectable} from '@angular/core';
import { Page} from "./mock-menu-data";
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = 'http://localhost:8080/';
const PAGE_URL = URL + 'menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {
  }

  getMenuData(): Observable<Page[]> {
    return this.http.get<Page[]>(PAGE_URL, {responseType: 'json'});
  }
}
