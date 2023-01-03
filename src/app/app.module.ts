import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill'
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MenuWrapperComponent} from './menu-wrapper/menu-wrapper.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';
import {MenuComponent} from "./menu-wrapper/menu/menu.component";
import { SearchBarComponent } from './menu-wrapper/search-bar/search-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {KatexModule} from "ng-katex";
import { AddPageComponent } from './add-page/add-page.component';
import { LatexDialogComponent } from './latex-dialog/latex-dialog.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import {MatMenuModule} from "@angular/material/menu";
import { AddFolderComponent } from './add-folder/add-folder.component';
import { TagsComponent } from './tags/tags.component';
import {MatListModule} from "@angular/material/list";


const appRoutes: Routes = [
  {path: ':lang/home', component: HomeComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: ':lang/:id', component: PageComponent},
  {path: ':lang/:id/editor', component:TextEditorComponent},
  {path: '',   redirectTo: 'english/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuWrapperComponent,
    HomeComponent,
    PageComponent,
    MenuComponent,
    SearchBarComponent,
    NotFoundComponent,
    AddPageComponent,
    LatexDialogComponent,
    TextEditorComponent,
    AddFolderComponent,
    TagsComponent
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
        MatMenuModule,
        MatListModule,
    ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
