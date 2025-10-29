import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `
    <div class="layout-footer">
        Sistema de contratación
        <a href="https://github.com/VictorSinche" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">UMA</a>
    </div>
    `
})
export class AppFooter {}
