import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../services/page.service";
import {Location} from "@angular/common";
import {MenuService} from "../../services/menu.service";
import {PageDTO} from "../../services/menu.service";
import {LatexDialogComponent} from "../../latex-dialog/latex-dialog.component";
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

  id: string;
  language: string;
  pageHTML: string = "";
  tags?:string[] = [];
  pageContent: Array<PageContent> = [];
  pagePath: string;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location,
    private menuService: MenuService,
    private matDialog: MatDialog
  ) {
  }

//todo add 'check for latex' func on html

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.language = this.route.snapshot.params['lang'];
    this.route.params.subscribe(val => {
      this.id = this.route.snapshot.params['id'];
      this.pageContent = [];
      this.getPage();
    });
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
        // this.separateContent();
      }
    });
  }


  checkForLatex(): number {
    const match = this.pageHTML.match('<span class="ql-formula">');
    return match?.length || 0;
  }

  separateContent() {
    if (this.checkForLatex() !== 0) {
      const tag = '<span class="ql-formula">';
      const endTag = '</p>';
      const content = this.pageHTML.split(tag);
      content.forEach(str => {
        if(str.includes(endTag)) {
          const separated = str.split(endTag);
          const ltx = separated[0];
          const normal = separated[1];
          this.pageContent.push({latex: true, content: ltx});
          if(normal.length !== 0) {
            this.pageContent.push({latex: false, content: normal});
          }

        } else {
          if(str.length !== 0) {
            this.pageContent.push({latex: false, content: str});
          }

        }
      });

    } else {
      this.pageContent.push({latex: false, content: this.pageHTML});
    }
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
