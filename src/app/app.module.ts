import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill'
import {FormsModule} from "@angular/forms";
import {TextEditorComponent} from './text-editor/text-editor.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {LatexWindowComponent} from './latex-window/latex-window.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {DrawerComponent} from './drawer/drawer.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './pages/home/home.component';
import {PageComponent} from './pages/page/page.component';
import {MenuComponent} from './menu/menu.component';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {KatexModule} from "ng-katex";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'editor', component: TextEditorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: ':id', component: PageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    LatexWindowComponent,
    ToolbarComponent,
    DrawerComponent,
    HomeComponent,
    PageComponent,
    MenuComponent,
    NotFoundComponent
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
    KatexModule,
    MatDialogModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
