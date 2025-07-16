Un breve resumen para el ejercicio 2 automatizacion de despliegue:

Cree un repositorio donde añadi el proyecto

Instale gh-pages y añadi la prebuild:dev, build:dev y el deploy:

"prebuild:dev": "npm run prebuild",
"build:dev": "vite build --mode development",
"deploy": "gh-pages -d dist",

Ejectute la build:dev y a continuacion la run deploy

Añadi la carpeta .github/workflows/cd.yml e introduje la configuracion

```yaml
name: CD workflow organization

on:
  push:
    branches:
      - master

jobs:
  cd:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Use SSH key
        run: |
          mkdir -p ~/.ssh/
          echo "${{secrets.SSH_PRIVATE_KEY}}" > ~/.ssh/id_rsa
          sudo chmod 600 ~/.ssh/id_rsa
      - name: Git config
        run: |
          git config --global user.email "cd-user@my-app.com"
          git config --global user.name "cd-user"
      - name: Install
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy -- -r git@github.com:Danielmedi9/laboratorio-gh-actions.git
```

Donde configuro la build y SSH

Creo una ssh con el comando ssh-keygen -m PEM -t rsa -C "cd-user@my-app.com" y luego el github configuro la id_rsa.pub (publica) en settings > deploy keys y la privada en settings > secrets

Subo los archivos y compruebo que todo este correcto

<img width="1194" height="738" alt="image" src="https://github.com/user-attachments/assets/93373ab5-47d6-4bba-9b34-a894ec7ece81" />
