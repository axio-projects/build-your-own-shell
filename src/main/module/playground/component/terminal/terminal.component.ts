import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { ResizeableComponent } from '../../../shared/component/resizeable/resizeable.component';

@Component({
    selector: 'main-terminal',
    imports: [DisplayComponent, ResizeableComponent],
    templateUrl: './terminal.component.html',
    styleUrl: './terminal.component.scss'
})
export class TerminalComponent {

}
