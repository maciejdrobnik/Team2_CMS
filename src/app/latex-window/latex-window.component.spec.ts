import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatexWindowComponent } from './latex-window.component';

describe('LatechWindowComponent', () => {
  let component: LatexWindowComponent;
  let fixture: ComponentFixture<LatexWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatexWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatexWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
