import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAeroporti } from './lista-aeroporti';

describe('ListaAeroporti', () => {
  let component: ListaAeroporti;
  let fixture: ComponentFixture<ListaAeroporti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAeroporti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAeroporti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
