import { ZardDropdownImports } from '@/shared/components/dropdown';
import { Component, inject, input, signal, viewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { NgTemplateOutlet } from '@angular/common';

export type MaterialType = 'module' | 'lesson' | 'assignment' | 'quiz' | 'discussion' | 'page' | 'video' | 'audio' | 'image' | 'file' | 'link';

export interface MaterialNode {
  id: string;
  type: MaterialType;
  title: string;
  subtitle?: string; 
  url?: string; 
  expanded?: boolean;
  status?: 'published' | 'draft';
  skills?: string[];
  objectives?: string[];
  children?: MaterialNode[];
}

@Component({
  imports: [ZardDropdownImports, RouterLink, NgTemplateOutlet],
  selector: 'app-materials-list',
  styleUrl: './materials-list.css',
  templateUrl: './materials-list.html',
})
export class MaterialsList {
  isNested = input(false); 
  private route = inject(ActivatedRoute);
  private dialog = inject(ZardDialogService);
  
  mediaModal = viewChild.required<TemplateRef<any>>('mediaModal');

  nodes = signal<MaterialNode[]>([
    {
      id: 'm1',
      type: 'module',
      title: 'Module 1: Introduction To course materials',
      subtitle: 'Sept 17, 2026',
      expanded: true,
      status: 'published',
      skills: ['Critical Thinking', 'Problem Solving'],
      objectives: [
        'Understand the basic concepts of course structure and design.',
        'Analyze different types of learning materials and their effective use cases.'
      ],
      children: [
        {
          id: 'f1',
          type: 'lesson',
          title: 'Lesson 1: Introduction To course materials',
          subtitle: 'Sept 17, 2026',
          expanded: true,
          status: 'published',
          skills: ['Design Systems'],
          objectives: [
            'Differentiate between modules, lessons, and assignments.',
            'Apply design system principles to layout organization.'
          ],
          children: [
            { id: 'v1', type: 'video', title: 'Video: The design system', subtitle: '40:15 Mins', url: 'https://youtu.be/zpOULjyy-n8?si=Z6eQ_nZt43F3wEAN', status: 'published' },
            { id: 'a1', type: 'audio', title: 'Audio: Intro to AI', subtitle: '04:15 Mins', url: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', status: 'draft' },
            { id: 'i1', type: 'image', title: 'Image: Hero banner', subtitle: '2 MB', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', status: 'published' }
          ]
        },
        { id: 'a1', type: 'assignment', title: 'Assignment 1: Introduction Essay', subtitle: 'Due Sept 20, 2026', status: 'published' },
        { id: 'q1', type: 'quiz', title: 'Quiz 1: Fundamentals', subtitle: '20 Questions', status: 'published' },
        { id: 'd1', type: 'discussion', title: 'Discussion: Course Expectations', subtitle: 'Sept 18, 2026', status: 'published' }
      ]
    },
    {
      id: 'm2',
      type: 'module',
      title: 'Module 2: Advanced Topics',
      subtitle: 'Oct 01, 2026',
      expanded: true,
      status: 'draft',
      children: [
        { id: 'p1', type: 'page', title: 'Page: Reading materials', subtitle: '5 Mins Read' },
        { id: 'f2', type: 'file', title: 'File: Syllabus.pdf', subtitle: '1.2 MB', url: '/mock/syllabus.pdf' },
        { id: 'l1', type: 'link', title: 'Link: External Resource', subtitle: 'https://example.com', url: 'https://example.com' }
      ]
    },
    { id: 'standalone-q', type: 'quiz', title: 'Midterm Assessment', subtitle: '50 Questions' },
    { id: 'standalone-a', type: 'assignment', title: 'Final Course Project', subtitle: 'Due Nov 15, 2026' },
    { id: 'standalone-f', type: 'file', title: 'Course Overview Presentation', subtitle: '4.5 MB', url: '/mock/overview.pdf' }
  ]);

  toggleNode(node: MaterialNode) {
    if (node.type === 'module' || node.type === 'lesson') {
      node.expanded = !node.expanded;
      // Trigger change detection by cloning the array
      this.nodes.update(nodes => [...nodes]);
    }
  }

  activeMedia = signal<{type: 'video'|'audio'|'image'|'file', title: string, url: string} | null>(null);
  activeNodeForMenu = signal<MaterialNode | null>(null);
  private activeDialogRef: ZardDialogRef<any> | null = null;

  openMedia(type: 'video'|'audio'|'image'|'file', title: string, url: string) {
    this.activeMedia.set({type, title, url});
    
    this.activeDialogRef = this.dialog.create({
      zTitle: title,
      zContent: this.mediaModal(),
      zHideFooter: true,
      zCustomClasses: '!max-w-5xl w-full',
    });
  }

  closeMedia() {
    this.activeDialogRef?.close();
  }

  toggleFullscreen(element: HTMLElement) {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }

  getCourseLink(type: string, id: string): string[] {
    const segments = this.route.pathFromRoot
      .flatMap(r => r.snapshot.url)
      .map(segment => segment.path);
      
    const materialsIndex = segments.indexOf('materials');
    
    const courseSegments = materialsIndex >= 0 
      ? segments.slice(0, materialsIndex) 
      : segments;

    return ['/', ...courseSegments, 'materials', type, id];
  }
}
