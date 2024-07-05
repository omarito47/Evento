import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEveentComponent } from './list-eveent.component';

describe('ListEveentComponent', () => {
  let component: ListEveentComponent;
  let fixture: ComponentFixture<ListEveentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEveentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEveentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
