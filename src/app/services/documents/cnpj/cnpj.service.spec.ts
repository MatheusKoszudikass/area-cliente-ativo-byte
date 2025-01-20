import { TestBed } from "@angular/core/testing";
import { CnpjService } from "./cnpj.service";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe('CnpjService', () => {
  let service: CnpjService;

  beforeEach(() => {
     TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
    service = TestBed.inject(CnpjService);
  });

  it('should validate a valid CNPJ', () => {
    const cnpj = '57364766000172';
    const result = service.validationCnpj(cnpj);
    expect(result).toBeTrue();
  });

  it('should invalidate an invalid CNPJ', () => {
    const cnpj = '11111111000112';
    const result = service.validationCnpj(cnpj);
    expect(result).toBeFalse();
  });
});
