### Esquema de posible configuración entorno CI/CD

**Pasos previos**

* Tener configurada una cuenta de azure para el cluster de kubernetes

* Tener una servidor local o una máquina virtual. Si es este segundo se puede crear una VM en Azure usando el portal.
Además se requiere tener instalado:
    - SO Linux
    - Git
    - JDK y Maven para Java.
    - Soporte para el modelo de datos sería Postgresql u Oracle
    - Node para el desarrollo de angular y una librería especifica que tienen angular-material-components.
    - Make para ficheros Makefiles
    - Dockers (Para la gestión de los contenedores)
    
Y para el Cluster de Aks
    - Kubectl (Para la gestión del clúster de Kubernetes)
    - Helm
    - Cluster de Kubernetes ( ver más detalle en el documento _Config_despliegue_kubernetes_AKS.md_ )
    - Azure CLI -- > Para este paso se puede configurado kubectl y az:

     * Instalar Azure CLI
     ```sh
     curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
     ```
     
* Tener SonarQube configurado y accesible, y de que el proyecto en SonarQube esté configurado correctamente en la pipeline


**Compilar y desplegar el proyecto de SGI de Github**
* Configurar  una pipeline GitHub Actions para generar las imágenes de Docker y subirlas a DockerHub.
     - Debe incluir la compilación y generación de imágenes teniendo en cuenta que orden de compilación tiene que ser primero _sgi-starter-parent_ después _sgi-framework-spring_ y a continuación el resto de módulos.
     - Hay que agregar los secretos en GitHub (Settings > Secrets > Actions) que requieras según el fichero .yaml
* Los test maven deberían ejecutarse sin errores
* Si todo es ok generar las imágenes de Docker
* Desplegar las imágenes en DockerHub

**Compilar y desplegar el cluster de kubernetes**
* En el proyecto de Helm habría que crear un workflow de GitHub Actions que se ejecute cuando las imágenes Docker se actualicen. Esto se podría hacer configurando una acción programada que verifique periódicamente si las imágenes de dockerhub han cambiado y en tal caso programar una pipeline para desplegar los cambios en el cluster.











