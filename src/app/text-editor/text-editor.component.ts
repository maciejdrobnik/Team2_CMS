import { Component, OnInit } from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  title: 'quil-editor';
  constructor() { }

  ngOnInit(): void {
  }
  changedEditor(event: EditorChangeContent | EditorChangeSelection){
    console.log('editor got changed', event);
  }
}
