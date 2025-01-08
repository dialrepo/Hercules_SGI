
## Gobernanza Técnica

Se establece como normal general tener un repositorio del proyecto por componente que se mantendrán y actualizarán por la comunidad Hércules.  

El proyecto está basado en una arquitectura de microservicios que se desplegará en un clúster de kubernetes y contiene una carpeta por cada módulo que al compilar generará su propio pod con su propia versión. Esto permitirá la trazabilidad de las versiones concretas de cada servicio.

Los módulos de los que se compone se podrían dividir del siguiente modo:

 **BACK-END**

Modulos funcionales:

- sgi-csp-service

- sgi-eer-service

- sgi-eti-service

- sgi-pii-service

- sgi-prc-service

Modulos auxiliares:

- sgi-cnf-service

- sgi-com-service

- sgi-rel-service

- sgi-rep-service

- sgi-tp-service

- sgi-usr-service

Modulos comunes:

- sgi-auth

- sgi-starter-parent

- sgi-framework-spring

- sgi-esb

**FRONT-END**

- sgi-webapp

- sgi-framework-angular

- angular-material-components

A continuación, se detalla el proceso que deben seguir los colaboradores para trabajar en el proyecto, configurando su entorno local y gestionando cambios utilizando **Git** y **GitHub.**

### ****1. Requisitos para Entorno de Desarrollo****

Para poder realizar el desarrollo de modificaciones se requiere un entorno que disponga de lo siguiente: 

* Repositorio para alojar artefactos de maven y npm para dependencias node
* IDE puede ser Visual Studio Code o InterlIJ que deben tener instalados plugins de Spring Boot y Java.
* Node para el desarrollo de angular y una librería especifica que tienen angular-material-components.
* Cliente de GIT
* Soporte para el modelo de datos sería Postgresql u Oracle, aunque en desarrollo está configurado para utilizar H2. Los servicios del SGI se apoyan en Liquibase para la creación y mantenimiento del modelo de datos.

* Dockers para generar las imágenes de los contenedores
* Desplegar y configurar keycloak. Esto es necesario para que los servicios puedan contactar él y descargarse el certificado con el que se emiten los tokens ya que el back-end verifica si el token es válido o no para extraer de ahí los permisos.

https://github.com/dialrepo/Hercules\_SGI/blob/main/docs/tecnica/Config\_entorno\_dev\_Linux.md

### ****2. Flujo de Trabajo en GitHub****

Antes de comenzar a trabajar, debes realizar una configuración inicial en tu entorno local. En los pasos a continuación, se utilizan los siguientes términos clave:

* ***local***: Es una copia del proyecto **SGI** en tu equipo local. Aquí debes realizar tus cambios.
* ***origin***: Es tu copia personal del repositorio SGI en GitHub (tu ***fork***). Este repositorio será el origen de tu copia ***local***.
* ***upstream***: Es el repositorio principal del proyecto SGI en GitHub. Debes realizar un ***fork*** de este repositorio en tu cuenta personal de GitHub para obtener tu propio ***origin***.

El repositorio de GitHub para comenzar cualquier desarrollo se encuentra en esta ruta:

<https://github.com/HerculesCRUE/SGI>

#### ****Pasos para configurar el entorno****

1. Para trabajar en GIT es necesario tener GIT instalado en tu equipo y debes tener una cuenta en GitHub.

    (Este paso será opcional si ya se dispone de una)

2. Configura el nombre y correo electrónico como variables globales de Git:

    (Este paso será opcional si ya está configurado)

```sh
git config --global user.name "nombre"
git config --global user.email* *micorreo@ejemplo.com
```

3. **Hacer** [FORK](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) **del repositorio a tu cuenta de github:** <https://github.com/HerculesCRUE/SGI>
4. ***Clonar* el repositorio** (tu **origin**)

```sh
git clone https://github.com/HerculesCRUE/SGI.git
```

5. **Añadir el repositorio principal como *remoto* para recibir actualizaciones del *upstream repository***

```sh
git remote add upstream https://github.com/HerculesCRUE/SGI.git
```

6. Mantén tu copia local sincronizada con el repositorio principal, sigue estos pasos regularmente:

```sh
git checkout main # Cambia a la rama principal local
git pull upstream main # Descarga los últimos cambios del repositorio principal
git push origin main # Actualiza tu repositorio personal en GitHub
```

#### ****Flujo de trabajo para contribuir****

La rama ***MAIN local*** será la principal y debe reflejar siempre el estado del repositorio principal (**upstream**). **No trabajes en esa rama.**

7. **Crear una rama para desarrollar cada funcionalidad con el siguiente formato** SGI-\<nombre-universidad>-\<evolutivo>

```sh 
git checkout -b SGI-<nombre-universidad>-<evolutivo>
```

