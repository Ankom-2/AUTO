import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputscreenComponent } from './inputscreen.component';

describe('InputscreenComponent', () => {
  let component: InputscreenComponent;
  let fixture: ComponentFixture<InputscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
