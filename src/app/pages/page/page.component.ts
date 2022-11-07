import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from "../../services/page.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  id: string;
  pageHTML: string = "";

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
  ) {}



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getPage();
  }

  getPage(): void {
    this.pageService.getPage(this.id).subscribe((content) => {
      this.pageHTML = content;
    });
  }
}
