import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-latech-window',
  templateUrl: './latech-window.component.html',
  styleUrls: ['./latech-window.component.css']
})
export class LatechWindowComponent implements OnInit {
  equation: string = "works";
  constructor(){}

  ngOnInit() {

  }
}
