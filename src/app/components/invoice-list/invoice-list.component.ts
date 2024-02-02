import { Component, inject } from '@angular/core';
import { Sidenav, Dropdown, Ripple, initTE } from "tw-elements";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {

  users: any[] = [];
  pageSize = 5; // ajusta el tamaño de la página según tus necesidades
  currentPage = 1;
  totalPages: number = 0;

  sidenav2 = document.getElementById("sidenav-1");
  sidenavInstance2 = Sidenav.getInstance(this.sidenav2);
  innerWidth2: number = 0;
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

  userService = inject(UserService);

  ngOnInit(): void {
    
    initTE({ Sidenav, Dropdown, Ripple });

    if (window.innerWidth < this.sidenavInstance2.getBreakpoint("sm")) {
      this.setMode2();
    }
    
    // Event listeners
    window.addEventListener("resize", this.setMode2);
  }

}
