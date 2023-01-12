import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, ElementRef} from '@angular/core';
import { Page } from "../../services/mock-menu-data";
import { MenuService } from "../../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {LanguageService} from "../../services/language.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddFolderComponent} from "../../add-folder/add-folder.component";
import {FolderDTO, PageDTO} from "../../services/menu.service";
import {FolderDialogData} from "../../add-folder/add-folder.component";
import {AddPageComponent, PageDialogData} from "../../add-page/add-page.component";
import {Location} from '@angular/common';
import {PageService} from "../../services/page.service";
import { ActivatedRoute, Router  } from '@angular/router';
import {DeleteDialogComponent, DeleteDialogData} from "../../delete-dialog/delete-dialog.component";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {EditFolderDialogComponent, EditFolderDialogData} from "../../edit-folder-dialog/edit-folder-dialog.component";

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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private menuService: MenuService, private  languageService: LanguageService,
              public dialog: MatDialog, private location:Location, private pageService: PageService,
              private route: ActivatedRoute, private router: Router, private _snackbar:MatSnackBar) { }

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
      minHeight:"250px",
      width: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("coś nie tak")
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
      minHeight:"250px",
      width: '400px',
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
      minHeight:"170px",
      width: '435px',
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
            console.log(previousTags)
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
  deletePage(page:Page, evt: MouseEvent){
    const elementTargeted = new ElementRef(evt.currentTarget);
    let dialogData:DeleteDialogData = {
      isPage: true,
      name: page.name,
      confirmDeleted:false,
      target: elementTargeted,
      isLeft:true,
    }
    let deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      minHeight: '110px',
      minWidth: '200px',
      panelClass: 'custom-dialog-container',
      data: dialogData,
    });
    deleteDialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.pageService.deletePage(page.id).subscribe(
            () =>{
              this.getMenuData();
              if( this.router.url === `/${this.language}/${page.id}`) {
                const URL = `/${this.language}/home`;
                this.router.navigateByUrl(URL);
              }
            });
        }
    })
  }

  deleteFolder(page:Page, evt: MouseEvent){
    const elementTargeted = new ElementRef(evt.currentTarget);
    let dialogData:DeleteDialogData = {
      isPage: false,
      name: page.name,
      confirmDeleted:false,
      target: elementTargeted,
      isLeft:true
    }
    let deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      minHeight: '110px',
      minWidth: '200px',
      panelClass: 'custom-dialog-container',
      data: dialogData,
    });
    deleteDialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.menuService.deleteFolder(page.id).subscribe(
          () =>{
            this.getMenuData();
            this.openSnackbar(`You deleted folder ${page.name}`)
            //check all children. If you were on page inside you need to reload. Hard to do for now.
              const URL = `/${this.language}/home`;
              this.router.navigateByUrl(URL);
          });
      }
    })
  }
  editFolderTags(folderId:number){
    this.menuService.getFolder(folderId).subscribe(
      folder => {
        let dialogData:EditFolderDialogData = {
          confirmation: false,
          id: folderId,
          tags: folder.tags || [],
          folderName: folder.folderName
        }
        let deleteDialogRef = this.dialog.open(EditFolderDialogComponent, {
          height: '330px',
          width: '400px',
          data: dialogData,
        });
        deleteDialogRef.afterClosed().subscribe(
          result => {
            const newFolder:FolderDTO = {
              folderName: dialogData.folderName,
              tags: dialogData.tags

            }
            this.menuService.patchFolder(newFolder, dialogData.id).subscribe();
            this.getMenuData();
          }
        )
      }
    )
  }
  openSnackbar(message:string){
    this._snackbar.open(message,'', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass:['snackbarStyles'],
    })
  }
}
