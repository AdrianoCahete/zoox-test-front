# Zoox Test Front
> Projeto de Avaliação UX, UI & Front-End

Deploy automático para o Netlify: https://zoox-test-202006.netlify.app/  
[![Netlify Status](https://api.netlify.com/api/v1/badges/3a0362c3-ece5-478f-a75b-c174f4736c59/deploy-status)](https://app.netlify.com/sites/zoox-test-202006/deploys)




## Build Setup

```bash
# install dependencies
$ npm install

# You need to run the API server for Dev
$ npm run api

# serve with hot reload at localhost:3000
$ npm run dev

```

## Questões:
- Qual ISO 3166? Existem o "Alpha-2", "Alpha-3" e "Numeric Code".  
Na dúvida, estou usando o "Alpha-2".  
O site dado traduz pra português até os códigos, acabei usando a [Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) mesmo.

- "A tela de login e os cadastro de cidade e país não serão salvos. Estarão disponíveis apenas enquanto o usuário estiver utilizando o sistema (projeto mock)."  
Tem problema se eu salvar? No momento tá salvando na db direto...


## Know Problems:
- Auth não está funcionando, o POST nem chega à API.  
Invés disso, estou usando um fakeAuth por ora (aceita qualquer login/senha).


## ToDo:
- Deploy da API pro Heroku
