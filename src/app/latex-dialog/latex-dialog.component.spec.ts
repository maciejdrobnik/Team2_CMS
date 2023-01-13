import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatexDialogComponent } from './latex-dialog.component';

describe('LatexDialogComponent', () => {
  let component: LatexDialogComponent;
  let fixture: ComponentFixture<LatexDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatexDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatexDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
