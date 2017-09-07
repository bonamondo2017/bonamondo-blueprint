import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFullScreenIconsComponent } from './menu-full-screen-icons.component';

describe('MenuFullScreenIconsComponent', () => {
  let component: MenuFullScreenIconsComponent;
  let fixture: ComponentFixture<MenuFullScreenIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFullScreenIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFullScreenIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
