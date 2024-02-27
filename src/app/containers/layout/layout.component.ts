import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { FooterComponent } from "./footer/footer.component";
import { Sidenav, Collapse, Dropdown, initTE } from "tw-elements";
import { ThemeToggleComponent } from "../../components/theme-toggle/theme-toggle.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, ThemeToggleComponent]
})
export class LayoutComponent implements OnInit {

    themeService = inject(ThemeService);

    ngOnInit(): void {
        initTE({ Sidenav, Collapse, Dropdown, initTE });
    }

}
