import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { FollowService } from './../../../services/follow.service';
import { User } from '../../../models/user';
import { UserService } from './../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'sended',
  templateUrl: './sended.component.html'
})

export class SendedComponent implements OnInit {
  public titulo: String;
  public identity;
  public token;
  public url: string;
  public status: string;
  public messages: Message[];

  constructor(
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.titulo = "Mensajes enviados";
  }
  ngOnInit() {
    console.log("Componente sended de mensajeria cargado");
  }
  getMessage() {

  }
}