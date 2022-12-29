import {Injectable} from '@angular/core';
import { Page} from "./mock-menu-data";
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {LanguageService} from "./language.service";

export interface FolderDTO{
  folderName: string
}

const URL = 'http://localhost:8080/';
const PAGE_URL = URL + 'menu';
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
    const url = PAGE_URL + '/' + this.language;
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

  addChildPage(folder: FolderDTO, parentId:string): Observable<FolderDTO> {
    const url = FOLDER_URL + '/' + 'parent' + '/' + parentId;
    console.log(url);
    return this.http.post<FolderDTO>(url, folder, {responseType:'json'});
  }
}
