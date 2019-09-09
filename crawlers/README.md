# Desafio 2: Crawlers

## Como executar esse código

Inicialmente, instale as dependências desse projeto usando `npm install` .

Em seguida você pode:

1. executar dentro do projeto o comando 
`node crawler.js` + `"lista de subreddits separados por ponto e vírgula"` 
(ex.: `node crawler.js "askreddit;worldnews;cats"`). Após finalizada a execução, uma lista com os posts mais relevantes 
estará disponível em `reddit.txt`. Ou,

2. Com o telegram previamente instalado no seu computador, executar dentro do projeto o comando `node telegram-bot.js` e, em seu telegram, pesquisar pelo 
bot `desafio_sandy`. Então, é só enviar o comando
 `/NadaPraFazer [+ Lista de subrredits]` (ex.: `/NadaPraFazer programming;dogs;brazil`) para o bot 
 e aguardar para visualizar os posts.
 
 Detalhes para a solução desse desafio se encontram na forma de comentários dentro do arquivo `telegram-bot.js`.
