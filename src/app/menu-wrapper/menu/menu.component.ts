import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import { Page } from "../../services/mock-menu-data";
import { MenuService } from "../../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {LanguageService} from "../../services/language.service";
import {MatDialog} from "@angular/material/dialog";
import {AddFolderComponent} from "../../add-folder/add-folder.component";
import {FolderDTO, PageDTO} from "../../services/menu.service";
import {FolderDialogData} from "../../add-folder/add-folder.component";
import {AddPageComponent, PageDialogData} from "../../add-page/add-page.component";
import {Location} from '@angular/common';
import {PageService} from "../../services/page.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Page>(page => page.children);
  pagesSource = new MatTreeNestedDataSource<Page>();
  pagesArray = new Array<any>;

  classHidden = 'menu-tree-invisible';

  @Input() isClosed: boolean;
  @Input() searchWord: any;

  @Output() redirect = new EventEmitter<any>();

  language:string;
  addPageField:string;
  addFolderField:string;
  addNewRootFolder:string;
  constructor(private menuService: MenuService, private  languageService: LanguageService, public dialog: MatDialog, private location:Location, private pageService: PageService) { }

  getMenuData(): void {
    this.menuService.getMenuData().subscribe(pages => {
      this.pagesSource.data = pages;
    });
  }

  hasSubpages = (_: number, page: Page) => !!page.children && page.children.length > 0;

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(
      (lang) => {
        this.getMenuData();
        this.language = lang;
        this.setLanguageFields(lang);
      },
    );
  }

  setLanguageFields(lang:string){
    switch (lang){
      case "polish":
        this.addPageField = "Dodaj stronę";
        this.addFolderField = "Dodaj folder";
        this.addNewRootFolder = "Dodaj Nowy Folder";
        break;
      case "english":
        this.addPageField = "Add Page";
        this.addFolderField = "Add Folder";
        this.addNewRootFolder = "Add New Folder";
        break;
      case "french":
        this.addPageField = "Ajouter Une Page";
        this.addFolderField = "Ajouter Le Dossier";
        this.addNewRootFolder = "Ajouter Un Nouveau Dossier";
        break;
    }
  }

  pagesToArray(pages: Page[]): Page[] {
    let arr = [];
    if(pages) {
      for (let page of pages) {
        if (page.children && page.children.length > 0) {
          let arrSub = this.pagesToArray(page.children);
          for (let p of arrSub) {
            arr.push(p);
          }
        }
        arr.push(page);
      }
    }
    return arr;
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let search: SimpleChange = changes['searchWord'];
    let menuClose: SimpleChange = changes['isClosed'];
    if(search) {
      this.search();
    }
    if(menuClose) {
      this.onClose();
    }
  }

  onClose() {
    this.treeControl.collapseAll();
  }

  loadPage() {
    this.redirect.emit();
  }

  search(){
    this.pagesArray = this.pagesToArray(this.pagesSource.data);
    if(this.searchWord !== '') {
      this.hideAllPages(true);
      this.searchWord = this.searchWord.toLowerCase();
      for (const page of this.pagesSource.data){
        this.searchMenuTree(page);
      }
    }else {
      this.hideAllPages(false);
    }
  }

  searchMenuTree(page: Page): boolean{
    const name = page.name.toLowerCase();
    let isPageSearched = false;
    if(name.includes(this.searchWord)) {
      this.showPageResult(page.id);
      this.treeControl.expand(page);
      isPageSearched = true;
    }
    if (page.children && page.children.length !== 0){
      let result = false;
      for (const subpage of page.children){
        result = this.searchMenuTree(subpage);
        if(result) {
          this.showPageResult(page.id);
          this.treeControl.expand(page);
          isPageSearched = true;
        }
      }

    }
    return isPageSearched;

  }


  showPageResult(pageID: number): void {
    const pageToHide = document.getElementById(pageID.toString());
    if(pageToHide){
      pageToHide.classList.remove(this.classHidden);
    }
  }

  hideAllPages(ifHide: boolean): void {

    if(!ifHide) {
      this.treeControl.collapseAll();
    }


    for(let page of this.pagesArray) {
      const pageToHide = document.getElementById(page.id.toString());
      if(pageToHide) {
        if(ifHide) {
          pageToHide.classList.add(this.classHidden);
        }else {
          pageToHide.classList.remove(this.classHidden);
        }
      }
    }
  }

  addChildFolder(parentId: number): void{
    let dialogData:FolderDialogData = {
      folderName: "",
      mode:"child",
      language:this.language
    }
    let dialogRef = this.dialog.open(AddFolderComponent, {
      height: '35vh',
      width: '35vw',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let previousTags:string[] = [];
        this.pageService.getPage(parentId).subscribe(
          (result2) => {
            previousTags = result2.tags || [];
          },
          ()=>{},
          ()=>{
            let newFolder: FolderDTO = {
              folderName: result,
              tags: previousTags,
            }
            this.menuService.addChildFolder(newFolder, parentId).subscribe(
              () => this.getMenuData(),
            );
          }
        )
      }
    });
  }

  addRootFolder():void{
    let dialogData:FolderDialogData = {
      folderName: "",
      mode: "root",
      language:this.language
    }
    let dialogRef = this.dialog.open(AddFolderComponent, {
      height: '35vh',
      width: '35vw',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let newFolder: FolderDTO = {
          folderName: result,
        }
        this.menuService.addRoot(newFolder).subscribe(
          () => this.getMenuData(),
        );
      }
      });
  }

  addPage(parentId: number): void{
    let dialogData:PageDialogData = {
      pageName: "",
      language:this.language,
    }
    let dialogRef = this.dialog.open(AddPageComponent, {
      height: '35vh',
      width: '35vw',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let previousTags:string[] = [];
        this.pageService.getPage(parentId).subscribe(
          (result) => {
            previousTags = result.tags || [];
          },
          ()=>{},
          ()=>{
            let newPage: PageDTO = {
              pageName: result.pageName,
              tags: previousTags,
              content: "",
            }
            this.menuService.addPage(newPage, parentId).subscribe(
              (result) => {
                this.getMenuData();
                this.location.replaceState(`/${this.language}/${result.id}`);
                window.location.reload();
              },
            );
          }

        )
      }
    });
  }
}
