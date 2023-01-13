import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  currentSearch: string = '';


  @Output() search = new EventEmitter<string>();
  @Input() menuClosed: boolean;
  constructor() { }


  ngOnInit(): void {
    this.currentSearch = '';
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let menuClose: SimpleChange = changes['menuClosed'];
    if(menuClose) {
      this.currentSearch = '';
      const input = document.getElementById('searchBar') as HTMLInputElement;
      if(input) {
        input.value = '';
      }
    }
  }


  startSearch(event: KeyboardEvent, inputElement: HTMLInputElement): void {
    this.currentSearch = inputElement.value;

    this.search.emit(this.currentSearch);
  }

}
