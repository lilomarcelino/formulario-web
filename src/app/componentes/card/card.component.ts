import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() textoPadrao: string = '';
  @Input() mostrarBotao: boolean = false;
  @Input() mostrarCabecalho: boolean = false;
  @Output() navegarRotaDesejadaEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  irParaRotaDesejada() {
    this.navegarRotaDesejadaEmitter.emit();
  }
}
