# Netflix Clone com Typescript e Nextjs

Este é um clone da Netflix desenvolvido com Next.js e TypeScript como parte do meu aprendizado de desenvolvimento web. Ele permite que os usuários pesquisem filmes e séries, assistam trailers e adicionem títulos a uma lista pessoal de favoritos.

### Vercel site
[netflix-clone](https://nextflix-rm.vercel.app/)
### Video
[![video](https://i.ytimg.com/vi/7FpyPQ8bdek/maxresdefault.jpg)](https://www.youtube.com/watch?v=7FpyPQ8bdek)

## Funcionalidades

- Pesquisa de filmes e séries por nome
- Reprodução de trailers de filmes e séries
- Adição de filmes e séries a uma lista de favoritos
- Exibição da lista de favoritos do usuário

## Tecnologias usadas

- Nextjs Typescript
- tailwindcss
- TMDB api
- firebase

## Como editar na sua máquina

1. Faça o download ou clone este repositório
2. Execute o comando npm install para instalar as dependências
3. Execute o comando npm run dev para iniciar o aplicativo em modo de desenvolvimento
4. Abra o aplicativo em seu navegador em http://localhost:3000

## Como usar

1. Acesse a aplicação [netflix-clone](https://nextflix-rm.vercel.app/)
2. Faça login com uma Google ou Github
3. Clique na lupa na barra de navegação para pesquisar por filmes ou séries
4. Clique em um título para ver mais informações e um trailer
5. Clique no botão "+ Minha lista" para adicionar o título à sua lista pessoal de favoritos
6. Clique no botão "Minha lista" na barra de navegação para ver sua lista pessoal de favoritos

## Arquitetura do código

- components
  - actor : componentes da página "/atores"
  - auth : componentes da página "/login"
  - grid : componentes da página "/[tipo de midia]/[gênero]/[numero da página]" que contém um grid com todos os filmes ou séries
  - home : componentes da página inicial "/" e "/minha_lista"
  - media : componentes da página de detalhes sobre um filme ou série "/[tipo de midia]/detalhes/[id da midia]"
  - modal : componentes do modal de video
  - nav : componentes da barra de navegação
- constants : pasta com objetos que fornece tradução, slug ou urls
- context : context API do react
- hooks : pasta com custom hooks
- pages : pasta do nextjs, cada pasta é uma rota
  - api: para esconder minha key do youtube.
  - fonts: pasta com fonte "netflix sans"
- styles : pasta com estilos
- utils : funções usadas na aplicação
  - formatters: funções para formatar textos, como moeda ou datas.
  - requests: funções para fazer requisições http

### Por que estou fazendo este app?

- Decidi criar uma aplicação que consome uma api de filmes para aprender a utilizar Nextjs e Typescript

### Por que a escolha de nextjs / typescript?

- Precisava aprender sobre novas formas de renderizar a página

### O que estou aprendendo

- Typescript com React: Passar props, criar interfaces e tipos genéricos.

- Client Side Rendering, Static Site Generator e Server Side Rendering: Como e quando usar 'getServerSideProps','getStaticProps' e 'getStaticPaths'.

- Hydration: Como o javascript carrega com a página e como lidar com os erros de hydration.

- Dynamic import e Code Splitting: Diminuir o tamanho final do javascript.

- Firebase Authentication e Realtime Database

### Maiores dificuldades

- Resolver erros de Hydration. O Nextjs não diz onde está o erro, então eu tenho que procurar o que poderia estar causando essse erro.

- No inicio foi bem chato usar typescript, principalmente passar props. Mas depois que aprendi a criar interface para os componentes ficou mais fácil passar props.

- Criar um slider de videos. Eu usei esse slider do Kyle do [webdev simplified](https://www.youtube.com/watch?v=yq4BeRtUHbk&t=10s) e passei para o react.

- Entender como funciona TMDB API. Alguns endpoints retornam "movie" e "tv" misturados, mas "movie" e "tv" tem algumas propriedades diferentes, por exemplo, nome de "movie" vem como "title" e "tv" vem como name. Nem todo filme vem com videos, mas foi bom porque aprendi a usar api do youtube para buscar por videos que não veio na TMDB.
