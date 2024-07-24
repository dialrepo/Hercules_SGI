## Configuración del Entorno de Desarrollo Linux
A continuación se indican los pasos para configurar el entorno de desarrollo

El proyecto de GITHub para descargar el código del SGI se encuentra en estar ruta:
https://github.com/HerculesCRUE/SGI

## _Requesitos previos_
* Tener configurado un Keycloak

## _Visual Studio Code_

**BACKEND**

Previo al código se deben instalar los pluggins de spring boot y java y maven

* Se necesita tener instalado maven para la parte del backend
```sh
sudo apt install maven
```
* Incluir pluggins en VSCode
![pluggintjavavs](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/pluggintjavavs.jpg)
![pluggintspvs](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/pluggintspvs.jpg)

Como no hay un nexus, nos apoyamos en el repositorio local y hay que tener cuidado con el orden de construcción:
2. Compliar el módulo sgi-starter-parent
```sh
cd sgi-starter-parent
mvn clean install
```
3. Compliar el módulo sgi-framework-spring
```sh
cd sgi-framework-spring
mvn clean install
```
Este artefacto es necesario para todos los servicios.

4. Compliar el resto de módulos
```sh
cd sgi-csp-service
mvn clean compile
```

5. Configuración de cada módulo
* En este punto, pasada la fase de compilación, es necesario configurar en cada módulo la url  del keycloak dentro del fichero _application.yml (src/main/resources)_ en el profile activo por defecto.

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_keycloak.jpg)
En el profile de dev lo que aparece es el ajuste de log.
El resto de valores no sería necesario cambiarlos porque por defecto levanta una propia bbdd h2 y esto de inicio carga los changeset, los cambios de liquibase, crearía el esquema de bbdd, etc. Si se requiere utilizar otra bbdd sería necesario realizar los ajustes de la conexión jdbc, driver, usuario y contraseña, dialecto y esquema. 

Hay otros módulos que tienen algo más de configuración:
   5.1 El módulo de ética depende de otros servicios por lo que será necesario configurar las urls correspondientes a los endpoints de comunicación interna para que apunten a los servicios del entorno de IC que tengamos levantado o localhost si lo tenemos levantado en local. 

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_eti.jpg)

   5.2 El módulo de comunicación al igual que el de ética depende de otros servicios por lo que es necesario configurar las urls correspondientes y además si se necesita que la parte de envío de email funcione correctamente se debe configurar los datos del servidor de correo.   

![config_keycloak](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_com.jpg)

   5.3 TO DO:  revisar si hay más módulos especiales.
    
6. Configuración de base de datos → por defecto se levanta una base de datos H2 y se carga el esquema de liquibase. Por lo que si se requiere otra base de datos será necesario configurar en la parte del fichero para tal efecto.

Para cambios de bbdd sería necesario la carpeta db en _./target/db_ y al volver a arrancarlos para que se refresquen los cambios.

**FRONTEND**

Previo al código:
* Instalar node, npm y ng y angular CLI si aun no está instalado localmente en tu proyecto
```sh
sudo apt install nodejs
sudo apt install npm
npx ng --version
node -v
npm -v
npx ng --version
```

```sh
npm install @angular/cli --save-dev
```

7. Compilar el proyecto sgi-framework-angular:
```sh
(Variable de entorno que incluimos para que no falle la compilación por las versiones de node)
export NODE_OPTIONS=--no-experimental-fetch
(npx es para utilizar las dependencias del proyecto y no de una que pueda estar instalada de forma global)
npx ng build --prod
npm install
```
8. Tendremos que publicar el sgi-framework-angular para poder hacer un
```sh
npm install de sgi-webapp
```


9. El frontend principalmente está en sgi-webapp y para poder levantarlo hay que tocar el fichero _proxy.conf.json_ y valores de _environments.ts_
* Del _environments.ts_ hay que configurar la url del keycloak
![config_keycloak_env](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/config_keycloak_env.jpg)
* Del _proxy.conf.json_ hay que configurar las urls de las apis de integración. 
![proxy_conf_json](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/proxy_conf_json.jpg)

Para depurar y pruebas necesitamos tener levantado un navegador para que vscode se conecte con el navegador y permita la depuración

Más información se puede consultar el vídeo https://tv.um.es/video?id=146733.
