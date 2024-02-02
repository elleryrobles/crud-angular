import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Sidenav, Collapse, Dropdown, initTE } from "tw-elements";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userService = inject(UserService);
  router = inject(Router);

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
    initTE({ Sidenav, Collapse, Dropdown, initTE });

    /*const instanceMode = Sidenav.getInstance(
      document.getElementById("sidenav-8")
    );
    const modes = ["push", "over", "side"];
    modes.forEach((mode) => {*/
      const mode = "push";
      const modeSwitch:any = document.getElementById(mode);
      modeSwitch.addEventListener("click", () => {
        const instance = Sidenav.getInstance(
          document.getElementById("sidenav-2")
        );
        instance.changeMode(mode);
        //modes.forEach((el) => {
          if (mode === mode) {
            ["text-blue-600", "border-blue-600"].forEach((item) =>
              modeSwitch.classList.remove(item)
            );
            modeSwitch.className +=
              " bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 border-transparent";
          }/* else {
            const node:any = document.getElementById(el);
            node.className += " text-blue-600 border-blue-600";
            [
              "bg-blue-600",
              "text-white",
              "hover:bg-blue-700",
              "active:bg-blue-800",
              "focus:bg-blue-700",
              "border-transparent",
            ].forEach((item) => node.classList.remove(item));
          }
        });*/
      });
    //});

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
