import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'tag.component.html',
  styleUrl: 'tag.component.scss'
})
export class TagComponent {
  @Input() tag!: string;
  @Input() color!: string;
}
