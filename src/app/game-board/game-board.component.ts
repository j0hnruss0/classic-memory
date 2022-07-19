import { Component, OnInit } from '@angular/core';
import { Card } from '../app.models';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  animations: [
    trigger('flipCard', [
      state('open', style({
        backgroundColor: 'orange'
      })),
      state('closed', style({
        backgroundColor: 'aqua'
      })),
      state('right', style({
        backgroundColor: 'green'
      })),
      state('wrong', style({
        backgroundColor: 'red'
      })),
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('* => closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class GameBoardComponent implements OnInit {
  cards = new Array<Card>();
  guesses: number;
  pairsRight: number;
  firstPick = {
    id: 100,
    icon: ''
  };
  disable: boolean;
  constructor() { }

  ngOnInit() {
    this.gameSet();
  }

  gameSet(): any {
    this.guesses = 30;
    this.pairsRight = 0;
    this.firstPick = {
      id: 100,
      icon: ''
    }
    this.disable = false;
    let images = [
      'star', 
      'moon', 
      'sun', 
      'face', 
      'coin', 
      'dog', 
      'cat', 
      'dragon',
      'shark',
      'heart',
      'spade',
      'club',
      'diamond',
      'joker',
      'candy',
      'cash',
      'balloon',
      'pint'];
    let selected = [];
    for (let i = 0; i < 36; i++) {
      let choice = Math.floor(Math.random() * images.length);
      this.cards[i] = {
        id: i, 
        isClicked: false,
        cardImage: images[choice],
        isMatch: false,
        isPaired: false
      }
      
      if (!selected.includes(images[choice])) {
        selected.push(images[choice]);  
      } else {
        images.splice(choice, 1);
      }
        
      
    };
  }

  

  cardChoice(index: number): void {
    if (this.cards[index].isClicked === false && this.disable === false) {
      this.cards[index].isClicked = true
      if (!this.firstPick.icon) {
        this.firstPick = {
          id: index,
          icon: this.cards[index].cardImage
        };
        this.cards[index].isMatch = true;
      } else {
        if (this.firstPick.icon === this.cards[index].cardImage) {
          this.cards[index].isMatch = true;
          this.cards[index].isPaired = true;
          this.cards[this.firstPick.id].isPaired = true;
          this.pairsRight += 1;
          this.gameWon();
          this.firstPick = {
            id: 100,
            icon: ''
          }
        } else {
          this.disable = true;
          this.guesses -= 1;
          if (this.guesses > 0) {
            setTimeout(()=> {
              this.cards[index].isClicked = false;
              this.cards[index].isMatch = false;
              this.cards[this.firstPick.id].isClicked = false;
              this.cards[this.firstPick.id].isMatch = false;
              this.firstPick = {
                id: 100,
                icon: ''
              }
              this.disable = false;
            }, 1500);
          };
        };
      };
    };
    this.gameLost();

  };

  cardState(id: string): string {
    if (this.cards[id].isClicked) {
      if (!this.cards[id].isMatch) {
        return 'wrong'
      } else if (this.cards[id].isPaired) {
        return 'right'
      } else {
        return 'open'
      }
    } else {
      return 'closed'
    }
  };

  gameLost(): void {
    if (this.guesses === 0) {
      for (let i = 0; i < this.cards.length; i ++) {
        this.cards[i].isMatch = false;
        this.cards[i].isClicked = true;
      }
    }
  }

  gameWon(): void {
    if (this.guesses > 0 && this.pairsRight === 18) {
      for (let i = 0; i < this.cards.length; i ++) {
        this.cards[i].isPaired = true;
        this.cards[i].isMatch = true;
        this.cards[i].isClicked = true;
      }
    }
  }
}
