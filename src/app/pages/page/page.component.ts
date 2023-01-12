import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../services/page.service";
import {Location} from "@angular/common";
import {MenuService} from "../../services/menu.service";
import {PageDTO} from "../../services/menu.service";
import {MatDialog} from "@angular/material/dialog";
import {TagsComponent} from "../../tags/tags.component";


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
  pageContent: Array<PageContent> = [];
  editPageField:string;
  deletePageField:string;
  editTagsField:string;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location,
    private menuService: MenuService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.language = this.route.snapshot.params['lang'];
    this.route.params.subscribe(val => {
      this.id = this.route.snapshot.params['id'];
      this.pageContent = [];
      this.getPage();
    });
    this.setLanguageFields()
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

  getPage(): void {
    this.pageService.getPage(this.id).subscribe( {
      next: (page: PageDTO) => {
          this.pageHTML = page.content || "";
          this.tags = page.tags;
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


  deletePage(){
    this.pageService.deletePage(this.id).subscribe(
      () => {this.menuService.getMenuData();
        window.location.reload();
      },
      )
  }

  editTags(){
    const dialogRef = this.matDialog.open(TagsComponent, {
      width: "30vw",
      height:"60vh",
      data: { tags: this.tags, id:this.id},
    });
    dialogRef.afterClosed().subscribe(result =>
      window.location.reload()
    )
  }
}
