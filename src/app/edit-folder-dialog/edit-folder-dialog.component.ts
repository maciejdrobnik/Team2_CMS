import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface EditFolderDialogData {
  folderName: string;
  id:number;
  tags: string[];
  confirmation:boolean;
}

@Component({
  selector: 'app-edit-folder-dialog',
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.css']
})
export class EditFolderDialogComponent implements OnInit {

  isWrong:boolean;
  editMode:boolean;
  constructor(public dialogRef: MatDialogRef<EditFolderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditFolderDialogData) { }

  ngOnInit(): void {
    this.isWrong = false;
  }
  changeEditMode(newName: string){
    this.data.folderName = newName;
    this.editMode = !this.editMode;
  }
  checkKey(event: KeyboardEvent, newTag: string ) {
    if(event.key === 'Enter') {
      this.addTag(newTag)
    }
  }

  addTag(newTag: string){
    let validator = true;
    this.data.tags.forEach((tag) => {
      if(tag === newTag) validator = false;
    })
    if(newTag !== "" && newTag.length < 25 && validator) {
      this.isWrong = false;
      this.data.tags.push(newTag);
      // @ts-ignore
      document.getElementById("newTag").value = "";
    }
    else{
      this.isWrong = true;
      console.log("invalid")
    }
  }
  deleteTag(tag:string){
    this.data.tags = this.data.tags.filter((tempTag) =>
      tempTag != tag
    );
  }
  returnFolder(confirm:boolean){
    this.data.confirmation = confirm;
    this.dialogRef.close();
  }
}
