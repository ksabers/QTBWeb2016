import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAeroporti } from './dialog-aeroporti';

describe('DialogAeroporti', () => {
  let component: DialogAeroporti;
  let fixture: ComponentFixture<DialogAeroporti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAeroporti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAeroporti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
