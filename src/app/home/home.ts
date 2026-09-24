import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('hello-world-app');
  protected readonly isServerRunning = signal(true);

  ClickTestDefault = "This Server is Running\nHello World!";
  ClickTest = this.ClickTestDefault;

  onClick(event : Event) {
    const element = event.target as HTMLElement
    if (element.classList.contains("test")) {
      this.ClickTest = "Clicked!"
    }
    if (element.classList.contains("reset")) {
      this.ClickTest = this.ClickTestDefault
    }
  }
}
