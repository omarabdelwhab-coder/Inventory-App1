import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoivesList } from './invoives-list';

describe('InvoivesList', () => {
  let component: InvoivesList;
  let fixture: ComponentFixture<InvoivesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoivesList],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoivesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
