## Configuración y despliegue de cluster de kunbernetes DEV en Azure desde el portal de Azure
A continuación se indican los pasos para realizar un despliegue del cluster de kubernetes del sgi en Azure

El proyecto de GITHub para descargar el código del SGI-HELM se encuentra en estar ruta:
https://github.com/hercules-sgi/sgi-helm

## _Requesitos previos_
* Tener una cuenta en Azure

### Conectarse a la suscripción y crear un cluster
![crear_cluster](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/Crear_cluster_portal_azure.jpg)

Se deben configurar los datos. Aquí se muestran los del cluster demo creado para el sgi:

### Datos básicos 
- Suscripción: Pay-As-You-Go 
- Grupo de recursos: grupo_recursos_aks 
- Región: Spain Central 
- Nombre del clúster de Kubernetes: sgi_demo 
- Versión de Kubernetes: 1.29.7 
- Actualización automática: none 
- Programador de actualización automática: - 
- Tipo de canal de seguridad de nodo: None 
- Programador de canal de seguridad: - 

### Grupos de nodos 
- Grupos de nodos: 1 
- Habilitar nodos virtuales: Deshabilitada 

### Acceso 
- Identidad del recurso: System-assigned managed identity 
- Cuentas locales: Habilitado 
- Autenticación y autorización: Cuentas locales con RBAC de Kubernetes 
- Tipo de cifrado: (Predeterminado) Cifrado en reposo con una clave administrada por la plataforma 

### Redes 
- Clúster privado: Deshabilitada 
- Intervalos IP autorizados: Deshabilitada 
- Configuración de red: Superposición de Azure CNI 
- Prefijo de nombre DNS: sgi-demo 
- Directiva de red: Ninguno 
- Equilibrador de carga: Standard 

### Integraciones 
- Microsoft Defender for Cloud: Free 
- Registro de contenedor: Ninguno 
- Malla de servicio: Deshabilitada 
- Azure Policy: Deshabilitada 

### Supervisión 
- Habilitar registros de contenedor: Deshabilitada 
- Habilitar métricas de Prometheus: Deshabilitada 
- Habilitar Grafana: Deshabilitada 
- Alertas: Deshabilitada 

### Avanzado 
- Grupo de recursos de infraestructura: MC_grupo_recursos_aks_sgi_demo_spaincentral 

### Etiquetas 
- Ninguno 

## _Conectar al cluster y desplegar la aplicación_

* Conectar al cluster desde la ventana de comandos
  ```sh
  az login
  ```

  Este paso abre un navegador e indica que te lo logees con la cuenta de azure. Haces login en el navegador y si todo va bien cierras la ventana y regresas a la ventana de línea de comandos.
  Ahora se muestran las suscripciones disponibles y se debe seleccionar la que corresponda.

* Comando para establecer la suscripción del clúster
  ```sh
  az account set --subscription <numero de la subscripcion>
  ```

* Configurar kubectl para acceder a tu clúster 
  ```sh
   az aks get-credentials --resource-group grupo_recursos_aks --name sgi_demo --overwrite-existing
  ```

* Se pueden consultar los contextos y ver el actual
  ```sh
  kubectl config get-contexts
  kubectl config current-context
  ```

## _Configuración Ingress_
  * Aplicamos la configuración para el Ingress para acceder a la aplicación externamente
  ```sh
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
  ```

## _Desplegar aplicación con Helm_

* Navegamos a la carpeta donde se haya descargado el repositorio y tengas el proyecto 

* Configurar Helm (solo para la primera vez):
```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm dependency update  ./charts/sgi-umbrella/
helm package  ./charts/sgi-umbrella/
```
Esto genera un paquete **sgi-umbrella-x.x.x.tgz** que usaremos para desplegar

* Crear un namespace
```sh
kubectl create namespace sgi-demo
```
Y adicionalmente se recomienda ejecutar este comando ya que configura el contexto actual de kubectl para usar el namespace sgi-demo de forma predeterminada
```sh
kubectl config set-context --current --namespace=sgi-demo
kubectl config set-context --current --namespace=sgi-demo
```

* Desplegar la aplicación usando **sgi-umbrella-x.x.x.tgz**  (actualizar o instala un chart en el cluster)

```sh
helm upgrade sgi sgi-umbrella-0.1.46.tgz --install --namespace sgi-demo -f ./config/values.demo.yaml
```
_sgi_: es el nombre del release en Helm
_--install_: Este flag indica que, si el release sgi no existe, Helm debe instalarlo en lugar de simplemente actualizar un release existente.
_sgi-umbrella-0.1.46.tgz_: es el paquete del Chart de Helm que se va a usar para la actualización/instalación y contiene todos los recursos para desplegar el sgi.
_--namespace sgi-demo_: especifica el namespace donde se debe instalar o actualizar el release.
_values.demo.yaml_:fichero de configuración del chart sgi-umbrella

* Obtener la IP pública 
  Para acceder desde fuera del clúster, obtenemosla IP pública asignada ejecutando el siguiente comando:
  ```sh
  kubectl get ing
  ```
  
* Añadimos el dominio con la IP pública en el fichero de hosts
  x.x.x.x demo-2.hercules-sgi.local o la url que se haya indicado en el fichero _values.demo.yaml_

## _Verificar el despliegue_

* Revisar los Pods en el namespace
```sh
kubectl get pods --namespace sgi-demo
```

## _Deshabilitar en keycloak las peticiones https_
Con este comando podemos acceder al panel y deshabilitar para master y para sgi la opción _require ssl_
```sh
kubectl port-forward <pod_del_keycloack> 8080:8080 -n sgi-demo
```
![modificar_keycloack](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/modificar_keycloak.jpg)

## _Comprobar el acceso al portal_
![acceso_sgi](https://github.com/dialrepo/Hercules_SGI/blob/main/docs/img/acceso_sgi.jpg)

