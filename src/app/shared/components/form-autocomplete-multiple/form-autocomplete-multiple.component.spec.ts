import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAutocompleteMultipleComponent } from './form-autocomplete-multiple.component';

describe('FormAutocompleteMultipleComponent', () => {
  let component: FormAutocompleteMultipleComponent;
  let fixture: ComponentFixture<FormAutocompleteMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAutocompleteMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAutocompleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
