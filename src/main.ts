import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <div class="circle"></div>
      <div class="circle-timer">
        <img class="circle-image" src="https://ace-d-baugh.github.io/teams-stand-up-tracker/Ace.jpg" alt="Image">
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
  clipPath: string =  "";

  ngOnInit(): void {
    this.startTimer();
    const pieChartElement = document.querySelector('.circle') as HTMLElement;
    this.animateClipPath(pieChartElement);
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

  get seconds(): string {
    return (this.timer % 60).toString().padStart(2, '0');
  }

  animateClipPath(element: HTMLElement) {
  
    const top = 60 * 60;
    const cutPoint50 = 50 * 60;
    const cutPoint40 = 40 * 60;
    const cutPoint30 = 30 * 60;
    const cutPoint20 = 20 * 60;
    const cutPoint10 = 10 * 60;

    const animate = () => {

      const elapsedTime = top - this.timer;
      const progress = elapsedTime / top;
      
      // Original clip: polygon(0% 50%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)
      if(this.timer >= cutPoint50 ) {
        console.log('polygon(0% ',50+(300*(1-(this.timer/top))),'%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)');
        this.clipPath = `polygon(0% ${50 + (300*(1-(this.timer/top)))}%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;      
      } else if (this.timer >= cutPoint40) {
        console.log('polygon(',0 + (300*(1-(this.timer/cutPoint50))),'% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)');
        this.clipPath = `polygon(${0 + (300*(1-(this.timer/cutPoint50)))}% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;        
      } else if (this.timer >= cutPoint30) {
        console.log('polygon(',50 + (300*(1-(this.timer/cutPoint40))),'% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)');
        this.clipPath = `polygon(${50 + (300*(1-(this.timer/cutPoint40)))}% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;
      } else if (this.timer >= cutPoint20) {
        console.log('polygon(',50 - (300*(1-(this.timer/cutPoint30))),'% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)');
        this.clipPath = `polygon(${50 - (300*(1-(this.timer/cutPoint30)))}% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;
      } else if (this.timer >= cutPoint10) {
        console.log('polygon(100% ',50 - (300*(1-(this.timer/cutPoint20))),'%, 100% 0%, 50% 0%, 50% 50%)');
        this.clipPath = `polygon(100% ${50 - (300*(1-(this.timer/cutPoint20)))}%, 100% 0%, 50% 0%, 50% 50%)`;
      } else {
        console.log('polygon(',100 - (300*(1-(this.timer/cutPoint10))),'% 0%, 50% 50%, 50% 0%)');
        this.clipPath = `polygon(${100 - (300*(1-(this.timer/cutPoint10)))}% 0%, 50% 50%, 50% 0%)`;
      }
 
      element.style.clipPath = this.clipPath;
  
      if (progress < top) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
  }
  
}

bootstrapApplication(App);
