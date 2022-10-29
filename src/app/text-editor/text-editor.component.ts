import { Component, OnInit } from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import Quill from "quill";
import Latech from "./latech";
import {MatDialog} from "@angular/material/dialog";
import {LatechWindowComponent} from "../latech-window/latech-window.component";

Quill.register('modules/latech', Latech);
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

    ['link', 'image', 'video']                         // link and image, video
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
  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(){
    this.matDialog.open(LatechWindowComponent, {
      height: '50vh',
      width: '50vw',
    });

  }
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor got changed', event);
  }

}
