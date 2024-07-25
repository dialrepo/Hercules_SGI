## Configuración y despliegue de cluster de kunbernetes DEV en Azure desde Linux
A continuación se indican los pasos para realizar un despliegue del cluster de kubernetes del sgi en Azure

El proyecto de GITHub para descargar el código del SGI-HELM se encuentra en estar ruta:
https://github.com/hercules-sgi/sgi-helm

## _Requesitos previos_
* Tener una cuenta en Azure

https://learn.microsoft.com/es-es/azure/aks/quickstart-helm?tabs=azure-cli

## _Configuración del entorno_
* Instalar **Helm**
https://helm.sh/docs/intro/install/

```sh
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

Lo comprobamos
```sh
helm version
```

* Instalar **Kubectl**
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

Descargamos la última versión x86
```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Instalamos Kubectl
```sh
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Lo comprobamos
```sh
kubectl version
```

* Instalar la **CLI de Azure** es a través de un script mantenido por el equipo de la CLI de Azure
https://learn.microsoft.com/es-es/cli/azure/install-azure-cli-linux?pivots=apt

```sh
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

Lo comprobamos
```sh
az
```

## _Crear el clúster de Kubernetes en Azure (AKS)_

El nombre del registro debe ser único dentro de Azure y contener entre 5 y 50 caracteres alfanuméricos. Solo están permitidos los caracteres en minúscula. La SKU básica es un punto de entrada optimizado para costo con fines de desarrollo que proporciona un equilibrio entre almacenamiento y rendimiento

Para desplegar el cluster de kubernetes hay que configurar ciertos ficheros:

* Inicia sesión en Azure
```sh
az login
```

Este paso abre un navegador e indica que te lo logees con la cuenta de azure. Haces login en el navegador y si todo va bien cierras la ventana y en la ventana de línea de comandos pulsas enter y continuas. 

* Cree un grupo de recursos de Azure.
En el ejemplo siguiente, se crea un grupo de recursos denominado resourceGroupAks en la ubicación westeurope (esta debería ser la más cercana a nuestra localidad).
```sh
az group create --name resourceGroupAks --location westeurope
```
Obtendremos una respuesta como esta
{
  "id": "/subscriptions/d8d059d3-fd4d-4b00-8126-2457bf1ba422/resourceGroups/resourceGroupAks",
  "location": "westeurope",
  "managedBy": null,
  "name": "resourceGroupAks",
  "properties": {
    "provisioningState": "Succeeded"
  },
  "tags": null,
  "type": "Microsoft.Resources/resourceGroups"
}

* Si no hay capacidad se puede crear en otra zona: northeurope
```sh
az group create --name resourceGroupAksNE --location northeurope
```
{
  "id": "/subscriptions/d8d059d3-fd4d-4b00-8126-2457bf1ba422/resourceGroups/resourceGroupAksNE",
  "location": "northeurope",
  "managedBy": null,
  "name": "resourceGroupAksNE",
  "properties": {
    "provisioningState": "Succeeded"
  },
  "tags": null,
  "type": "Microsoft.Resources/resourceGroups"
}
lmat


Se puede comprobar también con este comando: **az group show --name resourceGroupAks**

* Crear el clúster de AKS
```sh
az aks create --resource-group resourceGroupAks --name clusterSgiDev --node-count 1 --enable-addons monitoring --generate-ssh-keys --location westeurope
```
Te muestra una salida como esta:
SSH key files '/home/lmatarrubia/.ssh/id_rsa' and '/home/lmatarrubia/.ssh/id_rsa.pub' have been generated under ~/.ssh to allow SSH access to the VM. If using machines without permanent storage like Azure Cloud Shell without an attached file share, back up your keys to a safe location
Resource provider 'Microsoft.OperationalInsights' used by this operation is not registered. We are registering for you.

Si muestra este error:
_Conflict({"error":{"code":"MissingSubscriptionRegistration","message":"The subscription is not registered to use namespace 'microsoft.insights'. See https://aka.ms/rps-not-found for how to register subscriptions.","details":[{"code":"MissingSubscriptionRegistration","target":"microsoft.insights","message":"The subscription is not registered to use namespace 'microsoft.insights'. See https://aka.ms/rps-not-found for how to register subscriptions."}]}})_

Hay que realizar este paso adicional: 
    
* Registrar el proveedor de recursos microsoft.insights
```sh
az provider register --namespace microsoft.insights
```
  
* Verificar la registración del proveedor de recursos
```sh
az provider show --namespace microsoft.insights --query "registrationState"
```

Y una vez haya funcionado se puede volver a intentar crear el cluster.

