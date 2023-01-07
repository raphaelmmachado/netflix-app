// ESTE README É TEMPORÁRIO

Por que estou fazendo este app?

- porque acho que é um bom projeto para colocar no portfolio

Por que a escolha de nextjs / typescript

- porque eu precisava dar um passo a frente e aprender essas tecnologias que sao muito requisitadas

O que estou aprendendo?

- Tipagem Typescript com React
- Client Side Rendering
- Static Site Generator
- Server Side Rendering

Maiores dificuldades?

- Como montar o layout, pesquisei um design no google e estou seguindo
- Tipagem do typescript com react, principalmente passar props.
  Basicamente estou aprendendo buscando no google e lendo documentação o que está tornando bem cansativo.
  Sigo sofrendo muito para resolver erro de tipo JSX.IntrinsicAttributes

Depois de apanhar bastante para o typescript, resolvi procurar no youtube e achei este video que me ajudou bastante:
https://www.youtube.com/watch?v=cwqNAkwhKqw&t=4399s

- Me deparei com um Hydration Error
  e descobri que a causa era configuracao de responsividade do swiper js
  para resolver bastar configurar slidesperview como auto

- Eu peguei como referencia o video do Kyle (WebDev Simplified) e criei uma versão react do slider dele.
- Implementei uma função minha onde pego o tamanho da tela pelo custom hook (useWindowSize) e dependendo do tamanho da tela eu atribuo o valor "Items Per Screen".
- Também possibilitei navegar sliders clicando na "Progress Bar"
