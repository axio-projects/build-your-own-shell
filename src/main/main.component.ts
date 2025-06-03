import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'main-root',
    imports: [RouterOutlet],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class Main {
    protected title = 'build-your-own-shell';
}
