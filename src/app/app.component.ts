import { CommonModule } from '@angular/common';
import { Component, HostBinding, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-angular';
  // darkMode = signal<boolean>(
  //   JSON.parse(window.localStorage.getItem('darkMode2') ?? 'false')
  // );

  // @HostBinding('class.dark') get mode() {
  //   return this.darkMode();
  // }

  // constructor() {
  //   effect(() => {
  //     window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
  //   });
  // }
}
