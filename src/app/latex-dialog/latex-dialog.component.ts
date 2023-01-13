import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-latech-dialog',
  templateUrl: './latex-dialog.component.html',
  styleUrls: ['./latex-dialog.component.css']
})
export class LatexDialogComponent {

  private readonly _matDialogRef: MatDialogRef<LatexDialogComponent>;
  equation:string;
  constructor(matDialogRef: MatDialogRef<LatexDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {equation: string}){
    this.equation = data.equation;
    this._matDialogRef = matDialogRef;
  }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this._matDialogRef.close(this.equation);
  }



}
