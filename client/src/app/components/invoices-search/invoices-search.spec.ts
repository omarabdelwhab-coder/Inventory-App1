import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesSearch } from './invoices-search';

describe('InvoicesSearch', () => {
  let component: InvoicesSearch;
  let fixture: ComponentFixture<InvoicesSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
