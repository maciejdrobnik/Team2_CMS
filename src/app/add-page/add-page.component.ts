import {Component, HostListener, Inject, OnInit} from '@angular/core';
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

  private readonly _dialogRef: MatDialogRef<AddPageComponent>;
  addPageField:string;
  nameOfPageField:string;
  confirmField:string;
  returnField:string;
  isWrong:boolean;

  constructor(
    public dialogRef: MatDialogRef<AddPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PageDialogData,
  ) {
    this._dialogRef = dialogRef;
  }

  ngOnInit(): void {
    this.setLanguageFields(this.data.language);
    this.isWrong = false;
  }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.returnPageName();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  returnPageName(){
    if(this.data.pageName.length < 3){
      this.isWrong = true;
    }
    else{
      this.dialogRef.close(this.data);
    }

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
