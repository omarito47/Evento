import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEveentComponent } from './form-eveent.component';

describe('FormEveentComponent', () => {
  let component: FormEveentComponent;
  let fixture: ComponentFixture<FormEveentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEveentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEveentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
