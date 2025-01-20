import { TestBed } from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { DocumentsService } from "./documents.service";

  
describe('DocumentsService', () => {
    let service: DocumentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers:[provideNoopAnimations()]
      });
      service = TestBed.inject(DocumentsService);
    })
  describe('validationDocument', () => {
    it('should return false if document is invalid CPF', () => {
      const invalidCpf = '1234567890';
      expect(service.validationDocumentCpfCnpj('CPF', invalidCpf)).toBeFalse();
    });

    it('should return false if document is invalid CNPJ', () => {
      const invalidCnpj = '12345678901234';
      expect(service.validationDocumentCpfCnpj('CNPJ', invalidCnpj)).toBeFalse();
    });

    it('should return true if document is valid CPF', () => {
      const validCpf = '70354213008';
      expect(service.validationDocumentCpfCnpj('CPF', validCpf)).toBeTrue();
    });

    it('should return true if document is valid CNPJ', () => {
      const validCnpj = '60201032000187';
      expect(service.validationDocumentCpfCnpj('CNPJ', validCnpj)).toBeTrue();
    });
  });
});  