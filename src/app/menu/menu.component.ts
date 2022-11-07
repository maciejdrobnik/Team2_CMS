import { Component, OnInit } from '@angular/core';
import { Page } from "../services/mock-menu-data";
import { MenuService } from "../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Page>(page => page.subpages);
  pagesSource = new MatTreeNestedDataSource<Page>();

  constructor(private menuService: MenuService) { }

  getMenuData(): void {
    this.menuService.getMenuData().subscribe(pages => this.pagesSource.data = pages);
    console.log('got pages');
  }

  hasSubpages = (_: number, page: Page) => !!page.subpages && page.subpages.length > 0;

  ngOnInit(): void {
    this.getMenuData();
  }


}
