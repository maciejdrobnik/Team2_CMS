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


  startSearch(event: KeyboardEvent, inputElement: HTMLInputElement): void {
    this.currentSearch = inputElement.value;

    this.search.emit(this.currentSearch);
  }

}
