import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { FollowService } from './../../../services/follow.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  providers: [FollowService, MessageService]
})

export class AddComponent implements OnInit {
  public titulo: String;

  constructor() {
    this.titulo = "Enviar mensaje";
  }
  ngOnInit() {
    console.log("Componente add de mensajeria cargado");
  }
}