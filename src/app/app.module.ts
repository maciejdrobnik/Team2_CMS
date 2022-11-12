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
import {MatDialogModule} from "@angular/material/dialog";
import { LatechWindowComponent } from './latech-window/latech-window.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MenuWrapperComponent} from './menu-wrapper/menu-wrapper.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';
import { MenuComponent } from './menu/menu.component';
import {HomeComponent} from './pages/home/home.component';
import {PageComponent} from './pages/page/page.component';
import {MenuComponent} from './menu-wrapper/menu/menu.component';
import { SearchBarComponent } from './menu-wrapper/search-bar/search-bar.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'editor', component: TextEditorComponent},
  {path: ':id', component: PageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    LatechWindowComponent,
    ToolbarComponent,
    MenuWrapperComponent,
    HomeComponent,
    PageComponent,
    TextEditorComponent,
    MenuComponent,
    SearchBarComponent
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
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
