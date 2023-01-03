import {Injectable} from '@angular/core';
import { Page} from "./mock-menu-data";
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {LanguageService} from "./language.service";

export interface FolderDTO{
  folderName: string
}

export interface PageDTO{
  pageName: string,
  content:string,
  tags:string[],
  id?:number,
}

const URL = 'http://localhost:8080/';
const MENU_URL = URL + 'menu';
const PAGE_URL = URL + 'page';
const FOLDER_URL = URL + 'folder'
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
    const url = MENU_URL + '/' + this.language;
    return this.http.get<Page[]>(url, {responseType: 'json'});
  }

  addRoot(folder: FolderDTO): Observable<FolderDTO> {
    const url = FOLDER_URL + '/' + this.language;
    return this.http.post<FolderDTO>(url, folder, {responseType:'json'});
  }
  addChildFolder(folder: FolderDTO, parentId:number): Observable<FolderDTO> {
    const url = FOLDER_URL + '/' + 'parent' + '/' + parentId;
    console.log(url);
    return this.http.post<FolderDTO>(url, folder, {responseType:'json'});
  }

  addPage(page: PageDTO, parentId:number): Observable<PageDTO> {
    const url = PAGE_URL + '/' + 'parent' + '/' + parentId;
    return this.http.post<PageDTO>(url, page, {responseType:'json'});
  }

  getPageContent(id:number): Observable<PageDTO> {
  const url = PAGE_URL + '/' + id;
  return this.http.get<PageDTO>(url, {responseType: 'json'});
}
}
