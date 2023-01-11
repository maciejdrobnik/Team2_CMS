import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PageService} from "../services/page.service";
import {PageDTO} from "../services/menu.service";
import {FormControl, Validators} from "@angular/forms";


interface dataToSend {
  tags:string[];
  confirmation:boolean;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tagElement?:HTMLInputElement;
  tags:string[];
  isWrong: boolean;
  confirmation:boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {tags: string[], id:number}, private pageService: PageService, public dialogReference: MatDialogRef<TagsComponent>) {
    this.tags = data.tags;
    this.isWrong = false;
    this.confirmation = false;
  }

  ngOnInit(): void {
  }

  addTag(newTag: string){
    let validator = true;
    this.tags.forEach((tag) =>{
      if(tag === newTag) validator = false;

    })
    if(newTag !== "" && newTag.length < 25 && validator) {
      this.isWrong = false;
      this.tags.push(newTag);
      // @ts-ignore
      document.getElementById("newTag").value = "";
    }
    else{
      this.isWrong = true;
      console.log("invalid")
    }
  }
  deleteTag(tag:string){
    const tempTags = this.tags.filter((tempTag) =>
      tempTag != tag
    )
    this.tags = tempTags;
  }
  returnTags(confirm:boolean){
    const data:dataToSend = {
      tags:this.tags,
      confirmation:confirm,
    }
    this.dialogReference.close(data);
  }
}
