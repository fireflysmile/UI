import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {

  @Input() mobile: number;
  @Input() email: string;
  @Input() title: string;

  public showCallPopup: boolean;
  public showEmailPopup: boolean;

  constructor() { }

  ngOnInit() {
  }

}
