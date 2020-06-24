# Zoox Test Front
> Projeto de Avaliação UX, UI & Front-End

~~Deploy automático para o Netlify: https://zoox-test-202006.netlify.app/~~  
Deploy automático removido até eu ter uma API pública interna rodando.

# Intro
Meu foco é UI/UX e Front-End UI.   
Então meu conhecimento maior é em cima de estilização, performance e componentes visuais da aplicação, ao contrário de um Front-End Developer que tem conhecimento da ligação do Backend com o Front-End.  
 Ou seja: sei fazer, mas não é minha especialização.



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
- O site dado traduz pra português até os códigos, acabei usando a [Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) pra pegar os códigos ISO mesmo.

- > "A tela de login e os cadastro de cidade e país não serão salvos. Estarão disponíveis apenas enquanto o usuário estiver utilizando o sistema (projeto mock)." 

  Tem problema se eu salvar? No momento tá salvando no banco direto...


## Problemas conhecidos:
- Auth não efetivamente verifica se as credenciais são válidas.  
Invés disso, estou usando um fakeAuth por ora (aceita qualquer login/senha), mas verifica se você está ou não logado.

- Busca de weather não respeita o escolhido no dropdown
- Listagem não tem filtro e ordenação
- "Create item" só permite criar cidade de EUA ou Brasil (model hardcore)
- "Edit Item" lista as informações, mas não atualiza o banco



## ToDo:
- Deploy da API pro Heroku
- Mover o Auth pro Firebase
- Corrigir o Portal em devices realmente pequenos (menor que 680h ou 120w)
- Corrigir a Index em devices realmente pequenos (menor que 430h ou 350w)
- Tratar modo offline
