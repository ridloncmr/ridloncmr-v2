import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() tags: string[] = [];

  colorsMap = new Map<string, string>();
  availableColors = [
    'rgba(255,99,71,0.5)', 'rgba(255,165,0,0.5)', 'rgba(255,215,0,0.5)', 
    'rgba(124,252,0,0.5)', 'rgba(50,205,50,0.5)', 'rgba(0,255,127,0.5)', 
    'rgba(32,178,170,0.5)', 'rgba(0,206,209,0.5)', 'rgba(30,144,255,0.5)',
    'rgba(65,105,225,0.5)', 'rgba(138,43,226,0.5)', 'rgba(186,85,211,0.5)',
    'rgba(218,112,214,0.5)', 'rgba(255,105,180,0.5)', 'rgba(255,69,0,0.5)',
    'rgba(0,250,154,0.5)', 'rgba(70,130,180,0.5)', 'rgba(220,20,60,0.5)',
    'rgba(238,130,238,0.5)', 'rgba(255,0,255,0.5)', 'rgba(0,255,255,0.5)',
    'rgba(255,140,0,0.5)', 'rgba(173,255,47,0.5)', 'rgba(100,149,237,0.5)',
    'rgba(255,20,147,0.5)', 'rgba(60,179,113,0.5)', 'rgba(154,205,50,0.5)',
    'rgba(255,160,122,0.5)', 'rgba(0,191,255,0.5)', 'rgba(147,112,219,0.5)'
  ];

  visibleTags: string[] = [];
  collapsed = true;
  maxVisibleTags = 5;

  ngOnInit(): void {
    this.shuffleColors();
    this.updateVisibleTags();
  }

  shuffleColors(): void {
    const colorsCopy = [...this.availableColors];
    this.tags.forEach(tag => {
      const index = Math.floor(Math.random() * colorsCopy.length);
      const color = colorsCopy.splice(index, 1)[0];
      this.colorsMap.set(tag, color);
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.updateVisibleTags();
  }

  updateVisibleTags(): void {
    this.visibleTags = this.collapsed ? this.tags.slice(0, this.maxVisibleTags) : this.tags;
  }
}
