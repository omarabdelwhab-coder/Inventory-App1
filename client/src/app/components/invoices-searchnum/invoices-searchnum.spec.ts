import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesSearchnum } from './invoices-searchnum';

describe('InvoicesSearchnum', () => {
  let component: InvoicesSearchnum;
  let fixture: ComponentFixture<InvoicesSearchnum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesSearchnum],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesSearchnum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
