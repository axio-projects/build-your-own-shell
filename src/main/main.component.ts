import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './module/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from './module/shared/shared.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'main-root',
    imports: [RouterOutlet, RouterLink, NavigationComponent, MatButtonModule, MatIconModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    protected title = 'Build Your Own Shell';
    protected iconName = 'shell';

    protected fontSet: string;

    constructor(
        public shared: SharedService
    ) {
        this.fontSet = this.shared.fontSet;
    }
}
