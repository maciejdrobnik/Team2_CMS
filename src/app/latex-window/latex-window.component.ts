import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-latech-window',
  templateUrl: './latex-window.component.html',
  styleUrls: ['./latex-window.component.css']
})
export class LatexWindowComponent implements OnInit {
  equation: string = "";
  constructor(){}

  ngOnInit() {

  }

}
