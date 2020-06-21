# Zoox Test Front
> Projeto de Avaliação UX, UI & Front-End

~~Deploy automático para o Netlify: https://zoox-test-202006.netlify.app/  ~~
Deploy automático removido até eu ter uma API pública interna rodando.




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
Tem problema se eu salvar? No momento tá salvando no banco direto...


## Problemas conhecidos:
- Auth não está funcionando.  
Invés disso, estou usando um fakeAuth por ora (aceita qualquer login/senha).


## ToDo:
- Deploy da API pro Heroku
- Mover o Auth pro Firebase
- Fix Portal on really small devices (less than 680h or 120w)
- Fix Index on really small devices (less than 430h or 350w)
