import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-browse-toolbar',
  templateUrl: './browse-toolbar.component.html'
})
export class BrowseToolbarComponent {
  @Input() sort = 'featured';
  @Input() productCount = 0;

  @Output() sortSelected = new EventEmitter<string>();
}
