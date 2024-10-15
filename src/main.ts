import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <!--<div class="countdown-container">
        <img src="/img/ace.jpg" />

      </div>-->

      <div class="circle-timer">
      <img class="circle-image" src="" alt="Image">
      <div class="tick-marks">
      <div class="tick-mark" *ngFor="let i of tickMarks"></div>
      </div>
      <div class="countdown">
        {{ minutes }}:{{ seconds }}
      </div>
    </div>
    </div>

    
  `,
})
export class App implements OnInit {
  timer: number = 3600; // 60 minutes * 60 seconds
  intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.intervalId);
      }
    }, 1000); // 1 second
  }

  get minutes(): number {
    return Math.floor(this.timer / 60);
  }

  get seconds(): number {
    return this.timer % 60;
  }
  get tickMarks(): number[] {
    const tickMarks = [];
    for (let i = 0; i <= 60; i++) {
    tickMarks.push(i);
    }
    return tickMarks;
    }
}

bootstrapApplication(App);
