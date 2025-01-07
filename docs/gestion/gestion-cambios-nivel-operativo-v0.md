

## Objetivo

El propósito de este documento es proporcionar un marco claro y estructurado para la gobernanza operativa y técnica del proyecto. Esto incluye definir roles y responsabilidades, pautas para la gestión del proyecto y directrices para coordinar despliegues que permitan asegurar que las contribuciones de la comunidad sean efectivas y que el desarrollo se mantenga alineado con sus objetivos originales.

Al establecer estas pautas, se busca garantizar que el proyecto se desarrolle de manera ordenada y sostenible, promoviendo la colaboración abierta y la transparencia.

Este documento servirá como guía para los colaboradores y mantenedores del proyecto.

**Repositorio** [Hercules\_SGI](https://github.com/HerculesCRUE/SGI)

## Gobernanza Operativa

### ****1. Gestión de tareas****

#### PROYECTO

Para el mantenimiento del SGI y la transparencia de los cambios se creará un proyecto por evolutivo en el propio repositorio de GitHub que incluirá todas las tareas que sean necesarias para su gestión.

* Nombre del proyecto SGI seguirá el formato

*SGI-\<abreviatura-universidad>-\<nombre-descriptivo>-YYYY-MM* *(año-mes)*

Se debe utilizar el proyecto [***Project\_Template\_SGI***](https://github.com/orgs/hercules-sgi/projects) como plantilla base para crear el proyecto.

Dicha plantilla se puede seleccionar cuando se crea el proyecto.

#### ****ETIQUETAS (LABELS)****

Dentro del apartado Issues, se dispone de etiquetas para clasificar las tareas. Una por componente dentro del SGI y genéricas:

* ***type: epic***: Serán tareas que incluyan las propuestas para un cambio del evolutivo. Son tareas que incluyen una agrupación de historias de usuario bajo un tema común.
* ***type: task***: Tareas concretas que en su conjunto formaran un evolutivo.
* ***type: bug***: Tareas que describen las incidencias o problemas encontrados.
* ***type: enhancement***: Tareas que describen una mejora general
* ***type: doucmentacion***: Tareas que requieren una actualización de documentación

[Labels ejemplo](https://github.com/orgs/hercules-sgi/labels/)

![](data:image/png;base64...)

Se debe crear al menos una etiqueta relativa al evolutivo que se va a desarrollar con el siguiente formato:

*sgi-\<abreviatura-universidad>-\<nombre-descriptivo>*

Y se permite crear nuevas etiquetas si con las ya existentes no se satisface la clasificación de las tareas del evolutivo.

#### ****TAREAS (ISSUES)****

En este apartado se indica como se pueden crear tareas ya sean Epics, Tasks o Bugs.

Cada historia de usuario deberá describir los cambios que se van a realizar y todas ellas podrán y deberán ser referenciadas en los commits del código para mantener la trazabilidad del proyecto.

**Templates de tareas**

Se deberá desglosar el evolutivo en Épicas (Epic) que faciliten la visualización de los objetivos del proyecto. Y de cada épica se deben crear tantas tareas *(Task)* como sean necesarias para completarla.

Y también se deben crear tareas (*Bug)* para cada problema o incidencia encontrado.

Para ello se dispone de plantillas predefinidas dentro del proyecto:

[ISSUE\_TEMPLATE](https://github.com/dialrepo/hercules-sgi/tree/main/.github/ISSUE_TEMPLATE/)

* Plantilla ![](data:image/png;base64...): plantilla-epic.md
* Plantilla ![](data:image/png;base64...): plantilla-task.md
* Plantilla ![](data:image/png;base64...): plantilla-bug.md

Además, cada tarea debe tener asociadas las etiquetas que estén relacionadas tanto del componente (módulo) como las que se hayan creado específicamente para el evolutivo de forma que podamos mantener la trazabilidad.

Las historias pueden tener menciones a personas @nombre\_persona en los comentarios y eso hace que se le envíe una notificación a dicha persona. Esto permite incluir dudas o comentarios relacionados.

[Plantillas ejemplo](https://github.com/dialrepo/hercules-sgi/issues/new/choose)


### ****2. Comunicaciones y Colaboración****

#### ****Herramientas de comunicación****

Para facilitar la comunicación y colaboración en el proyecto se ha habilitado dentro del propio repositorio de GitHub la opción [*Discussions*](https://github.com/dialrepo/hercules-sgi/discussions) como foro de comunicación colaborativa.

Podemos crear una publicación de bienvenida y anclarla a la página de GitHub [Discussions](https://github.com/dialrepo/hercules-sgi/discussions).



Y se puede disponer de canales ya creados por defecto.

Para sugerir nuevas ideas se puede crear un hilo de categoría “Ideas”:

![](data:image/png;base64...)

Para otras cuestiones se puede generar un hilo “General”

![](data:image/png;base64...)

Si necesitamos comunicar algo sobre una tarea concreta, como ya se ha indicado en apartados anteriores, si es algo sencillo se puede hacer indicando un comentario en la propia historia con una mención @nombre\_persona y eso hará que le llegue una notificación que podrá ser respondida de la misma forma.

El permiso para participar en debates o administrarlos se basa en el permiso en el repositorio de origen por lo que si el usuario dispone de acceso de escritura al repositorio también dispone de permisos para gestionar las discusiones.

#### ****Reuniones y Seguimiento****

Al inicio del evolutivo se establecerá la frecuencia y agenda de las reuniones de seguimiento del proyecto con objeto de supervisar la evolución y ejecución de este.

Se proponen reuniones quincenales, aunque se pueden mantener las que se consideren necesarias para incidencias que deban ser comentadas o cualquier otro tema que resulte de interés para la buena gestión del evolutivo.

Asimismo, se planificará como debe ser el proceso para la validación de los cambios que se vayan a incluir en el evolutivo a fin de asegurar la calidad del desarrollo realizado.
