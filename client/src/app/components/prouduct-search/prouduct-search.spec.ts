import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuductSearch } from './prouduct-search';

describe('ProuductSearch', () => {
  let component: ProuductSearch;
  let fixture: ComponentFixture<ProuductSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProuductSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ProuductSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
