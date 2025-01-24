import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ResponseUserInterface } from "../../../interfaces/response-user.interface";
import { ResponseApi } from "../../../interfaces/response-api.interface";

@Injectable({
    providedIn: 'root'
})

export class UserSharedService {
    private userData = new BehaviorSubject<ResponseApi<ResponseUserInterface> | null>(null);
    userData$ = this.userData.asObservable();

    setUserData(response: ResponseApi<ResponseUserInterface>) {
        response.data.forEach((user) => {
            response.success ? this.userData.next(response) : this.userData.next(null);
        
        })
        console.log(this.userData.getValue());
    }

    verifyUser(): boolean{
        const user = this.userData.getValue();
        console.log(user);
        if(user) return true;

        return false;
    }
}