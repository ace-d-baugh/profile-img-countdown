import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <div class="circle color-changing"></div>
      <div class="circle-timer">
        <img class="circle-image" src="src/react_logo_icon.png" alt="Image">
        <div class="countdown">
          <p class="caption">Session Ending:</p>
          <span class="timer">{{ minutes }}:{{ seconds }}</span>
        </div>
        <div class="info-box">
          <h4 class="info-header">Session Countdown</h4>
          <p class="info-text">This session will end in <b>{{ minutes }}:{{ seconds }}</b>. Any unsaved or unsubmitted changes will be lost.<br/><br/>A reminder will pop up at 15 minutes prompting you to reauthenticate or keep working.</p>
        </div>
      </div>
    </div>
  `,
})
export class App implements OnInit {
  timer: number = 3600; // 60 minutes * 60 seconds
  intervalId: any;
  clipPath: string =  "";
  colorChange: string = "";

  ngOnInit(): void {
    this.startTimer();
    const countdown = document.querySelector('.circle') as HTMLElement;
    this.animateClipPath(countdown);
    this.changeColor(countdown);
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
        this.clipPath = `polygon(0% ${50 + this.percent(top,cutPoint50)}%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;      
      } else if (this.timer >= cutPoint40) {
        this.clipPath = `polygon(${0 + this.percent(cutPoint50,cutPoint40)}% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;        
      } else if (this.timer >= cutPoint30) {
        this.clipPath = `polygon(${50 + this.percent(cutPoint40,cutPoint30)}% 100%, 100% 100%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;
      } else if (this.timer >= cutPoint20) {
        this.clipPath = `polygon(100% ${100 - this.percent(cutPoint30,cutPoint20)}%, 100% 50%, 100% 0%, 50% 0%, 50% 50%)`;
      } else if (this.timer >= cutPoint10) {
        this.clipPath = `polygon(100% ${50 - this.percent(cutPoint20,cutPoint10)}%, 100% 0%, 50% 0%, 50% 50%)`;
      } else {
        this.clipPath = `polygon(${100 - this.percent(cutPoint10,0)}% 0%, 50% 0%, 50.0000000001% 50.0000000001%)`;
      }
 
      element.style.clipPath = this.clipPath;
  
      if (progress < top) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
  }
  
  percent(topNum:number, bottomNum:number) {
    return (50*(1-((this.timer-bottomNum)/(topNum-bottomNum))));
  }

  light(timePercent:number) {
    if (timePercent > 50) {
      return 25 + (100 - timePercent) / 50 * 25;
    } else {
      return 50;
    }
  }

  changeColor(element: HTMLElement) {

    const changing = () => {
      const timePercent = this.timer/3600*100;
      this.colorChange = `hsl(${timePercent}, 100%, ${this.light(timePercent)}%)`;

      element.style.backgroundColor = this.colorChange;

      if (this.timer > 0) {
        requestAnimationFrame(changing);
      }
    };

    changing();
  }

}

bootstrapApplication(App);
