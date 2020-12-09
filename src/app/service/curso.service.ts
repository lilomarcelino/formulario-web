import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Curso } from '../model/curso.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends GenericService<Curso> {
  constructor(http: HttpClient) {
    super(http, 'curso');
  }
}
