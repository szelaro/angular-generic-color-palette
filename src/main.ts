import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, take, first } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <div style="display: flex; flex-wrap: wrap">
      <th *ngFor="let item of arr" style="width: 16.6666%; color: white; background: hsl({{ 200 - item * 10 }}, {{ 3 * item }}%, {{ 1.333 * item }}%); height: 3em; padding-top: 1.5em">{{ item }}</th>
    </div>
  `,
})
export class App {
  name = 'Angular';
  arr = [];

  constructor() {
    let i = 0;
    setTimeout(() => {
      let x = new Observable((observer) => {
        const handler = setInterval(() => {
          i++;
          observer.next(i);
        }, 100);
        return () => clearInterval(handler);
      });
      x.pipe(take(36))
        .pipe(take(36))
        .subscribe((i) => this.arr.push(i));
    }, 1000);
  }

  getColor(i: number): string {
    const filler = i.toString(16);
    const numbers = new Array(4).fill(filler);
    return '#88' + numbers.join('');
  }
}

bootstrapApplication(App);
