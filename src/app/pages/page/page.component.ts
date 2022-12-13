import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PageService } from "../../services/page.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  id: string;
  pageHTML: string = "";
  pagePath: string;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location
  ) {
  }

//todo add 'check for latex' func on html

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //will use later for path
    //this.pagePath = '/test';
    //this.location.replaceState(this.pagePath);
    this.route.params.subscribe(val => {
      this.id = this.route.snapshot.params['id'];
      this.getPage();
    });
  }

  getPage(): void {
    this.pageService.getPage(this.id).subscribe((page) => {
      this.pageHTML = page.content;
    });
  }


}
