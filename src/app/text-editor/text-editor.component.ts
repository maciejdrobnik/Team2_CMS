import {Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LatechWindowComponent} from "../latech-window/latech-window.component";
import Quill from "quill";


const MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote', 'code-block'] raczej niepotrzebne, ale może blockquote bym zostawił

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'font': []}],
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'align': []}],
    ['clean'],                //ikona jest trochę nieintuicyjna jak dla mnie // remove formatting button
    [ 'link', 'image', 'video']                         // link and image, video
  ],
}

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  title: 'quil-editor';
  modules: any = MODULES;
  quill:Quill;

  constructor(private matDialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.quill = new Quill('#quill-editor', {
        modules: this.modules,
        theme: 'snow',
      }
    );
  }
  onSubmit(){

  }

  openDialog(){
    const dialogRef = this.matDialog.open(LatechWindowComponent, {
      height: '50vh',
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        //Tylko do sprawdzenia wyników
        console.log(`Dialog result: ${result}`);
        console.log(this.quill.getContents());
        // Przeniesienie równania z dialogu do edytora
        let range = this.quill.getSelection(true);
        this.quill.insertEmbed(range.index, "formula", result);
        //Nie wiem jakie powinno być length(nie wiem czy w ogóle ma to znaczenie)
        this.quill.setSelection(range.index + 1, 0, "silent");
      }});
  }
  // onContentChanged(obj: any) {
  //   this.tempString = obj.html;
  // }
  //
  // changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  //   console.log(this.tempString);
  // }
}
