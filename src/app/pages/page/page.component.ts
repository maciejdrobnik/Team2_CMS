import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from "../../services/page.service";
import {Location} from "@angular/common";
import {MenuService} from "../../services/menu.service";
import {PageDTO} from "../../services/menu.service";
import {MatDialog} from "@angular/material/dialog";
import {TagsComponent} from "../../tags/tags.component";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {DeleteDialogComponent, DeleteDialogData} from "../../delete-dialog/delete-dialog.component";

interface PageContent {
  latex: boolean,
  content: string;
}


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  id: number;

  language: string;
  pageHTML: string = "";
  tags?:string[] = [];
  showTags?: string[] = [];
  pageContent: Array<PageContent> = [];
  editPageField:string;
  deletePageField:string;
  editTagsField:string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  pageName:string;
  editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location,
    private menuService: MenuService,
    private matDialog: MatDialog,
    private _snackbar:MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.editMode = false;
    this.id = this.route.snapshot.params['id'];
    this.language = this.route.snapshot.params['lang'];
    this.route.params.subscribe(val => {
      this.id = this.route.snapshot.params['id'];
      this.pageContent = [];
      this.getPage();
    });
    this.setLanguageFields();
  }

  setLanguageFields() {
    switch (this.language) {
      case "polish":
        this.editPageField = "Edytuj stronę";
        this.deletePageField = "Usuń stronę";
        this.editTagsField = "Edytuj Tagi";
        break;
      case "english":
        this.editPageField = "Edit Page";
        this.deletePageField = "Delete Page";
        this.editTagsField = "Edit Tags";
        break;
      case "french":
        this.editPageField = "Modifier La Page";
        this.deletePageField = "Supprimer La Page";
        this.editTagsField = "Étiquettes d'édition";
        break;
    }
  }
  changeEditMode(newPageName: string){
    this.editMode = !this.editMode;
    if(newPageName !== this.pageName){
      this.pageName = newPageName;
      const newPage:PageDTO = {
        pageName: this.pageName,
        id:this.id
      }
      this.pageService.patchPage(newPage).subscribe();
    }
  }
  getPage(): void {
    this.pageService.getPage(this.id).subscribe( {
      next: (page: PageDTO) => {
          this.pageHTML = page.content || "";
          this.tags = page.tags;
          this.showTags = page.tags;
          this.pageName = page.pageName || "";
          },
      error: () => {},
      complete: () => {
        const newPageContent = document.getElementById("pageContent");
        if (newPageContent){
          newPageContent.innerHTML = this.pageHTML;
        }
      }
    });
  }

  deletePage(evt: MouseEvent){
    const elementTargeted = new ElementRef(evt.currentTarget);
    let dialogData:DeleteDialogData = {
      isPage: true,
      name: this.pageName,
      confirmDeleted:false,
      target: elementTargeted,
      isLeft:false
    }
    let deleteDialogRef = this.matDialog.open(DeleteDialogComponent, {
      minHeight: '110px',
      minWidth: '200px',
      panelClass: 'custom-dialog-container',
      data: dialogData,
    });
    deleteDialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.openSnackbar(`You deleted the page ${this.pageName}`);
          this.pageService.deletePage(this.id).subscribe(
            () => this.router.navigateByUrl(`/${this.language}/home`)
          )
        }
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

  editTags(){
    let tempTags = this.tags;
    const dialogRef = this.matDialog.open(TagsComponent, {
      width: "400px",
      minHeight:"240px",
      maxHeight:"700px",
      data: { tags: tempTags, id:this.id},
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if(data.confirmation){
        const newPage:PageDTO = {
          tags:data.tags,
          id:this.id,
        }
        this.pageService.patchPage(newPage).subscribe(
          () => {
            this.getPage();
            // @ts-ignore
            this.showTags = {...this.tags} || [];
            this.openSnackbar("You edited Tags");
          }
        )
      }
      }
    )
  }
}
