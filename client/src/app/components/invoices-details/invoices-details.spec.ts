import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDetails } from './invoices-details';

describe('InvoicesDetails', () => {
  let component: InvoicesDetails;
  let fixture: ComponentFixture<InvoicesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
