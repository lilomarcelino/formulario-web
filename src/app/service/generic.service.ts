import { BaseModel } from '../model/base.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FORMULARIO_API } from '../util/api.model';

export abstract class GenericService<T extends BaseModel> {
  constructor(protected http: HttpClient, private endpoint: string) {}

  buscarTodos(param?: any): Observable<any> {
    return this.http.get<any>(`${FORMULARIO_API}/${this.endpoint}`, {
      params: param,
    });
  }

  buscarTodosAsync(param?: any): Promise<any> {
    return this.http
      .get<T>(`${FORMULARIO_API}/${this.endpoint}`, { params: param })
      .toPromise();
  }

  buscarPorId(id: number, param?: any): Observable<T> {
    return this.http.get<T>(`${FORMULARIO_API}/${this.endpoint}/${id}`, {
      params: param,
    });
  }

  buscarPorIdAsync(id: number, param?: any): Promise<T> {
    return this.http
      .get<T>(`${FORMULARIO_API}/${this.endpoint}/${id}`, {
        params: param,
      })
      .toPromise();
  }

  salvar(entity: T): Observable<T> {
    if (entity.id) {
      return this.http.put<T>(
        `${FORMULARIO_API}/${this.endpoint}/${entity.id}`,
        entity
      );
    } else {
      return this.http.post<T>(`${FORMULARIO_API}/${this.endpoint}`, entity);
    }
  }

  excluir(id: number): Observable<T> {
    return this.http.delete<T>(`${FORMULARIO_API}/${this.endpoint}/${id}`);
  }
}
