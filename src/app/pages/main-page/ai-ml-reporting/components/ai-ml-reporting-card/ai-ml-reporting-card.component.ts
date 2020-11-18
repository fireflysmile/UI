import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-ml-reporting-card',
  templateUrl: './ai-ml-reporting-card.component.html',
  styleUrls: ['./ai-ml-reporting-card.component.scss']
})
export class AiMlReportingCardComponent implements OnInit {
  @Input() title;

  constructor() { }

  ngOnInit(): void {
  }

}
