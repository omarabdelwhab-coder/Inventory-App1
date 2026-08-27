import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuductCards } from './prouduct-cards';

describe('ProuductCards', () => {
  let component: ProuductCards;
  let fixture: ComponentFixture<ProuductCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProuductCards],
    }).compileComponents();

    fixture = TestBed.createComponent(ProuductCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
