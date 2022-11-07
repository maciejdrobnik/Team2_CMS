import {Injectable} from '@angular/core';
import {MENU_DATA, Page} from "./mock-menu-data";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuData(): Observable<Page[]> {
    return of(MENU_DATA);
  }
}
