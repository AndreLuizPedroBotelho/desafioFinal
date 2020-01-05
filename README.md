# Desafio Final

<h1 align="center">
<br>
<a name="top" href="https://github.com/AndreLuizPedroBotelho/desafioFinal.git "><img src="./frontend/src/assets/logo.svg"></a>
<br>
<br>
</h1>

# Pré-requisitos
                
1. Node
2. Postgres
3. Redis
4. Ambiente react native configurado ( <https://docs.rocketseat.dev/ambiente-react-native/introducao> ) 
5. Conta no mailtrap ( <https://mailtrap.io/>)
6. yarn ou npm 
7. Ambiente Linux (projeto desenvolvido no Debian)
8. Celular ou emulador Android (O projeto mobile foi desenvolvido APENAS para este sistema)
----
                
# Intruções
## 1. Instalar pm2 globalmente e nodemon globalmente

```
$ npm install pm2 -g 
$ npm install nodemon -g 

```
## 2. Clonar repositório

```
$ cd desafioFinal
$ git clone https://github.com/AndreLuizPedroBotelho/desafioFinal.git 

```

## 3. Criar aquivo **.env** baseado no arquivo **.env-example** na pasta backend
```
$ cp backend/.env.example backend/.env

```
## 4. Preencher variáveis de ambiente no arquivo **.env** 

## 5. Entrar na pasta mobile e colocar o IP da máquina no arquivo **src/services/api.js**

## 6. Executar na raiz no projeto para instalar as dependências do projeto
```
$ yarn build

```
## 7. Com o aparelho android conectado, executar o comando   
```
$ yarn start-android

```

## 8. Inicializar o projeto 
```
$ yarn start

```
## 9. Executar migrations e seeds 

```
$ yarn migrations && yarn seeds  

```

# Observações

#### O comando `yarn start` pode demorar, com o comando `pm2 logs` é possivel acompanhar o que esta acontecendo 
#### O comando `yarn start` já vai criar o banco com o nome escolhido na variável de ambiente `DB_NAME` 
#### Se for utilizar npm, os arquivos pm2.json e package.json terão que ser alterados

