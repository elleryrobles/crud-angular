import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from "../../../components/theme-toggle/theme-toggle.component";
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { Collapse, Dropdown, initTE } from "tw-elements";


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, ThemeToggleComponent]
})
export class HeaderComponent {

  themeService = inject(ThemeService);
  router = inject(Router);

  ngOnInit(): void {
    initTE({ Collapse, Dropdown });
  }
  
  onClickLogout() {
    localStorage.removeItem('token_crud');
    this.router.navigate(['/login']);
  }

}
