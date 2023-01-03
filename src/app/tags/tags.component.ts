import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags:string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {tags: string[]}) {
    this.tags = data.tags;
  }

  ngOnInit(): void {
  }

}
