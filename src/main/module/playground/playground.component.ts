import { Component } from '@angular/core';
import { TerminalComponent } from './component/terminal/terminal.component';

@Component({
    selector: 'main-playground',
    imports: [TerminalComponent],
    templateUrl: './playground.component.html',
    styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {

}
