import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import { Page } from "../../services/mock-menu-data";
import { MenuService } from "../../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {LanguageService} from "../../services/language.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Page>(page => page.children);
  pagesSource = new MatTreeNestedDataSource<Page>();
  pagesArray = new Array<any>;



  classHidden = 'menu-tree-invisible';

  @Input() isClosed: boolean;
  @Input() searchWord: any;
  @Input() currentPageId: any = -1;

  @Output() redirect = new EventEmitter<any>();

  language:string;
  constructor(
    private menuService: MenuService,
    private languageService: LanguageService)
  { }

  getMenuData(): void {
    this.menuService.getMenuData().subscribe(pages => {
      this.pagesSource.data = pages;
    });
  }

  hasSubpages = (_: number, page: Page) => !!page.children && page.children.length > 0;

  ngOnInit(): void {
    this.searchWord = "";
    this.languageService.getLanguage().subscribe(
      (lang) => {
        this.getMenuData();
        this.language = lang;
      },
    );
  }



  pagesToArray(pages: Page[]): Page[] {
    let arr = [];
    if(pages) {
      for (let page of pages) {
        if (page.children && page.children.length > 0) {
          let arrSub = this.pagesToArray(page.children);
          for (let p of arrSub) {
            arr.push(p);
          }
        }
        arr.push(page);
      }
    }
    return arr;
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let search: SimpleChange = changes['searchWord'];
    let menuClose: SimpleChange = changes['isClosed'];
    if(search) {
      this.search();
    }
    if(menuClose) {
      if(menuClose.currentValue === true) {
        this.onClose();
      } else {
        this.expandCurrentPage();
      }
    }
  }

  onClose() {
    this.treeControl.collapseAll();
    this.searchWord = "";
  }

  loadPage() {
    this.redirect.emit();

  }

  expandCurrentPage(): void {
    if(this.currentPageId === -1) {
      return;
    }
    for (const page of this.pagesSource.data) {
      this.searchMenuTree(page, true);
    }
  }

  search(){
    this.pagesArray = this.pagesToArray(this.pagesSource.data);
    if(this.searchWord !== '') {
      this.hideAllPages(true);
      this.searchWord = this.searchWord.toLowerCase();
      for (const page of this.pagesSource.data){
        this.searchMenuTree(page);
      }
    }else {
      this.hideAllPages(false);
    }
  }

  isSearchedValue(page: Page): boolean {
    const name = page.name.toLowerCase();
    const tags: string[] = [];
    page.tags?.forEach(tag => {
      const tagLow = tag.toLowerCase();
      tags.push(tagLow);
    });
    let isInTags = false;

    if(tags.length !== 0) {
      tags.forEach(tag => {
        if (tag.includes(this.searchWord)) {
          isInTags = true;
        }
      })
    }
    return isInTags || name.includes(this.searchWord);
  }

  searchMenuTree(page: Page, searchById?: boolean): boolean{
    let isPageSearched = false;
    const compareSearch = searchById ?
      (this.currentPageId === page.id) :
      this.isSearchedValue(page);
    if(compareSearch) {
      this.showPageResult(page.id);
      this.treeControl.expand(page);
      isPageSearched = true;
    }
    if (page.children && page.children.length !== 0){
      let result = false;
      for (const subpage of page.children){
        result = this.searchMenuTree(subpage, searchById);
        if(result) {
          this.showPageResult(page.id);
          this.treeControl.expand(page);
          isPageSearched = true;
        }
      }

    }
    return isPageSearched;

  }


  showPageResult(pageID: number): void {
    const pageToHide = document.getElementById(pageID.toString());
    if(pageToHide){
      pageToHide.classList.remove(this.classHidden);
    }
  }

  hideAllPages(ifHide: boolean): void {
    if(!ifHide) {
      this.treeControl.collapseAll();
    }
    for(let page of this.pagesArray) {
      const pageToHide = document.getElementById(page.id.toString());
      if(pageToHide) {
        if(ifHide) {
          pageToHide.classList.add(this.classHidden);
        }else {
          pageToHide.classList.remove(this.classHidden);
        }
      }
    }
  }



}
