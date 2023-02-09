# Netflix Clone

## Aplicação criada com npx-create-next-app --typescript

## Feito com:

- Nextjs Typescript
- tailwindcss
- TMDB api

## Por que estou fazendo este app?

- Porque acho que é um bom projeto para demonstrar que consigo usar Nextjs

## Por que a escolha de nextjs / typescript

- Porque eu precisava dar um passo a frente e aprende sobre mais formas de renderizar a página

## O que estou aprendendo?

- Tipagem Typescript com React
- Client Side Rendering
- Static Site Generator
- Server Side Rendering
- Hydration
- Props Interface

## Maiores dificuldades?

- Como montar o layout.
- Criar um slider de videos.
- Tipagem do typescript com react, principalmente passar props e hooks.

### Como está sendo desenvolver esse projeto?

Busquei no figma algumas inspirações para montar o design da página

Basicamente estou aprendendo buscando no google e lendo documentação o que está tornando bem cansativo.

Sigo sofrendo muito para resolver erro de tipo JSX.IntrinsicAttributes.

Me deparei com um Hydration Error e descobri que a causa era configuracao de responsividade do swiper js para resolver bastar configurar slidesperview como auto

Desisti de usar o swiper porque achei que não combinou muito então eu peguei como referencia o video do Kyle (WebDev Simplified) e criei uma versão react do slider dele. Implementei uma função minha onde pego o tamanho da tela pelo custom hook (useWindowSize) e dependendo do tamanho da tela eu atribuo o valor "Items Per Screen". Também possibilitei navegar sliders clicando na "Progress Bar"

Depois de terminado o slider, tive a ideia de mudar o background de acordo com o filme que foi ativado com o evento (hover) com um efeito de transição

Eu precisava fazer o fetch do trailer dos videos de cada lista. Mas como estou aprendendo next eu não queria fazer no client side. Então eu usei Promise.all e carreguei cada trailer no server side. Alguns filmes não possui link do trailer na DB por isso o botão fica como "indisponivel".

Refiz toda a estrutura de código da página inicial, ao invés de colocar uma stack de componentes, eu gerei componentes de uma array com os dados de todos os componentes anteriores. O componente que será renderizado será o que estiver com o index igual ao index ativo.
Aprendi a criar e usar custom hooks então criei um hook para acrescentar e diminuir valor do index usando scroll, usei essa lógica para criar uma navegação entre categoria de filmes com o scroll do mouse.

Tive muitos problemas com essa api já que nem todos os filmes possuem video. E em quase todos os componentes eu tive que fazer algum tipo de condicional para sabe se há videos deste id na DB

Usei context api para criar uma seção com filmes adicionados numa lista

Aprendi a usar firebase para criar login com google e facebook.

Também usei firebase como database para a lista de filmes do usuario.

Tive muita dificuldade para sincronizar a lista de usuarios da DB com context api sem ter infinity loop.

Primeiramente eu tinha pensado em fazer "minha lista" como mais uma seção para rolar para baixo, mas acabei fazendo separando em sua própria página

Para resolver o problema de que alguns filmes não possuir trailer em português na DB, resolvi usar a API do youtube, pesquisar "nome do filme" + "trailer oficial", configurei para retornar no máximo 5 itens e de preferencia videos brasileiros, então gerei botões que selecionam o id e enviam para o componente.

Na página de filmes e séries, usei o recurso do Nextjs onde posso criar páginas dinamicas de acordo com o id passado na URL. Então eu fiz uma função que faz o fetch da página de filmes da TMDB de acordo com esse id da URL.

## Problemas para consetar

Ao atualizar a página "minha lista" a lista de filme fica vazia, mesmo que tenha items. Deve ser algum problema de "effect", tentei de todas formas usar useEffect mas sempre termina em loop infinito. Então enquanto não conserto eu fiz que a página seja redirecionada para tela inicial se a lista estiver vazia
