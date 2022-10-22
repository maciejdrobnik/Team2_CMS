import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {QuillModule} from 'ngx-quill'
import {FormsModule} from "@angular/forms";
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
