###COMANDOS KUBECTL
Listado de algunos comandos útiles de kubectl:

*  consultar los pods

```sh
kubectl -n <namespace> get pods
kubectl -n <namespace> get pods -o wide
```



* Revisar los Eventos del Pod (para ver el estado y los eventos del pod)
```sh
kubectl describe pod <pod-name>
```

* Verificar Logs del Pod:
```sh
kubectl logs <pod-name>
```

* Obtenemosla IP pública asignada al Ingress Controller 
```sh
kubectl get svc -n ingress-basic
```
* Revisar los detalles de lservicio Ingress Controller 
```sh
kubectl describe svc <service-name> --namespace my-namespace
```
* Los recursos tipo ingres y el address es la ip pública
El recurso tipo ingress va a correr en el namespace donde esté corriendo tú servicio.
kubectl get ing -n sgi-dev

* Obtenemosla IP pública asignada al Ingress Controller 
El loadbalancer que recibe el tráfico va en el namespace propio del ingress  
```sh
kubectl get svc -n ingress-basic
```
kubectl get pods -n ingress-basic
kubectl describe ingress sgi-sgi-webapp -n sgi-dev

Verificar el Servicio de Ingress Controller y ver el log
kubectl get pods -n ingress-basic
kubectl logs nginx-ingress-ingress-nginx-controller-5dfd84cd7-kz8bm  -n ingress-basic

* borrar todos los pods de un namespace

```sh
kubectl delete pods --all -n <namespace>
```

*  borrar todos los Deployments, eplicaSets, StatefulSets, y DaemonSets en un namespace
```sh
kubectl delete deployments --all -n <namespace>
kubectl delete replicasets --all -n <namespace>
kubectl delete statefulsets --all -n <namespace>
kubectl delete daemonsets --all -n <namespace>
```

* Listar todos los contextos:
```sh
kubectl config get-contexts
```

* Cambiar al contexto de AKS:
```sh
kubectl config use-context aks-context
```

* Cambiar al contexto de Minikube:
```sh
kubectl config use-context minikube
```

* Verificar el contexto actual:
```sh
kubectl config current-context
```

* Acceder a la bbdd o panel keycloak
```sh
kubectl port-forward sgi-postgresql-0 5432:5432 -n sgi-demo
```

```sh
kubectl port-forward sgi-sgi-keycloak-67995bdc5d-n5crh 8080:8080 -n sgi-demo
```

kubectl port-forward sgi-sgi-keycloak-69d8f4988-hbcm8 8080:8080 -n sgi-demo

* Obtener la ip.
```sh
kubectl get ing -n sgi-demo
```


az ad sp create-for-rbac --name "MiServicePrincipal" --role contributor --scopes /subscriptions/tu-subscription-id
Este comando te devolverá un conjunto de credenciales que puedes usar para autenticarte en tus scripts:

appId: Es el ID del cliente (Client ID).
password: Es la clave secreta (Client Secret).
tenant: Es el ID del inquilino (Tenant ID).

* El comando crea un Service Principal llamado "MyServicePrincipal" con permisos de Contributor en la suscripción especificada (2db30737-d824-4f00-811f-809768523d73). Esto significa que el Service Principal tendrá permisos para gestionar los recursos dentro de esa suscripción (por ejemplo, crear, modificar o eliminar máquinas virtuales, redes, almacenamiento, etc.).
```sh
az ad sp create-for-rbac --name "MyServicePrincipal" --role contributor --scopes /subscriptions/2db30737-d824-4f00-811f-809768523d73
```

az ad sp create-for-rbac --name "MyServicePrincipal" --role contributor --scopes /subscriptions/2db30737-d824-4f00-811f-809768523d73/resourceGroups/grupo_recursos_aks

az role assignment list --assignee lamatarr@unirioja.es --scope /subscriptions/2db30737-d824-4f00-811f-809768523d73


```sh
az login --service-principal --username "appId" --password "password" --tenant "tenant"
```





openssl s_client -connect http://localhost:8081/ -tls1_2
openssl s_client -connect http://localhost:8081/ -tls1_1

