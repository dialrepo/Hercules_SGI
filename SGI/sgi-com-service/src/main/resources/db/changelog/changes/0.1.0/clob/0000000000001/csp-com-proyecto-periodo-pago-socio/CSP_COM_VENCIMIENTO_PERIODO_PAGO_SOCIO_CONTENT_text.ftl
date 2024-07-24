<#assign data = CSP_COM_VENCIMIENTO_PERIODO_PAGO_SOCIO_DATA?eval />
<#--
  Formato CSP_COM_VENCIMIENTO_PERIODO_PAGO_SOCIO_DATA:
  { 
    "titulo": "Proyecto 1",
    "fechaPrevistaPago": "2022-01-01T00:00:00Z",
    "nombreEntidadColaboradora": "nombre"
  }
-->

Con fecha ${data.fechaPrevistaPago?datetime.iso?string.medium} se alcanzará la fecha prevista del pago al socio colaborador de la Universidad ${data.nombreEntidadColaboradora} 
en el proyecto ${data.titulo}  y aún no se ha registrado la fecha de realización de dicho pago.