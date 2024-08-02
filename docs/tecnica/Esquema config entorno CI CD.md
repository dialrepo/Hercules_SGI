### Esquema de posible configuración entorno CI/CD

**Pasos previos**
* Tener configurada una cuenta de azure
* Tener configurado azure CLI en una máquina virtual con kubectl

Para este paso hay que tener creada una VM en Azure quese puede haber usado el portal y configurado kubectl y az:

     * Instalar Azure CLI
     ```sh
     curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
     ```
     * Iniciar sesión en Azure
     ```sh
     az login
     ```
     * Instalar kubectl
     ```sh
     az aks install-cli
     ```
     * Configurar kubectl para acceder al clúster
     ```sh
     az aks get-credentials --resource-group <your-resource-group> --name <your-cluster-name>
     ```


* Tener configurado el cluster de Aks
Más detalle en el documento _Config_despliegue_kubernetes_AKS.md_
   -- Si queremos persistencia habrá que realizar más pasos de configuración

* Tener servidor SonarQube configurado y accesible, y de que el proyecto en SonarQube esté configurado correctamente en la pipeline


**Compilar y desplegar el proyecto de SGI de Github**
* Configurar  una pipeline GitHub Actions para generar las imágenes de Docker y subirlas a DockerHub.
     - Debe incluir la compilación y generación de imágenes teniendo en cuenta que orden de compilación tiene que ser primero _sgi-starter-parent_ después _sgi-framework-spring_ y a continuación el resto de módulos.
     - Hay que agregar los secretos en GitHub (Settings > Secrets > Actions) que requieras según el fichero .yaml
* Los test maven deberían ejecutarse sin errores
* Si todo es ok generar las imágenes de Docker
* Desplegar las imágenes en DockerHub

**Compilar y desplegar el cluster de kubernetes**
* En el proyecto de Helm habría que crear un workflow de GitHub Actions que se ejecute cuando las imágenes Docker se actualicen. Esto se podría hacer configurando una acción programada que verifique periódicamente si las imágenes de dockerhub han cambiado y en tal caso programar una pipeline para desplegar los cambios en el cluster.











