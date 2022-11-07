import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPage(id: string): Observable<string> {
    return of(
      `<h1>*Load the page with the id of ${id} from the API*</h1>\n`
    );
  }
}
