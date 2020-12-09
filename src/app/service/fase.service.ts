import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Fase } from '../model/fase.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FaseService extends GenericService<Fase> {
  constructor(http: HttpClient) {
    super(http, 'fase');
  }
}
