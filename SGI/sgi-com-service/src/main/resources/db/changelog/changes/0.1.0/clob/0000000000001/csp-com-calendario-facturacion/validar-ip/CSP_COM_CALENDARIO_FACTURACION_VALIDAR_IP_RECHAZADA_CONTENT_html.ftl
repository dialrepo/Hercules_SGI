<#assign data = CSP_COM_CALENDARIO_FACTURACION_VALIDAR_IP_RECHAZADA_DATA?eval />
<#--
  Formato CSP_COM_CALENDARIO_FACTURACION_VALIDAR_IP_RECHAZADA_DATA:
  { 
    "nombreApellidosValidador": "Manolo Gutierrez Fernandez",
    "tituloProyecto": "Proyecto 1",
    "codigosSge": ["00001", "000002"],
    "numPrevision": 2,
    "motivoRechazo": "motivo rechazo"
  } 
-->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <p>El/La investigador/a <b>${data.nombreApellidosValidador}</b>, responsable del contrato titulado <b>${data.tituloProyecto}</b> <br/>
    asociado al/los proyectos con código/s 
    <b><span>
    <#list data.codigosSge?chunk(4) as row>
      <#list row as cell>${cell} </#list>
    </#list>
    </span></b>, no ha dado su conformidad para la emisión de la factura nº <b>${data.numPrevision}</b> por el siguiente motivo: <b>${data.motivoRechazo}</b>.</p>

  </body>
</html>
