import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PageDTO} from "./menu.service";

const URL = 'http://localhost:8080/';
const PAGE_URL = URL + 'page/';

// export class Page {
//   constructor(
//     public pageName: string,
//     public content: string,
//   ) { }
// }

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

  getPage(id: string): Observable<PageDTO> {
    console.log(id);
    return this.http.get<any>(PAGE_URL + id, {responseType: 'json'}).pipe(
      catchError((_error: any): Observable<PageDTO> => {
        this.router.navigate(['not_found']).then();
        return of(pageDTONotFound);
      })
    );
  }

  deletePage(id:string): Observable<any> {
    return this.http.delete(URL + id, {responseType:'json'});
  }

  patchPage(newPage:PageDTO): Observable<any> {
    console.log(PAGE_URL + newPage.id)
    return this.http.patch(PAGE_URL + newPage.id, newPage, {responseType:'json'})
  }
}
