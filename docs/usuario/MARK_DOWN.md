# MARK DOWN
Markdown es un lenguaje de formateo ligero para dar formato en la plataforma GitHub.
Esto se hace dando formato a las palabras para hacerlas negritas o itálicas, agregar imágenes, o creando listas. En general, Markdown es sólo un texto normal que incluye algunos caracteres como # o *.

Sintaxis básica
Aquí un resumen de la sintaxis de Markdown que puedes utilizar:
Encabezados
# Este es una etiqueta <h1>
## Este es una etiqueta <h2>
###### Este es una etiqueta <h6>
Énfasis
*Este texto estará en itálica*
_Este texto también estará en itálica_

**Este texto estará en negritas**
__Este texto también estará en negritas__

*Incluso **puedes** combinarlos*
Listas
Desordenadas
* Item 1
* Item 2
    * Item 2a
    * Item 2b
Ordenadas
1. Item 1
2. Item 2
3. Item 3
    * Item 3a
    * Item 3b

Links
1. http://github.com - ¡link automático!

2. [GitHub](http://github.com)

Citas
Esto es un párrafo normal:

> Y aquí está la cita que puede
> seguir en varios renglones, y tener anidado más
> > citas así, con un doble signo mayor-que.

Código en-línea
Creo que debería utilizar una etiqueta `<addr>` aquí.

Y además de la sintaxis básica, en Github existe GitHub Flavored Markdown (GFM)
GFM
GitHub Flavored Markdown (GFM). GitHub utiliza su propia versión de sintaxis Markdown que provee un conjunto de características adicionales, aunque algunas de las características de GFM sólo están disponibles para las descripciones y comentarios de issues y Pull Requests. Estos incluyen @menciones así como referencias a Issues, y Pull Requests. 
Aquí un ejemplo de como puede utilizar el resaltado de sintaxis GitHub Flavored Markdown:
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```
También puedes simplemente identar tu código con cuatro espacios:
Se mostraría de esta forma:

    function fancyAlert(arg) {
        if(arg) {
            $.facebox({div:'#foo'})
        }
    }
Lista de Tareas
- [x] Soporte de @menciones, #referencias, [link_Github](https://github.com/), **formateo**, y de <del>etiquetas</del>
- [x] lista de sintaxis requerida (cualquier lista des-ordenada y ordenada es soportada)
- [x] esta es una tarea completa
- [ ] esta es una tarea incompleta
Se mostrará así:
Referencias Issue dentro de un repositorio
Cualquier número que refiera a un Issue o Pull Request será automáticamente convertido en un link. Ejemplo: #1
@menciones a nombre-de-usuario
Escribiendo un símbolo de @, seguido del nombre-de-usuario, notificará a esa persona para que venga y vea el comentario. Esto es conocido como "@mención".
Links automáticos para URLs
Cualquier URL (como http://www.github.com/) será automática convertido en un link navegable.
Tachado
Cualquier texto que este encerrado entre dos tildes (así ~~esto~~) aparecerá tachado, así: 


Referencia a la documentación de como escribir en github:
https://docs.github.com/es/get-started/writing-on-github
