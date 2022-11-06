import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatechWindowComponent } from './latech-window.component';

describe('LatechWindowComponent', () => {
  let component: LatechWindowComponent;
  let fixture: ComponentFixture<LatechWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatechWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatechWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
