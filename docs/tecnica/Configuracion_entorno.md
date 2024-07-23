## Configuración del Entorno de Desarrollo
A continuación se indican los pasos para configurar el entorno de desarrollo:

1. Descargar el proyecto de GITHub
https://github.com/HerculesCRUE/SGI

2. Abrir el proyecto y realizar la compilación de estos dos paquetes en este orden:
    * sgi-starter-parent
    * sgi-framework-sprint → Este artefacto es necesario para todos los servicios
Una vez realizado este paso, se deben compilar el resto de módulos.

3. En este punto, pasada la fase de compilación, es necesario configurar en cada módulo la url  del keycloak dentro del fichero aplication.yaml en el profile activo por defecto.

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_keycloak.jpg)
    * El módulo de ética depende de otros servicios por lo que será necesario configurar las urls correspondientes a los endpoints de comunicación interna para que apunten a los servicios del entorno de IC que tengamos levantado o localhost si lo tenemos levantado en local. 

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_eti.jpg)
    * El módulo de comunicación al igual que el de ética depende de otros servicios por lo que es necesario configurar las urls correspondientes y además si se necesita que la parte de envío de email funcione correctamente se debe configurar los datos del servidor de correo.   

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_com.jpg)
    * TO DO:  revisar si hay más módulos especiales.
    
4. Configuración de base de datos → por defecto se levanta una base de datos H2 y se carga el esquema de liquibase. Por lo que si se requiere otra base de datos será necesario configurar en la parte del fichero para tal efecto.

A partir de aquí se indican detalles de FrontEnd:

5. TO DO

Más información se puede consultar el vídeo https://tv.um.es/video?id=146733.
