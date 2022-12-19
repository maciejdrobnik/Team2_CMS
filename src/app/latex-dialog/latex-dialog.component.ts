import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-latech-dialog',
  templateUrl: './latex-dialog.component.html',
  styleUrls: ['./latex-dialog.component.css']
})
export class LatexDialogComponent {

  equation:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {equation: string}){
    this.equation = data.equation;
  }



}
