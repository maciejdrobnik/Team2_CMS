import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PageService} from "../services/page.service";
import {PageDTO} from "../services/menu.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tagElement?:HTMLInputElement;
  tags:string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {tags: string[], id:number}, private pageService: PageService) {
    this.tags = data.tags;
  }

  ngOnInit(): void {
  }

  addTag(newTag: string){
    if(newTag !== "" && newTag.length < 25) {
      this.tags.push(newTag);
    }
    const newPage:PageDTO = {
      tags: this.tags,
      id:this.data.id,
    }
    this.pageService.patchPage(newPage).subscribe();
    // @ts-ignore
    document.getElementById("newTag").value = "";
  }
  deleteTag(tag:string){
    this.tags = this.tags.filter((tempTag) =>
      tempTag != tag
    )
    const newPage:PageDTO = {
      tags: this.tags,
      id:this.data.id,
    }
    this.pageService.patchPage(newPage).subscribe();
  }
}
