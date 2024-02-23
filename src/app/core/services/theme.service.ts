import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeSubject = new BehaviorSubject<boolean>(this.getStoredDarkMode());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() { }

  getStoredDarkMode(): boolean {
    // Obtener el estado del tema desde el almacenamiento local
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  }

  setStoredDarkMode(darkMode: boolean): void {
    // Guardar el estado del tema en el almacenamiento local
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }

  toggleDarkMode(): void {
    const newDarkMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkMode);

    // Guardar el estado del tema en el almacenamiento local
    this.setStoredDarkMode(newDarkMode);
  }
}