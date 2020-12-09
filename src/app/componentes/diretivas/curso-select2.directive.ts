import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';
import { UtilService } from 'src/app/service/util.service';
import { FORMULARIO_API } from 'src/app/util/api.model';

declare const jQuery: any;

@Directive({
  selector: '[appCursoSelect2]',
})
export class CursoSelect2Directive {
  @Input() ngModel;
  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef, private utilService: UtilService) {}

  ngOnInit() {
    jQuery(this.el.nativeElement)
      .select2({
        theme: 'bootstrap4',
        language: 'pt-BR',
        placeholder: '',
        allowClear: true,
        width: 'resolve',
        ajax: {
          delay: 500,
          url: `${FORMULARIO_API}/curso`,
          dataType: 'json',
          data: (param) => {
            return this.utilService.removeAtributosVazio({
              size: 10,
              search: param.term ? `nome:${param.term}` : null,
              sort: 'nome',
            });
          },
          processResults: (data) => {
            const resultado = new Array();
            data.content.forEach((dados) => {
              resultado.push({
                id: dados.id,
                text: dados.nome,
              });
            });
            return {
              results: resultado,
            };
          },
          cache: true,
        },
      })
      .on('select2:select', (e) => {
        const novo = {
          id: e.params.data.id,
          nome: e.params.data.text,
        };

        this.ngModel = novo;
        this.ngModelChange.emit(novo);
      })
      .on('select2:unselect', (e) => {
        jQuery(this.el.nativeElement).val(null).trigger('change');

        this.ngModel = null;
        this.ngModelChange.emit(null);
      });

    if (this.ngModel && this.ngModel.id) {
      const newOption = new Option(
        this.ngModel.nome,
        this.ngModel.id,
        true,
        true
      );

      jQuery(this.el.nativeElement).append(newOption).trigger('change');
    }
  }

  @HostListener('change') ngOnChanges() {
    if (this.ngModel && this.ngModel.id && this.ngModel.nome) {
      const newOption = new Option(
        this.ngModel.nome,
        this.ngModel.id,
        true,
        true
      );

      jQuery(this.el.nativeElement).append(newOption).trigger('change');
    }
  }
}
