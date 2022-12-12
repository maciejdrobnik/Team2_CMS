import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import { Page } from "../../services/mock-menu-data";
import { MenuService } from "../../services/menu.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Page>(page => page.children);
  pagesSource = new MatTreeNestedDataSource<Page>();
  // To jest potrzebne w ogóle?
  pagesArray = new Array<any>;

  classHidden = 'menu-tree-invisible';

  @Input() isClosed: boolean;
  @Input() searchWord: any;

  @Output() redirect = new EventEmitter<any>();

  constructor(private menuService: MenuService) { }

  getMenuData(): void {
    this.menuService.getMenuData().subscribe(pages => {
      this.pagesSource.data = pages;
      //console.log(this.pagesSource.data);
    });
    console.log(this.pagesSource.data);
    console.log('got pages');
  }
  addAddPages(){
    let addPage = {
      id:4,
      name:"Add_new_folder",
      isRoot:false,
      children:[],
      tags:[],
    }
    for(let i = 0; i < this.pagesSource.data.length; i++){
      if(this.pagesSource.data[i].children){
          // this.pagesSource.data[i].children.push(addPage);
        }
        // for (let j = 0; j < this.pagesSource.data[i].children.length; j++) {
        //   this.pagesSource.data[i].children.push(addPage);
        // }
      }
    this.pagesSource.data.push(addPage);
  }

  hasSubpages = (_: number, page: Page) => !!page.children && page.children.length > 0;

  ngOnInit(): void {
    this.getMenuData();
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
      this.onClose();
    }
  }

  onClose() {
    this.treeControl.collapseAll();
  }

  loadPage() {
    this.redirect.emit();
  }

  search(){
    this.pagesArray = this.pagesToArray(this.pagesSource.data);
   // console.log(`array: ${this.pagesArray}`)
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

  searchMenuTree(page: Page): boolean{
    const name = page.name.toLowerCase();
    let isPageSearched = false;
    if(name.includes(this.searchWord)) {
      this.showPageResult(page.id);
      this.treeControl.expand(page);
      isPageSearched = true;
    }
    if (page.children && page.children.length !== 0){
      let result = false;
      for (const subpage of page.children){
        result = this.searchMenuTree(subpage);
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

  // addAddPage(page:Page): void{
  //   if(page.children !== [] || ){
  //
  //   }
  //
  // }







}
