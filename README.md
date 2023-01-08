# Netflix Clone (incompleto)

## Applicação criada com npx-create-next-app --typescript

npm install  

npm run dev

## Feito com:

- Nextjs Typescript
- tailwindcss

## Por que estou fazendo este app?

- Porque acho que é um bom projeto para demonstrar que consigo usar Nextjs

## Por que a escolha de nextjs / typescript

- Porque eu precisava dar um passo a frente, sair da zona de comforto
  e aprender essas tecnologias que sao muito requisitadas

## O que estou aprendendo?

- Tipagem Typescript com React
- Client Side Rendering
- Static Site Generator
- Server Side Rendering
- Props Interface

## Maiores dificuldades?

- Como montar o layout, pesquisei um design no google e estou seguindo
- Tipagem do typescript com react, principalmente passar props e hooks.

## Como está sendo desenvolver esse projeto?

- Basicamente estou aprendendo buscando no google e lendo documentação o que está tornando bem cansativo.

- Sigo sofrendo muito para resolver erro de tipo JSX.IntrinsicAttributes.

- Depois de apanhar bastante para o typescript, resolvi procurar no youtube e achei este video que me ajudou bastante:
  https://www.youtube.com/watch?v=cwqNAkwhKqw&t=4399s
- Me deparei com um Hydration Error e descobri que a causa era configuracao de responsividade do swiper js
  para resolver bastar configurar slidesperview como auto

- Desistir de usar o swiper porque achei que não combinou muioto então eu peguei como referencia o video do Kyle (WebDev Simplified) e criei uma versão react do slider dele. Implementei uma função minha onde pego o tamanho da tela pelo custom hook (useWindowSize) e dependendo do tamanho da tela eu atribuo o valor "Items Per Screen". Também possibilitei navegar sliders clicando na "Progress Bar"
