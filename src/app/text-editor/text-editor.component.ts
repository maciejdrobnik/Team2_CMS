import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LatexDialogComponent} from "../latex-dialog/latex-dialog.component";
import Quill from "quill";
import {MenuService} from "../services/menu.service";
import { ActivatedRoute } from '@angular/router';

const icons = Quill.import('ui/icons');
const FormulaBlot = Quill.import('modules/formula');
const Parchment = Quill.import('parchment');

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  title: 'quil-editor';
  quill:Quill;
  content:string;


  constructor(private matDialog: MatDialog, private menuService: MenuService, private route: ActivatedRoute) {
    icons['latex'] = '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M12.4817 3.82717C11.3693 3.00322 9.78596 3.7358 9.69388 5.11699L9.53501 7.50001H12.25C12.6642 7.50001 13 7.8358 13 8.25001C13 8.66423 12.6642 9.00001 12.25 9.00001H9.43501L8.83462 18.0059C8.6556 20.6912 5.47707 22.0078 3.45168 20.2355L3.25613 20.0644C2.9444 19.7917 2.91282 19.3179 3.18558 19.0061C3.45834 18.6944 3.93216 18.6628 4.24389 18.9356L4.43943 19.1067C5.53003 20.061 7.24154 19.352 7.33794 17.9061L7.93168 9.00001H5.75001C5.3358 9.00001 5.00001 8.66423 5.00001 8.25001C5.00001 7.8358 5.3358 7.50001 5.75001 7.50001H8.03168L8.1972 5.01721C8.3682 2.45214 11.3087 1.09164 13.3745 2.62184L13.7464 2.89734C14.0793 3.1439 14.1492 3.61359 13.9027 3.94643C13.6561 4.27928 13.1864 4.34923 12.8536 4.10268L12.4817 3.82717Z" fill="#212121"/>\n' +
      '<path d="M13.7121 12.7634C13.4879 12.3373 12.9259 12.2299 12.5604 12.5432L12.2381 12.8194C11.9236 13.089 11.4501 13.0526 11.1806 12.7381C10.911 12.4236 10.9474 11.9501 11.2619 11.6806L11.5842 11.4043C12.6809 10.4643 14.3668 10.7865 15.0395 12.0647L16.0171 13.9222L18.7197 11.2197C19.0126 10.9268 19.4874 10.9268 19.7803 11.2197C20.0732 11.5126 20.0732 11.9874 19.7803 12.2803L16.7486 15.312L18.2879 18.2366C18.5121 18.6627 19.0741 18.7701 19.4397 18.4568L19.7619 18.1806C20.0764 17.911 20.5499 17.9474 20.8195 18.2619C21.089 18.5764 21.0526 19.0499 20.7381 19.3194L20.4159 19.5957C19.3191 20.5357 17.6333 20.2135 16.9605 18.9353L15.6381 16.4226L12.2803 19.7803C11.9875 20.0732 11.5126 20.0732 11.2197 19.7803C10.9268 19.4874 10.9268 19.0126 11.2197 18.7197L14.9066 15.0328L13.7121 12.7634Z" fill="#212121"/>\n' +
      '</svg>';

  }

  ngOnInit(): void {
    this.quill = new Quill('#quill-editor', {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              // ['blockquote', 'code-block'] raczej niepotrzebne, ale może blockquote bym zostawił

              [{'header': 1}, {'header': 2}],               // custom button values
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'font': []}],
              [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
              [{'header': [1, 2, 3, 4, 5, 6, false]}],

              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'align': []}],
              ['clean'],                //ikona jest trochę nieintuicyjna jak dla mnie // remove formatting button
              [ 'link', 'image'] ,                        // link and image, video
              ['latex']
            ],
            formula: true,
            handlers: {
              'latex': () => {this.openDialog()}
            }
          }
        },
        theme: 'snow',
      }
    );
    this.quill.enable(true);
    this.quill.root.addEventListener('click', (ev) => {
      let formula = Parchment.find(ev.target, true);
      if (formula.domNode.className === "ql-formula") {
        this.modifyDialog(formula);
      }
    });
    this.menuService.getPageContent(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      page => {
        this.content = page.content;
        this.quill.root.innerHTML = this.content;
      }
    );
  }
  onChange(){
  }

  onSubmit(){

  }

  modifyDialog(formulaBlot:typeof FormulaBlot):void{
    let range = formulaBlot.offset(this.quill.scroll);
    let text = formulaBlot.contentNode.innerText;
    let last = text.lastIndexOf("\n");
    let filteredText = text.slice(0, last);
    const dialogRef = this.matDialog.open(LatexDialogComponent, {
      width: "40vw",
      height:"50vh",
      data: { equation: filteredText, },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined && result !== "") {
        this.quill.deleteText(range, 1);
        this.quill.insertEmbed(range, "formula", result);
        this.quill.insertText(range+1 , ' ');
        this.quill.setSelection(range+1, 1);
      }});
  }
  openDialog():void{
    let range = this.quill.getSelection(true);
    const dialogRef = this.matDialog.open(LatexDialogComponent, {
      width: "50vw",
      height:"50vh",
      data: { equation: ''},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined ) {
        // Przeniesienie równania z dialogu do edytora
        this.quill.deleteText(range.index, range.length);
        this.quill.insertEmbed(range.index, "formula", result);
        //Nie wiem jakie powinno być length(nie wiem czy w ogóle ma to znaczenie)
        this.quill.insertText(range.index + range.length + 1 , ' ');
        this.quill.setSelection(range.index,  range.length + 1);
      }});
  }
}
