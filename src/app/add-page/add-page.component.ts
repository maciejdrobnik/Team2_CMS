import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from '@angular/material/dialog';


export class DialogData {
  folderName: string
}

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  // title: string;
  // input: string;
  // parentId?:number;

  constructor(
    public dialogRef: MatDialogRef<AddPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
