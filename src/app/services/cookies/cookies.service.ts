import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {

  constructor(@Inject(DOCUMENT) private document: Document) { }


  public check(name: string): boolean {
    if (typeof document === 'undefined') return false;

    name = encodeURIComponent(name);

    let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');

    return regexp.test(document.cookie);
  }



  public getCookie(name: string): string {
    const match = this.document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : '';
  }

  public setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    this.document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  public deleteCookie(name: string): void {
    this.document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
