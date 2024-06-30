import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeEventComponent } from './list-type-event.component';

describe('ListTypeEventComponent', () => {
  let component: ListTypeEventComponent;
  let fixture: ComponentFixture<ListTypeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypeEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
