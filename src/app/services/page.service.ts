import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

const URL = 'http://localhost:8080/';
const PAGE_URL = URL + 'page/';

export interface PageDTO{
  pageName?: string,
  content?:string,
  tags?:string[],
  id?:number,
}

let pageDTONotFound: PageDTO = {
  tags: [],
  id: 0,
  content: "Page not found",
  pageName:"not found"
};
@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getPage(id: number): Observable<PageDTO> {
    return this.http.get<any>(PAGE_URL + id, {responseType: 'json'}).pipe(
      catchError((_error: any): Observable<PageDTO> => {
        this.router.navigate(['not_found']).then();
        return of(pageDTONotFound);
      })
    );
  }
}
