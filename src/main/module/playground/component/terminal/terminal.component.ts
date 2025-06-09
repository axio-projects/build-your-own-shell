import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { ResizebleComponent } from '../../../shared/component/resizable/resizable.component';

@Component({
    selector: 'main-terminal',
    imports: [DisplayComponent, ResizebleComponent],
    templateUrl: './terminal.component.html',
    styleUrl: './terminal.component.scss'
})
export class TerminalComponent {

}
