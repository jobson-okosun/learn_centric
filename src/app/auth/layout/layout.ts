import { Component, OnDestroy, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

interface Slide {
  image: string;
  title: string;
}

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
})
export default class AuthLayout implements OnInit, OnDestroy {
  private router = inject(Router);
  isLogin = signal(true);

  slides: Slide[] = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1663050763436-818382a24bb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0',
      title: 'Empowering Minds,<br/>Shaping the Future'
    },
        {
      image: 'https://plus.unsplash.com/premium_photo-1671070687988-b2d6805ea896?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Collaborate and Grow<br/>With Cohorts'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
      title: 'Learn Anywhere,<br/>Achieve More'
    }
  ];

  activeSlideIndex = signal(0);
  private slideInterval: any;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLogin.set(event.urlAfterRedirects.includes('login'));
    });
  }

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  setSlide(index: number) {
    this.activeSlideIndex.set(index);
    this.clearInterval();
    this.startInterval();
  }

  private startInterval() {
    this.slideInterval = setInterval(() => {
      this.activeSlideIndex.update(i => (i + 1) % this.slides.length);
    }, 5000);
  }

  private clearInterval() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
