# Netflix Clone (incompleto)

## Applicação criada com npx-create-next-app --typescript

## Feito com:

- Nextjs Typescript
- tailwindcss
- TMDB api

## Por que estou fazendo este app?

- Porque acho que é um bom projeto para demonstrar que consigo usar Nextjs

## Por que a escolha de nextjs / typescript

- Porque eu precisava dar um passo a frente, sair da zona de conforto
  e aprender essas tecnologias que sao muito requisitadas

## O que estou aprendendo?

- Tipagem Typescript com React
- Client Side Rendering
- Static Site Generator
- Server Side Rendering
- Hydratation
- Props Interface

## Maiores dificuldades?

- Como montar o layout.
- Criar um slider de videos.
- Tipagem do typescript com react, principalmente passar props e hooks.

### Como está sendo desenvolver esse projeto?

Basicamente estou aprendendo buscando no google e lendo documentação o que está tornando bem cansativo.

Sigo sofrendo muito para resolver erro de tipo JSX.IntrinsicAttributes.

Depois de apanhar bastante para o typescript, resolvi procurar no youtube e achei este video que me ajudou bastante: https://www.youtube.com/watch?v=cwqNAkwhKqw&t=4399s

Me deparei com um Hydration Error e descobri que a causa era configuracao de responsividade do swiper js para resolver bastar configurar slidesperview como auto

Desisti de usar o swiper porque achei que não combinou muioto então eu peguei como referencia o video do Kyle (WebDev Simplified) e criei uma versão react do slider dele. Implementei uma função minha onde pego o tamanho da tela pelo custom hook (useWindowSize) e dependendo do tamanho da tela eu atribuo o valor "Items Per Screen". Também possibilitei navegar sliders clicando na "Progress Bar"

Eu precisava fazer o fetch do trailer dos videos de cada lista. Mas como estou aprendendo next eu não queria fazer no client side. Então eu usei Promise.all e carreguei cada trailer no server side. Alguns filmes não possui link do trailer na DB por isso o botão fica como "indisponivel".

Refiz toda a estrutura de código da página inicial, ao invés de colocar uma stack de componentes, eu gerei componentes de uma array com os dados de todos os componentes anteriores. O componente que será renderizado será o que estiver com o index igual ao index ativo.
Aprendi a criar e usar custom hooks então criei um hook para acrescentar e diminuir valor do index usando scroll, usei essa lógica para criar uma navegação entre categoria de filmes com o scroll do mouse.

Tive muitos problemas com essa api já que nem todos os filmes possuem video. E em quase todos os componentes eu tive que fazer algum tipo de condicional para sabe se há videos deste id na DB

Usei context api para criar uma seção com filmes adicionados numa lista
