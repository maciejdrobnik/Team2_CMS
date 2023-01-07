import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from '@angular/material/dialog';


export class PageDialogData {
  pageName: string;
}

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PageDialogData,
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
