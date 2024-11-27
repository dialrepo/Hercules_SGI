## Pasos para importar un csv con un listado de historias 

### Paso 1. Instalar GitHub CLI
https://github.com/cli/cli/blob/trunk/docs/install_linux.md

``` sh
(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
	&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& sudo apt update \
	&& sudo apt install gh
```

Comprobamos versión
``` sh
gh --version
```

### Paso 2. Configuración
Ejecutamos este comando para autenticarnos con la cuenta de github.
``` sh
gh auth login
```
He generado un personal access token classic en el apartado Developer Settings en la cuenta de github y lo asocio para que se loggee
```
? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Paste an authentication token
Tip: you can generate a Personal Access Token here https://github.com/settings/tokens
The minimum required scopes are 'repo', 'read:org', 'workflow'.
? Paste your authentication token: ****************************************
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as dialrepo
``` 


### Paso 3. Comandos prueba
Una vez autenticado, GitHub CLI está configurado para trabajar con la cuenta.
* Lista los repositorios
``` sh
gh repo list
```
* Lista los proyectos de un repositorio
``` sh
gh project list <cuenta_github>/repositorio_git>
```

* Lista tareas
``` sh
cd <directorio_repositorio_git>
gh issue list
``` 

Ejemplo:
``` sh
cd /ProjectsGitHub/REPO_HERCULES/Hercules_SGI
gh issue list
gh project list dialrepo/SGI 
``` 


###  Comandos prueba para crear tareas
``` sh
gh issue create --title "[HERUM-283] - [ETI] Error guardar solicitud" --label "type: Error" --project "Prueba_proyecto_UM_27112024" --body "Hola, 

  

al intentar modificar una solicitud existente en producción de [mvp@um.es|mailto:mvp@um.es] que es una investigadora da un error. adjunto logs y pantallazo de error. 

  

La tiene que tner hoy terminada." 
```

``` sh
gh issue create --title "[HERUM-297] - [CSP] Error en la  Generación de listados" --body "He filtrado por unidad de getsión OPE y hay 412 proyectos que deberian generarse sin problemas pero da error." --label "type: Error" --project "Prueba_proyecto_UM_27112024" 
``` 


