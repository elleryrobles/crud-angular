import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  themeService = inject(ThemeService);
  userService = inject(UserService);
  router = inject(Router);

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.userService.getUsers().subscribe(
      users => {
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
    sessionStorage.removeItem('token_crud');
    this.router.navigate(['/login']);
  }
}
