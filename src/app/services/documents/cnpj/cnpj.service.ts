import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
    providedIn: 'root'
})
export class CnpjService {
    constructor(private notification: NzNotificationService) { }

    /**
     * Checks if a CNPJ (Brazilian company ID) is valid.
     * 
     * @param cnpj - The CNPJ number to validate.
     * @returns True if the CNPJ is valid, false otherwise.
     *          Displays an error notification if the CNPJ is invalid.
     */
    public validationCnpj(cnpj: string | null | undefined): boolean {

        if (cnpj?.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
            return false
        }

        if (this.calculationValidationCnpj(cnpj)) {

            return true
        }

        return false
    }

    private calculationValidationCnpj(cnpj: string): boolean {
        const calc = (x: number): number => {
            const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            const total = cnpj
                .substring(0, x)
                .split('')
                .reduce((sum, num, index) => sum + parseInt(num) * c[13 - x + index], 0);
            const resto = total % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        return calc(12) === parseInt(cnpj[12]) && calc(13) === parseInt(cnpj[13]);
    }
}