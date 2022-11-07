import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPage(id: string): Observable<string> {
    return of(
      `<h1>*Load the page with the id of ${id} from the API*</h1>\n` +
      '<p>\n' +
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, soluta, totam! Dolor error ex impedit minus possimus sint, sit tenetur voluptatem? A, aliquam aspernatur assumenda corporis cupiditate dicta dolor doloremque dolores eaque ex, inventore labore laborum libero maiores maxime nemo nihil non officia officiis pariatur perferendis quasi quibusdam rerum sequi, veniam veritatis voluptatibus. Accusantium alias aliquam assumenda atque consequatur, consequuntur corporis cumque deleniti doloribus eaque expedita facere fugiat fugit impedit ipsa ipsam labore laboriosam nam necessitatibus nesciunt nostrum odio odit officiis perspiciatis, provident qui quia quis repellendus rerum sequi suscipit tempore velit veniam vero vitae voluptatem voluptates. Architecto, in, officia.\n' +
      '</p>'
    );
  }
}
