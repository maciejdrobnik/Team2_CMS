import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {QuillModule} from 'ngx-quill'
import {FormsModule} from "@angular/forms";
import { TextEditorComponent } from './text-editor/text-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import { LatechWindowComponent } from './latech-window/latech-window.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    LatechWindowComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
