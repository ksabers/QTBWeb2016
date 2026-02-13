import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chiusura } from './chiusura';

describe('Chiusura', () => {
  let component: Chiusura;
  let fixture: ComponentFixture<Chiusura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chiusura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chiusura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