8. En este punto se deben realizar los cambios oportunos para desarrollar el evolutivo que deben incluir test por defecto e ir realizando “commit” en dicha rama.

    Hay que tener en cuenta que en cada commit de código se debe hacer referencia al id o ids de la tarea o tareas *(Ejemplo: #123)* para que los cambios queden relacionados y permitir la trazabilidad.


```sh 
git add .* # *Incluye todos los cambios
git commit -m "#123 componente y breve descripción de los cambios" # realiza commit todos los cambios
git push origin <nombre-rama> # Sube la rama al repositorio remoto
```

9. Crear Pull Request *(PR)*

    Para compartir los cambios y que puedan ser revisados por los mantenedores del código será necesario [crear una ***PULL REQUEST***](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)desde la rama que acabas de subir hacia la rama ***main*** del repositorio principal (***upstream***).

    Está debe nombrarse con el siguiente formato:

    \<nombre-universidad>-\<evolutivo>-\<titulo-del-cambio>

    En la descripción deberá incluir un texto con los cambios realizados utilizando el marcado markdown.

    [Guía básica MARK\_DOWN](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/usuario/MARK_DOWN.md)

#### ****Ciclo de revisión de Pull Request****

10. **En este paso se tratan los comentarios recibidos de la PR y se deben realizar los cambios oportunos.**

    Solo si es necesario se abrirá un hilo de [*Discussions*](https://github.com/dialrepo/Hercules_SGI/discussions)si se necesita comentar antes de realizar las sugerencias o los cambios solicitados en la PR.

    Si se deben realizar ajustes, será quien está realizando el evolutivo quien debe volver a modificar lo necesario en su fork, volver a pasar los tests y debe actualizarse la ***PR*** cuando considere terminados ajustes.

    Los pasos deberían ser:

    + Asegúrate de estar en la rama en la que trabajaste
    ```sh 
    git checkout <nombre-rama>
    ```
    + Realiza cambios o mejoras y añádelos
    ```sh 
    git add .
    ```
    + Para un commit nuevo usa

    ```sh 
    git commit -m "#123 Breve descripción de los cambios"*
    ```
      O para un commit existente

    ```sh 
    git commit --amend -C HEAD*
    ```
    + Sube los cambios a tu rama. Con commit nuevo usa

    ```sh 
    git push origin <nombre-rama>*
    ```
      O para un commit existente

    ```sh 
    git push -f origin <nombre-rama>*
    ```

    + Y por último escribe un comentario en el PR para notificar que has realizado los cambios solicitados

#### ****Estándares de desarrollo y configuración****

La documentación relacionada se encuentra en [enlace de documentación del proyecto.](https://confluence.um.es/confluence/pages/viewpage.action?pageId=597853531)

### ****3. Versionado y TAGs****

Se utilizará versionado semántico siguiendo el formato X.Y.Z (mayor.menor.parche) que se corresponde con lo siguiente:

* **X** se incrementará cuando se realicen cambios importantes y mejoras.
* **Y** se incrementará cuando se realicen pequeños cambios y/o corrección de errores.
* **Z** se incrementará cuando se trate de alguna corrección que implica pocos cambios, pequeños parches.

Cada *Release* tendrá asociada su propia versión, creando una etiqueta *(Tag)* con el número de versión con el siguiente formato ***v.X.Y.Z*** (véase apartado de [Gestión de Release](#_4._Gestión_de))

Siempre que sea posible deben mostrarse ordenadas de forma que siempre esté al inicio la versión más reciente.

### ****4. Gestión de Releases****

#### ****Ciclo de vida de RELEASES****

Se generará una [*Release*](https://github.com/HerculesCRUE/SGI/releases) con cada nueva versión publicada teniendo en cuenta lo siguiente:

* La versión a publicar debe mostrarse como la más reciente del repositorio, para ello habrá que agregar ***/latest*** al final de la dirección URL del repositorio.
* Se creará una etiqueta con el formato ***vX.Y.Z*** (más detalle consultar apartado de [Versionado](#_3._Versionado_y))
* El campo título seguirá el formato ***SGI\_X.Y.Z*** (más detalle consultar apartado de [Versionado](#_3._Versionado_y))
* El campo descripción se completará con formato markdown y debe incluir:
  + Enlace al fichero *changelog.md* que tiene el detalle de cambios.

    Este fichero debe incluir el detalle con la instalación que sea requerida con la nueva versión y toda la información relevante para que la nueva versión puede ser funcional.

    (ver apartado siguiente [*CHANGELOG*](#_Notas_de_cambios)).

  + Listado de cambios con las *issues* (tareas) relacionadas y mención a los usuarios que han contribuido
  + Enlace al Full Changelog donde se visualiza la comparativa de cambios de código entre la versión anterior y la actual

    **Ejemplo** [Comparar cambios versión 20240621 con 20240715](https://github.com/HerculesCRUE/SGI/compare/20240621...20240715)

#### ****Notas de cambios (CHANGELOG)****

Se tiene que crear un fichero genérico por Release y uno por componente modificado donde se indiquen los cambios realizados y cuyos nombres debe tener este formato *v<numero\_version\_realese\_x.y.z>.md*

* Changelog genérico se encuentra en la carpeta del proyecto: https://github.com/HerculesCRUE/SGI/tree/main/changelog

Y en dicho fichero se deberá indicar:

* Nombre y versión del SGI + Fecha en la que se ha realizado con el formato YYYY-MM-DD (año-mes-día)
* Listado de módulos con las versiones que componen la nueva versión y cada componente con su enlace a su changelog de versión
* Instrucciones para despliegue de nueva versión:
  + Scripts que se necesitan de actualización de bbdd
  + Donde están las imágenes de docker actualizadas
  + Si se requiere alguna dependencia adicional
  + Y toda la información que sea relevante para que la nueva versión puede ser funcional.
* Changelog por componente se encuentra en una carpeta con el mismo nombre en cada componente.
  + Nombre y versión del componente + Fecha en la que se ha realizado con el formato YYYY-MM-DD (año-mes-día)
  + Detalles de los cambios con las issues relacionadas
  + Donde esta las imágenes de docker actualizadas del componente
  + Y la información que se considere relevante.



