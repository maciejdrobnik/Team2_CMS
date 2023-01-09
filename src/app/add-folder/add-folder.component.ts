import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialogRef} from '@angular/material/dialog';


export class FolderDialogData {
  folderName: string;
  mode:string;
  language: string;
}

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

    addRoot:string;
    nameOfRoot:string;
    returnField:string;
    confirmField:string;

  constructor(
    public dialogRef: MatDialogRef<AddFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FolderDialogData,
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
        this.addRoot = this.data.mode === "root" ? "Jak chcesz nazwać nowy folder główny?" : "Jak chcesz nazwać nowy folder podrzędny?";
        this.nameOfRoot = "Nazwa folderu";
        this.returnField = "Wróć";
        this.confirmField = "Potwierdź";
        break;
      case "english":
        this.addRoot = this.data.mode === "root" ? "How do you want to name new root folder?" : "How do you want to name new child folder?";
        this.nameOfRoot = "Name of Folder";
        this.returnField = "Return";
        this.confirmField = "Confirm";
        break;
      case "french":
        this.addRoot = this.data.mode === "root" ? "Comment voulez-vous nommer le nouveau dossier racine ?" : "Comment voulez-vous nommer le nouveau dossier enfant ?";
        this.nameOfRoot = "Nom du dossier";
        this.returnField = "Revenir";
        this.confirmField = "Confirmer";
        break;
    }
  }
}

