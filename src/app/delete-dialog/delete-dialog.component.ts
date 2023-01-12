import {Component, Inject, OnInit, ElementRef, HostListener} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";

export class DeleteDialogData {
  confirmDeleted: boolean;
  isPage:boolean;
  name:string;
  target: ElementRef;
  isLeft:boolean;
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  private readonly _matDialogRef: MatDialogRef<DeleteDialogComponent>;
  private readonly triggerElementRef:ElementRef;

  constructor(_matDialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
    this.triggerElementRef = data.target;
    this._matDialogRef = _matDialogRef;
  }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this._matDialogRef.close(true);
  }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    if(this.data.isLeft){
      matDialogConfig.position = { left: `${rect.left}px`, top: `${rect.bottom - 50}px` };
    }
    else{
      matDialogConfig.position = { left: `${rect.left - 330}px`, top: `${rect.bottom - 50}px` };
    }
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }

}
