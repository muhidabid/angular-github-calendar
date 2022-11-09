import { Renderer2, Inject, OnInit, Component, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-github-calendar',
  templateUrl: './github-calendar.component.html',
  styleUrls: ['./github-calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GithubCalendarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    const s = this.renderer2.createElement('script');
    s.onload = this.loadNextScript.bind(this);
    s.type = 'text/javascript';
    s.src = '../../assets/github-calendar/dist/github-calendar.min.js'; // Main code by @IonicaBizau that fetches results
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
  }

  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.src = '../../assets/github-calendar/js/main.js'; // Where you specify the username of the account you want the calendar of
    s.text = `
    // This would error, if previous script has not yet been loaded
     someGlobalObject.doSomething();
    `
    this.renderer2.appendChild(this._document.body, s);
  }

  goToLink(url: string){
  window.open(url, "_blank");
  }
}
