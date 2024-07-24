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
import { LoggerTestingModule } from 'ngx-logger/testing';
import { PROYECTO_PRORROGA_DATA_KEY } from '../../proyecto-prorroga-data.resolver';
import { IProyectoProrrogaData, ProyectoProrrogaActionService } from '../../proyecto-prorroga.action.service';
import { ProyectoProrrogaDocumentosComponent } from './proyecto-prorroga-documentos.component';

describe('ProyectoProrrogaDocumentosComponent', () => {
  let component: ProyectoProrrogaDocumentosComponent;
  let fixture: ComponentFixture<ProyectoProrrogaDocumentosComponent>;
  const routeData: Data = {
    [PROYECTO_PRORROGA_DATA_KEY]: {
      proyecto: {
        id: 1,
        modeloEjecucion: {
          id: 1
        }
      },
      proyectoProrrogas: [],
      readonly: false
    } as IProyectoProrrogaData
  };
  const routeMock = TestUtils.buildActivatedRouteMock('1', routeData);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProyectoProrrogaDocumentosComponent
      ],
      imports: [
        TestUtils.getIdiomas(),
        MaterialDesignModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SgiAuthModule
      ],
      providers: [
        { provide: SnackBarService, useValue: TestUtils.getSnackBarServiceSpy() },
        ProyectoProrrogaActionService,
        SgiAuthService,
        { provide: ActivatedRoute, useValue: routeMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoProrrogaDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
