import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../app.models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() eachCard: Card;
  constructor() { }

  ngOnInit() {
  }

}
