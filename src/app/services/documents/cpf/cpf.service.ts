import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
    providedIn: 'root'
})
export class CpfService {
    constructor(private notification: NzNotificationService) { }

      /**
   * Checks if a CPF (Brazilian national ID) is valid.
   * 
   * @param cpf - The CPF number to validate.
   * @returns True if the CPF is valid, false otherwise.
   *          Displays an error notification if the CPF is invalid.
   */
  public validationCpf(cpf: string | null | undefined): boolean {

    if (cpf?.length !== 11 || /^d(\d)\1{13}$/.test(cpf)) return false
  
    if (this.calculationValidationCPf(cpf)) return true
  
    return false
  }

   /**
   * Checks if a CPF is valid by calculating the digits of the CPF using the modulo 11 algorithm.
   * 
   * @param cpf - The CPF number to validate.
   * @returns True if the CPF is valid, false otherwise.
   */
   private calculationValidationCPf(cpf: string): boolean {
    const calc = (x: number): number => {
      const total = cpf
        .substring(0, x)
        .split('')
        .reduce((sum, num, index) => sum + parseInt(num) * (x + 1 - index), 0);
      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    return calc(9) === parseInt(cpf[9]) && calc(10) === parseInt(cpf[10]);
  }
}