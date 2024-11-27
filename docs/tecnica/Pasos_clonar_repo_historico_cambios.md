## Pasos para importar un repositorio con el historial de cambios

### Paso 1. Clonar el repositorio original o solicitar un zip 
``` sh
git clone <URL-del-repositorio-original>
```
En caso de no disponer de acceso, el propietario debe compartir un archivo comprimido del repositorio Git completo.
Descomprimir el zip en una carpeta en local y nos situamos en él.
``` sh
cd <nombre-del-repositorio>
```

### Paso 2. Crear el repositorio en nuestra cuenta de github
Sin incluir el fichero README.md, .gitignore, ni una licencia, ya que el repositorio ya clonado tiene su propia configuración.

### Paso 3. Añade el nuevo repositorio como un remoto
En la carpeta del repositorio clonado, agrega el nuevo repo como un remoto adicional con un nombre como origin 
``` sh
git remote add new-origin https://github.com/<tu-usuario>/<nuevo-repositorio>.git
git remote rename new-origin origin
git remote set-url origin git@github.com:<tu-usuario>/<nuevo-repositorio>.git
git remote -v
```

### Paso 4. Sube el historial de cambios al nuevo repositorio
``` sh
git push origin --all
git push origin --tags
```

### Ejemplo con repositorio .
