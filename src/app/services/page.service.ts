import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
  ) { }

  getPage(id: string): Observable<string> {
    return of(
      `<h1>*Load the page with the id of ${id} from the API*</h1>\n`
    );
  }
}
