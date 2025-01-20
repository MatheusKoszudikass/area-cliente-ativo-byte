import { Injectable } from "@angular/core";
import { CpfService } from "./cpf/cpf.service";
import { CnpjService } from "./cnpj/cnpj.service";

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    constructor(private cpfService: CpfService, private cnpjService: CnpjService) { }

      /**
   * Checks if a document (CPF or CNPJ) is valid.
   * 
   * @param documentType - The type of document to validate, either 'CPF' or 'CNPJ'.
   * @param document - The document number to validate.
   * @returns True if the document is valid, false otherwise.
   */
  public validationDocumentCpfCnpj(documentType: string | null | undefined,
    document: string | null | undefined): boolean {
    if (!document || document.trim().length === 0) return false

    if (documentType === 'CPF') {
      return this.cpfService.validationCpf(document);
    }
    return this.cnpjService.validationCnpj(document);
  }
}