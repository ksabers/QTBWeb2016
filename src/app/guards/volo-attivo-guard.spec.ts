import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { voloAttivoGuard } from './volo-attivo-guard';

describe('voloAttivoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => voloAttivoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
