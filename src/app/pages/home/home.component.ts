import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Observer} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lang: string;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,) {
  }
   myObserver = {
    next: (lang: string) => this.lang = lang,
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.lang = this.route.snapshot.params['lang'];
    });
    // if (this.route.snapshot.params['lang']) {
    //   this.lang = this.route.snapshot.params['lang'];
    // } else {
    //   this.lang = this.languageService.getLanguage();
    // }



  }
  ngOnChanges() {
    this.languageService.getLanguage().subscribe(this.myObserver);
  }

}
