import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNode } from '../../../../core/models/file-node.model';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() directories: FileNode[] = [];
  @Input() activeTab: string = "";
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string) {
    this.tabChange.emit(tabId);
  }
}