* O si no hay capacidad se puede crear en otra zona: northeurope
```sh
az aks create --resource-group resourceGroupAksNE --name clusterSgiDev --node-count 1 --enable-addons monitoring --generate-ssh-keys --location northeurope
```

Se podrá comprobar también con este comando: **az aks list --resource-group resourceGroupAks -o table**

* Conectar kubectl al clúster de AKS.
En el comando siguiente, se obtienen las credenciales de acceso del clúster de AKS llamado clusterSgiDev en ese grupo de recursos resourceGroupAksNE
```sh
az aks get-credentials --resource-group resourceGroupAksNE --name clusterSgiDev
```
* Se pueden consultar los contextos y ver el actual
```sh
 kubectl config get-contexts
 kubectl config current-context
```

## _Desplegar aplicación con Helm_

* Navegamos a la carpeta donde se haya descargado el repositorio y tengas el proyecto 

* Configurar Helm (solo para la primera vez):
```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm dependency update ./charts/sgi-umbrella/
helm package  ./charts/sgi-umbrella/
```
Esto genera un paquete **sgi-umbrella-x.x.x.tgz** que usaremos para desplegar

* Crear un namespace
```sh
kubectl create namespace sgi-dev
```
kubectl config set-context --current --namespace=sgi-dev
Este comando es opcional ya que configura el contexto actual de kubectl para usar el namespace sgi-dev de forma predeterminada.

* Desplegar la aplicación usando **sgi-umbrella-x.x.x.tgz**  (actualizar o instala un chart en el cluster)

```sh
helm upgrade sgi sgi-umbrella-0.1.46.tgz --install --namespace sgi-dev -f ./config/values.demo.yaml
```
_sgi_: es el nombre del release en Helm
_--install_: Este flag indica que, si el release sgi no existe, Helm debe instalarlo en lugar de simplemente actualizar un release existente.
_sgi-umbrella-0.1.46.tgz_: es el paquete del Chart de Helm que se va a usar para la actualización/instalación y contiene todos los recursos para desplegar el sgi.
_--namespace sgi-dev_: especifica el namespace donde se debe instalar o actualizar el release.
_values.demo.yaml_:fichero de configuración del chart sgi-umbrella


## _Verificar el despliegue_

* Revisar los Pods en el namespace
```sh
kubectl get pods --namespace sgi-dev
```

* Revisar los servicios
```sh
kubectl get svc --namespace sgi-dev
```

## _Acceso a la aplicación_
* Configurar el acceso a la aplicación:

Dependiendo de la configuración de tu Chart de Helm, puede que necesites configurar un Ingress Controller o un LoadBalancer para acceder a la aplicación externamente.
En este caso hemos probado con un  Ingress Controller 

## _Instalar un Ingress Controller en AKS_
  
  * Añadir el repositorio de Helm para NGINX Ingress Controller
  ```sh
  helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
  helm repo update
  ```
  
  * Instalar el Ingress 
  ```sh
  helm install nginx-ingress ingress-nginx/ingress-nginx \
    --namespace ingress-basic \
    --create-namespace
  ```
  Esto instalará el NGINX Ingress Controller en el namespace ingress-basic.
  
  Una vez está instalado necesitamos configurar un recurso Ingress que defina cómo el tráfico debe ser enrutado a los servicios:
  * Crear un archivo de configuración de Ingress ingress.yaml con el siguiente contenido:
  ```javascript
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: my-app-ingress
    namespace: my-namespace
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
  spec:
    rules:
    - host: dev.hercules-sgi.local
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: sgi-webapp
              port:
                number: 80
  ```
  
  name: sgi-ingress
  namespace: sgi-dev (namespace que se ha creado para la aplicación kubectl)
  host: tu dominio del cluster
  name: el nombre del servicio Kubernetes
  
  * Y aplicamos la configuración
  ```sh
  kubectl apply -f ingress.yaml
  ```
  
  * Obtener la IP pública del Ingress Controller
  Para acceder desde fuera del clúster, obtenemosla IP pública asignada al Ingress Controller ejecutando el siguiente comando:
  ```sh
  kubectl get svc -n ingress-basic
  ```
  Buscamos el servicio de tipo LoadBalancer creado por el Ingress Controller y nos quedamos con la IP externa.
  
  * Añadimos el dominio con la IP pública en el fichero de hosts
  x.x.x.x dev.hercules-sgi.local


* Revisar los detalles del servicio:
```sh
kubectl describe svc <service-name> --namespace my-namespace
```
Ejemplo: kubectl describe svc sgi-sgi-webapp --namespace sgi-dev
