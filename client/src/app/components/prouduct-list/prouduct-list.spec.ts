import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuductList } from './prouduct-list';

describe('ProuductList', () => {
  let component: ProuductList;
  let fixture: ComponentFixture<ProuductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProuductList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProuductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
