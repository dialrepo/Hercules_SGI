import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AbstractTablePaginationComponent } from '@core/component/abstract-table-pagination.component';
import { SgiError } from '@core/errors/sgi-error';
import { MSG_PARAMS } from '@core/i18n';
import { IModeloEjecucion } from '@core/models/csp/tipos-configuracion';
import { FxFlexProperties } from '@core/models/shared/flexLayout/fx-flex-properties';
import { FxLayoutProperties } from '@core/models/shared/flexLayout/fx-layout-properties';
import { ROUTE_NAMES } from '@core/route.names';
import { ModeloEjecucionService } from '@core/services/csp/modelo-ejecucion.service';
import { DialogService } from '@core/services/dialog.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { SgiAuthService } from '@sgi/framework/auth';
import { RSQLSgiRestFilter, SgiRestFilter, SgiRestFilterOperator, SgiRestListResult } from '@sgi/framework/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const MSG_BUTTON_ADD = marker('btn.add.entity');
const MSG_REACTIVE = marker('msg.csp.reactivate');
const MSG_SUCCESS_REACTIVE = marker('msg.reactivate.entity.success');
const MSG_ERROR_REACTIVE = marker('error.reactivate.entity');
const MSG_DEACTIVATE = marker('msg.deactivate.entity');
const MSG_ERROR_DEACTIVATE = marker('error.csp.deactivate.entity');
const MSG_SUCCESS_DEACTIVATE = marker('msg.csp.deactivate.success');
const MODELO_EJECUCION_KEY = marker('csp.modelo-ejecucion');

@Component({
  selector: 'sgi-modelo-ejecucion-listado',
  templateUrl: './modelo-ejecucion-listado.component.html',
  styleUrls: ['./modelo-ejecucion-listado.component.scss']
})
export class ModeloEjecucionListadoComponent extends AbstractTablePaginationComponent<IModeloEjecucion> implements OnInit {
  ROUTE_NAMES = ROUTE_NAMES;
  textoCrear: string;

  textoDesactivar: string;
  textoReactivar: string;
  textoErrorDesactivar: string;
  textoSuccessDesactivar: string;
  textoSuccessReactivar: string;
  textoErrorReactivar: string;

  fxFlexProperties: FxFlexProperties;
  fxLayoutProperties: FxLayoutProperties;
  modeloEjecucion$: Observable<IModeloEjecucion[]>;

  constructor(
    private readonly logger: NGXLogger,
    protected readonly snackBarService: SnackBarService,
    private readonly modeloEjecucionService: ModeloEjecucionService,
    private readonly dialogService: DialogService,
    private readonly translate: TranslateService,
    private authService: SgiAuthService
  ) {
    super();
    this.fxFlexProperties = new FxFlexProperties();
    this.fxFlexProperties.sm = '0 1 calc(50%-10px)';
    this.fxFlexProperties.md = '0 1 calc(33%-10px)';
    this.fxFlexProperties.gtMd = '0 1 calc(22%-10px)';
    this.fxFlexProperties.order = '2';

    this.fxLayoutProperties = new FxLayoutProperties();
    this.fxLayoutProperties.gap = '20px';
    this.fxLayoutProperties.layout = 'row wrap';
    this.fxLayoutProperties.xs = 'column';
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setupI18N();
    this.formGroup = new FormGroup({
      nombre: new FormControl(''),
      activo: new FormControl(true)
    });
    this.filter = this.createFilter();
  }

  private setupI18N(): void {
    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_BUTTON_ADD,
          { entity: value }
        );
      })
    ).subscribe((value) => this.textoCrear = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_DEACTIVATE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoDesactivar = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_ERROR_DEACTIVATE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoErrorDesactivar = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_SUCCESS_DEACTIVATE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoSuccessDesactivar = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_REACTIVE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoReactivar = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_SUCCESS_REACTIVE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoSuccessReactivar = value);

    this.translate.get(
      MODELO_EJECUCION_KEY,
      MSG_PARAMS.CARDINALIRY.SINGULAR
    ).pipe(
      switchMap((value) => {
        return this.translate.get(
          MSG_ERROR_REACTIVE,
          { entity: value, ...MSG_PARAMS.GENDER.MALE }
        );
      })
    ).subscribe((value) => this.textoErrorReactivar = value);
  }

  protected resetFilters(): void {
    this.formGroup.controls.activo.setValue(true);
    this.formGroup.controls.nombre.setValue('');
  }

  protected createObservable(reset?: boolean): Observable<SgiRestListResult<IModeloEjecucion>> {
    return this.modeloEjecucionService.findAllTodos(this.getFindOptions(reset));
  }

  protected initColumns(): void {
    if (this.authService.hasAuthority('CSP-ME-R')) {
      this.columnas = ['nombre', 'descripcion', 'externo', 'contrato', 'activo', 'acciones'];
    } else {
      this.columnas = ['nombre', 'descripcion', 'externo', 'contrato', 'acciones'];
    }

  }

  protected loadTable(reset?: boolean): void {
    this.modeloEjecucion$ = this.getObservableLoadTable(reset);
  }

  protected createFilter(): SgiRestFilter {
    const controls = this.formGroup.controls;
    const filter = new RSQLSgiRestFilter('nombre', SgiRestFilterOperator.LIKE_ICASE, controls.nombre.value);
    if (controls.activo.value !== 'todos') {
      filter.and('activo', SgiRestFilterOperator.EQUALS, controls.activo.value?.toString());
    }
    return filter;
  }

  /**
   * Desactivamos un modelo ejecucion activado
   * @param modeloEjecucion modelo ejecucion
   */
  deactivateModeloEjecucion(modeloEjecucion: IModeloEjecucion): void {
    const subcription = this.dialogService.showConfirmation(this.textoDesactivar)
      .pipe(switchMap((accept) => {
        if (accept) {
          return this.modeloEjecucionService.desactivar(modeloEjecucion.id);
        } else {
          return of();
        }
      })).subscribe(
        () => {
          this.snackBarService.showSuccess(this.textoSuccessDesactivar);
          this.loadTable();
        },
        (error) => {
          this.logger.error(error);
          if (error instanceof SgiError) {
            this.processError(error);
          }
          else {
            this.processError(new SgiError(this.textoErrorDesactivar));
          }
        }
      );
    this.suscripciones.push(subcription);
  }


  /**
   * Activamos un modelo ejecucion desactivado
   * @param tipoDocumento modelo ejecucion
   */
  activateModeloEjecucion(modeloEjecucion: IModeloEjecucion): void {
    const subcription = this.dialogService.showConfirmation(this.textoReactivar)
      .pipe(switchMap((accept) => {
        if (accept) {
          modeloEjecucion.activo = true;
          return this.modeloEjecucionService.reactivar(modeloEjecucion.id);
        } else {
          return of();
        }
      })).subscribe(
        () => {
          this.snackBarService.showSuccess(this.textoSuccessReactivar);
          this.loadTable();
        },
        (error) => {
          this.logger.error(error);
          modeloEjecucion.activo = false;
          if (error instanceof SgiError) {
            this.processError(error);
          }
          else {
            this.processError(new SgiError(this.textoErrorReactivar));
          }
        }
      );
    this.suscripciones.push(subcription);
  }

}
