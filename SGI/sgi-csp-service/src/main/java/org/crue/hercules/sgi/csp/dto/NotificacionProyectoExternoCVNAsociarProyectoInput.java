package org.crue.hercules.sgi.csp.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionProyectoExternoCVNAsociarProyectoInput implements Serializable {

  @NotNull
  private Long proyectoId;

}