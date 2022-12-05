import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

const PAGE_URL = 'https://c52c176b-299c-4a4a-a352-c0fd5faa7e4f.mock.pstmn.io/page/';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getPage(id: string): Observable<string> {
    return this.http.get(PAGE_URL + id, {responseType: 'text'}).pipe(
      catchError((_error: any): Observable<string> => {
        this.router.navigate(['not-found']).then();
        return of('Error 404');
      })
    );

  }
}
