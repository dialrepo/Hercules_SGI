package org.crue.hercules.sgi.eti.repository;

import org.crue.hercules.sgi.eti.model.TipoActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository para {@link TipoActividad}.
 */

@Repository
public interface TipoActividadRepository
    extends JpaRepository<TipoActividad, Long>, JpaSpecificationExecutor<TipoActividad> {

}