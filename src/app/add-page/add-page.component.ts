import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from '@angular/material/dialog';


export class PageDialogData {
  pageName: string;
  language:string;
}

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  addPageField:string;
  nameOfPageField:string;
  confirmField:string;
  returnField:string;

  constructor(
    public dialogRef: MatDialogRef<AddPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PageDialogData,
  ) {}

  ngOnInit(): void {
    this.setLanguageFields(this.data.language);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setLanguageFields(lang:string) {
    switch (lang) {
      case "polish":
        this.addPageField =  "Jak chcesz nazwać nową stronę?" ;
        this.nameOfPageField = "Nazwa strony";
        this.returnField = "Wróć";
        this.confirmField = "Potwierdź";
        break;
      case "english":
        this.addPageField =  "How do you want to name new page?";
        this.nameOfPageField = "Name of Page";
        this.returnField = "Return";
        this.confirmField = "Confirm";
        break;
      case "french":
        this.addPageField =  "Comment voulez-vous nommer la nouvelle page ?";
        this.nameOfPageField = "Nom de la page";
        this.returnField = "Revenir";
        this.confirmField = "Confirmer";
        break;
    }
  }
}
