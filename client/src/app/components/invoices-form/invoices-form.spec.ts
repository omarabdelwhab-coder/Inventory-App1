import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesForm } from './invoices-form';

describe('InvoicesForm', () => {
  let component: InvoicesForm;
  let fixture: ComponentFixture<InvoicesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
