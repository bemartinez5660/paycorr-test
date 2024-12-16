import { Injectable } from '@angular/core';
import { Storage } from '../models/storage.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Storage{
  constructor() { }

  /**
   * Set data in storage
   * @param key
   * @param value
   * @param local
   */
  set(key: string, value: any, local = false) {
    let dataToSave = JSON.stringify(value);
    if (value instanceof Map) {
      dataToSave = JSON.stringify(Array.from(value.entries()));
    }

    if (local) {
      localStorage.setItem(key, dataToSave);
    } else {
      sessionStorage.setItem(key, dataToSave);
    }
  }

  /**
   * Get data from storage
   * @param key
   * @param local
   */
  get(key: string, local = false): any | null {
    const data = local ? localStorage.getItem(key) : sessionStorage.getItem(key);
    return JSON.parse(<string>data) || null;
  }

  /**
   * Remove data from storage
   * @param key
   * @param local
   */
  remove(key: string, local = false): void {
    if (local) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key);
    }
  }

  fetchImageAndCache(url: string): Promise<string> {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'accept':'text/html'
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            const base64data = reader.result as string;
            localStorage.setItem(url, base64data);
            resolve(base64data);
          };
          reader.readAsDataURL(blob);
        });
      });
  }

  getCachedImage(url: string): string | null {
    return localStorage.getItem(url);
  }
}
