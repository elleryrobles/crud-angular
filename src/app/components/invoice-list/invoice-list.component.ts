import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenav, Collapse, Dropdown, initTE } from "tw-elements";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { UserService } from '../../services/user.service';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-invoice-list',
    standalone: true,
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.css',
    imports: [CommonModule, ThemeToggleComponent]
})
export class InvoiceListComponent {

  themeService = inject(ThemeService);
  userService = inject(UserService);
  router = inject(Router);

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    initTE({ Sidenav, Collapse, Dropdown, initTE });
    this.loadUsers();
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.userService.getUsers().subscribe(users => {
      this.users = users.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(users.length / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onClickLogout() {
    localStorage.removeItem('token_crud');
    this.router.navigate(['/login']);
  }

}
