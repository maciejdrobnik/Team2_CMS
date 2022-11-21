import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  currentSearch: string = '';

  @Output() search = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {
  }

  startSearch(event: KeyboardEvent): void {
    if (event.key !== 'Backspace') {
      this.currentSearch += event.key;
    } else if (this.currentSearch !== '') {
      this.currentSearch = this.currentSearch.slice(0, this.currentSearch.length - 1);
    }

    this.search.emit(this.currentSearch);
    console.log(this.currentSearch);
  }

}
