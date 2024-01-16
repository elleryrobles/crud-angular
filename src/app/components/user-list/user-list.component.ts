import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number;

  constructor(private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
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
