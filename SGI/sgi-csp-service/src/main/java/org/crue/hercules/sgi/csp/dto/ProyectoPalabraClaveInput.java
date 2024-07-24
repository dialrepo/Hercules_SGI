package org.crue.hercules.sgi.csp.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.crue.hercules.sgi.csp.model.ProyectoPalabraClave;

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
public class ProyectoPalabraClaveInput {

  @NotNull
  private Long proyectoId;

  @NotNull
  @Size(max = ProyectoPalabraClave.REF_LENGTH)
  private String palabraClaveRef;
}
