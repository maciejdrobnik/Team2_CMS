import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const PAGE_URL = 'https://c52c176b-299c-4a4a-a352-c0fd5faa7e4f.mock.pstmn.io/page/';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient
  ) { }

  getPage(id: string): Observable<string> {
    return this.http.get(PAGE_URL + id, {responseType: 'text'});
  }
}
