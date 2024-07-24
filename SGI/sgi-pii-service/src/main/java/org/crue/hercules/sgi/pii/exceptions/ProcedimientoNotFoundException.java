package org.crue.hercules.sgi.pii.exceptions;

import org.crue.hercules.sgi.framework.problem.message.ProblemMessage;
import org.crue.hercules.sgi.framework.spring.context.support.ApplicationContextSupport;
import org.crue.hercules.sgi.pii.model.Procedimiento;

public class ProcedimientoNotFoundException extends PiiNotFoundException {
  /**
  *
  */
  private static final long serialVersionUID = 1L;

  public ProcedimientoNotFoundException(Long procedimientoId) {
    super(ProblemMessage.builder().key(PiiNotFoundException.class)
        .parameter("entity", ApplicationContextSupport.getMessage(Procedimiento.class)).parameter("id", procedimientoId)
        .build());
  }
}
