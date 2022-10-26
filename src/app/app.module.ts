import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {DrawerComponent} from './drawer/drawer.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':id', component: PageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawerComponent,
    HomeComponent,
    PageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
