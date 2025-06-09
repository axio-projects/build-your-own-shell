import { Component, DOCUMENT, ElementRef, inject } from '@angular/core';

@Component({
    selector: '[main-resizable], [mainResizable]',
    imports: [],
    templateUrl: './resizable.component.html',
    styleUrl: './resizable.component.scss'
})
export class ResizebleComponent {
    protected move?: (event: MouseEvent) => void;

    protected resize = (event: MouseEvent) => this.onResize(event);
    protected resizeEnd = () => this.onResizeEnd();

    private document = inject(DOCUMENT);

    constructor(
        public element: ElementRef,
    ) { }

    onResize(event: MouseEvent): void {
        if (this.move) {
            this.move(event);
        }
    }

    onResizeEnd(): void {
        this.document.removeEventListener('mousemove', this.resize);
        this.document.removeEventListener('mouseup', this.resizeEnd);
        this.move = undefined;
    }

    onResizeNorth(start: MouseEvent): void {
        this.document.addEventListener('mousemove', this.resize);
        this.document.addEventListener('mouseup', this.resizeEnd);
        this.move = (move: MouseEvent) => {
            this.element.nativeElement.style.height = `${parseInt(getComputedStyle(this.element.nativeElement).height) - (start.clientY - move.clientY)}px`
        }
    }

    onResizeEast(start: MouseEvent): void {
        this.document.addEventListener('mousemove', this.resize);
        this.document.addEventListener('mouseup', this.resizeEnd);
        this.move = (move: MouseEvent) => {
            this.element.nativeElement.style.width = `${parseInt(getComputedStyle(this.element.nativeElement).width) + (move.clientX - start.clientX)}px`
        }
    }

    onResizeSouth(start: MouseEvent): void {
        this.document.addEventListener('mousemove', this.resize);
        this.document.addEventListener('mouseup', this.resizeEnd);
        this.move = (move: MouseEvent) => {
            this.element.nativeElement.style.height = `${parseInt(getComputedStyle(this.element.nativeElement).height) + (move.clientY - start.clientY)}px`
            console.log(this.element.nativeElement.style.height);
        }
    }

    onResizeWest(start: MouseEvent): void {
        this.document.addEventListener('mousemove', this.resize);
        this.document.addEventListener('mouseup', this.resizeEnd);
        this.move = (move: MouseEvent) => {
            this.element.nativeElement.style.width = `${parseInt(getComputedStyle(this.element.nativeElement).width) - (start.clientX - move.clientX)}px`
        }
    }
}
