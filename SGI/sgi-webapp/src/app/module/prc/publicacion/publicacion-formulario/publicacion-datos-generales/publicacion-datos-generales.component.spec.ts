import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarService } from '@core/services/snack-bar.service';
import TestUtils from '@core/utils/test-utils';
import { MaterialDesignModule } from '@material/material-design.module';
import { SgiAuthModule, SgiAuthService } from '@sgi/framework/auth';
import { SharedModule } from '@shared/shared.module';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { SgpSharedModule } from 'src/app/esb/sgp/shared/sgp-shared.module';
import { PrcSharedModule } from '../../../shared/prc-shared.module';
import { ProduccionCientificaInitializerService } from '../../../shared/produccion-cientifica-initializer.service';
import { PRODUCCION_CIENTIFICA_DATA_KEY } from '../../../shared/produccion-cientifica-route-params';
import { IProduccionCientificaData } from '../../../shared/produccion-cientifica.resolver';
import { PublicacionActionService } from '../../publicacion.action.service';

import { PublicacionDatosGeneralesComponent } from './publicacion-datos-generales.component';

describe('PublicacionDatosGeneralesComponent', () => {
  let component: PublicacionDatosGeneralesComponent;
  let fixture: ComponentFixture<PublicacionDatosGeneralesComponent>;

  const routeData: Data = {
    [PRODUCCION_CIENTIFICA_DATA_KEY]: {
      produccionCientifica: {
        id: 1
      }
    } as IProduccionCientificaData
  };
  const routeMock = TestUtils.buildActivatedRouteMock('1', routeData);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicacionDatosGeneralesComponent
      ],
      imports: [
        TestUtils.getIdiomas(),
        MaterialDesignModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SgiAuthModule,
        LoggerTestingModule,
        SharedModule,
        SgpSharedModule,
        PrcSharedModule
      ],
      providers: [
        { provide: SnackBarService, useValue: TestUtils.getSnackBarServiceSpy() },
        PublicacionActionService,
        ProduccionCientificaInitializerService,
        SgiAuthService,
        { provide: ActivatedRoute, useValue: routeMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
