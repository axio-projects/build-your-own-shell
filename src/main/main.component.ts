import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './module/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from './module/shared/shared.service';
import { MatButtonModule } from '@angular/material/button';

type NavMenuItem = { link: string, icon: string, label: string };

@Component({
    selector: 'main-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, NavigationComponent, MatButtonModule, MatIconModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    protected title = 'Build Your Own Shell';
    protected iconName = 'shell';

    protected fontSet: string;
    protected navMenuItems: NavMenuItem[] = [
        {
            link: 'description',
            icon: 'description',
            label: 'Description'
        },
        {
            link: 'playground',
            icon: 'code',
            label: 'Playground'
        }
    ]

    constructor(
        public shared: SharedService
    ) {
        this.fontSet = this.shared.fontSet;
    }
}
