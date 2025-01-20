import { TestBed } from "@angular/core/testing";
import { CpfService } from "./cpf.service";
import { provideNoopAnimations } from "@angular/platform-browser/animations";

describe('CpfService', () => {

  let service: CpfService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CpfService, provideNoopAnimations()]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CpfService);
  });

  it('should validate a valid CPF', () => {
    const cpf = '58079848033';
    const result = service.validationCpf(cpf);
    expect(result).toBeTrue();
  });

  it('should invalidate an invalid CPF', () => {
    const cpf = '70354213004';
    const result = service.validationCpf(cpf);
    expect(result).toBeFalse();
  });
})