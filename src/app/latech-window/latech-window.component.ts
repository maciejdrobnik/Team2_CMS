import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-latech-window',
  templateUrl: './latech-window.component.html',
  styleUrls: ['./latech-window.component.css']
})
export class LatechWindowComponent implements OnInit {
  equation: string = "\\\\sum_{i=1}nx_i";

  constructor(){}


  ngOnInit() {

  }


}
