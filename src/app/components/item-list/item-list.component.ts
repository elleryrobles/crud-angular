import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Sidenav, Dropdown, Ripple, initTE } from "tw-elements";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number = 0;

  sidenav2 = document.getElementById("sidenav-1");
  sidenavInstance2 = Sidenav.getInstance(this.sidenav2);
  innerWidth2: number | null = null;
  setMode2 = () => {
    // Check necessary for Android devices
    if (window.innerWidth === this.innerWidth2) {
      return;
    }
  
    this.innerWidth2 = window.innerWidth;
  
    if (window.innerWidth < this.sidenavInstance2.getBreakpoint("xl")) {
      this.sidenavInstance2.changeMode("over");
      this.sidenavInstance2.hide();
    } else {
      this.sidenavInstance2.changeMode("side");
      this.sidenavInstance2.show();
    }
  };

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    
    initTE({ Sidenav, Dropdown, Ripple });

    if (window.innerWidth < this.sidenavInstance2.getBreakpoint("sm")) {
      this.setMode2();
    }
    
    // Event listeners
    window.addEventListener("resize", this.setMode2);
    
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
