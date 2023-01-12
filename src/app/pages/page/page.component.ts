import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageDTO, PageService} from "../../services/page.service";


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
  pageHTML: string = "";
  tags?:string[] = [];
  pageContent: Array<PageContent> = [];


  constructor(
    private route: ActivatedRoute,
    private pageService: PageService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
      }
    });
  }



}
