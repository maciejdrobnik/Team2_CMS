import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWrapperComponent } from './menu-wrapper.component';

describe('DrawerComponent', () => {
  let component: MenuWrapperComponent;
  let fixture: ComponentFixture<MenuWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
