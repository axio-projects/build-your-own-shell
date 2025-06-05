import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './module/navigation/navigation.component';

@Component({
    selector: 'main-root',
    imports: [RouterOutlet, NavigationComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    protected icon = 'shell';
    protected title = 'Build Your Own Shell';
}
