import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Comment {
  text: string;
  date: string | Date;
}

@Component({
  selector: 'app-checker-comments',
  templateUrl: './checker-comments.component.html',
  styleUrls: ['./checker-comments.component.scss']
})
export class CheckerCommentsComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() editable: boolean;
  public newComment: string;

  @Output() comment = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

}
