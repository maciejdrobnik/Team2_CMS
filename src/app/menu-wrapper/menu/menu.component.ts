import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import { Page } from "../../services/mock-menu-data";
import { MenuService } from "../../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Page>(page => page.subpages);
  pagesSource = new MatTreeNestedDataSource<Page>();
  pagesArray = new Array<any>;

  @Input() searchWord: any;

  constructor(private menuService: MenuService) { }

  getMenuData(): void {
    this.menuService.getMenuData().subscribe(pages => this.pagesSource.data = pages);
    console.log('got pages');
  }

  hasSubpages = (_: number, page: Page) => !!page.subpages && page.subpages.length > 0;

  ngOnInit(): void {
    this.getMenuData();
    this.pagesArray = this.pagesToArray(this.pagesSource.data);
    console.log(this.pagesArray);
  }

  pagesToArray(pages: Page[]): Page[] {
    let arr = [];
    if(pages) {
      for(let page of pages) {
        if(page.subpages && page.subpages.length > 0){
          let arrSub = this.pagesToArray(page.subpages);
          for(let p of arrSub){
            arr.push(p);
          }
        }
        arr.push(page);
      }
    }
    return arr;
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes['searchWord'];
    if(change) {
      this.search();
    }
  }

  // searchOnData(pages: Page[], regex: RegExp): Page[] {
  //   let resultRootPages = [];
  //   if(pages) {
  //     for(let page of pages) {
  //       if(page.subpages && page.subpages.length > 0){
  //         let resultSubPages = this.searchOnData(page.subpages, regex);
  //         const r = resultSubPages.filter(page => page.name.search(regex) !== -1);
  //       }
  //
  //       resultRootPages.push(page);
  //     }
  //   }
  //   return resultRootPages;
  // }

  search(){
    if(this.searchWord !== '') {
      this.hideAllPages(true);
      const regex = new RegExp(this.searchWord, 'i');

      const result = this.pagesArray.filter(page => page.name.search(regex) !== -1);
      console.log(result);
      for( let page of result){
        this.showPageResult(page.id);
      }
    }else {
      this.hideAllPages(false);
    }
  }


  showPageResult(pageID: number): void {
    const pageToHide = document.getElementById(pageID.toString());
    if(pageToHide){
      console.log(pageToHide);
      pageToHide.classList.remove('hidden');
    }

  }

  hideAllPages(ifHide: boolean): void {
    for(let page of this.pagesArray) {
      const pageToHide = document.getElementById(page.id.toString());
      if(pageToHide) {
        if(ifHide) {
          pageToHide.classList.add('hidden');
        }else {
          pageToHide.classList.remove('hidden');
        }
      }
    }
  }




}
