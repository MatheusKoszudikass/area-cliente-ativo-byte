import { HttpHeaders } from "@angular/common/http";

export const RESPONSE_HEADERS_TOKEN_SESSION_JSON =  new HttpHeaders({
    'Set-Cookie': 'session=token; Secure; HttpOnly; Path=/; SameSite=None',
});

export const RESPONSE_EMPTY_HEADERS_JSON = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
 }); 

export const RESPONSE_HEADERS_JSON = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Session token'
 }); 