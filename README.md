## REQUISITOS HOME/LANDING PAGE
[] Os dados das crypto moedas no topo da página deverão ser carregados da API Rest (SUGESTÃO: https://www.coinapi.io/) <br />
[x] O Banner do topo deverá ser em forma de carrossel (Mais detalhes no figma) <br />
[x] Os dados das crypto moedas na seção de "Top Cryptos" deverão ser carregados da API Rest (SUGESTÃO: https://www.coinapi.io/) <br />
[x] Ação do botão "View more +" deverá mostrar lista completa (10 itens) <br />
[x] Após expandir a lista, o texto "View more +" deverá ser substituido por "View less" <br />
[x] O formulário de Newsletter no rodapé da página deverá ter interação a API Rest <br />
[x] Implementar ação de "Loading" desabilitando o botão de "Subscribe" até o retorno do servidor <br />
[x] Enquanto a ação de subscribe estiver sendo processada o usuário não poderá alterar o campo e-mail (desabilitar o preenchimento do input de texto) <br />
[x] Após retorno de sucesso do servidor, o campo e-mail deve ser limpo e o botão "Subscribe" deve estar disponível novamente <br />
[x] O botão "Sign in" deverá abrir um dialog conforme o layout <br />
[x] O input de e-mail deverá ser validado (e-mail válido) <br />
[x] O input de password deverá ter a ação de mostrar / esconder a senha (clicando no ícone de olho) <br />
[x] "Forgot password?" não deverá ser implementado (apenas um link fake) <br />
[x] O botão de "Sign Up" e o link "Don’t have an account? Sign up to CoinSynch" deverão abrir o dialog "Sign Up" conforme o figma <br />
[x] Os campos "Name", "Email", "Password", "Confirm Password" e o checkbox "I have read and accept the Privacy Policy and Terms of User Sign up." deverão ser obrigatórios <br />
[x] O input de e-mail deverá ser validado (e-mail válido) <br />
[x] Os inputs Passwords e Confirm Password deverão ser iguais para se tornarem válidos <br />
[x] Ao clicar no link "Already have and account? Sign in to CoinSynch" a aplicação deverá abrir o Dialog de "Sign in" no lugar do "Sign Up" <br />

## REQUISITOS DASHBOARD
[x] O topo da página deverá ter as informações do usuário (Avatar e Nome, esses dados deverão ser consumidos da API Rest) <br />
[x] O topo também deverá ter um dropdown com uma única opção (Logout) <br />
[x] Menu lateral com tooltip deverá ter as funções de expandir e minimizar <br />
[x] Conteúdo deve ser exibido com os dados consumidos da API <br />
[x] O valor exibido no bloco "Balance in US$" deverá ser formatado <br />
[] O bloco "Daily Variation" deverá mostrar um gráfico com dados consumidos da API <br />
[x] O bloco "My Wallet" deverá mostrar a lista com dados consumidos da API <br />
[x] O botão "Add Crypto" deverá exibir o dialog "Add Crypto" com um select consumindo dados da API <br />
[] Ao clicar no botão "Add Crypto" a listagem no bloco "My Wallet" deverá ser atualizado. Não deu tempo de fazer em tempo real, só atualiza com refresh na página no momento <br />
[x] O Select de "Transfer" deverá listar as opções "Transfer in" e "Transfer out" <br />
[] Caso usuário transfira todo o valor da moeda selecionada, o item deverá ser removido da listagem do bloco "My Wallet" <br />
[x] O campo "Quantity" não deverá ter valor negativo <br />
[x] Ao remover todas as moedas da sua carteira, deverá ser exibida a mensagem de "Empty data" no bloco "My Wallet" <br />

## 💻 Projeto
Desafio Frontend da Edusynch

## ✨ Tecnologias
- [React JS](https://pt-br.reactjs.org/)
- [Next JS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux-toolkit](https://redux-toolkit.js.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Radix](https://www.radix-ui.com/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [JSON-Server](https://github.com/typicode/json-server)
- [KeenSlider](https://keen-slider.io/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Zod](https://zod.dev/)

## Executando o projeto

Abra o projeto, instale as dependências do mesmo com o seguinte comando no terminal:

```cl
npm install
```

Agora, antes de prosseguirmos, é importante ressaltar que será necessário que tenha uma API_KEY gerada pelo site [coinAPI](https://www.coinapi.io/), é possível gerar gratuitamente, após gerar sua API_KEY, você receberá um e-mail com a informação da mesma, com o código dela disponível, insira-o em **src/services/api.ts**, nesse arquivo você encontrará uma constante chamada API_KEY vazia, insira a API_KEY que acabou de gerar nessa constante como uma string

Exemplo:
```cl
export const API_KEY = YOUR_API_KEY_HERE
```

Com a API_KEY devidamente inserida, vá para o terminal do projeto e inicialize o [JSON-server](https://github.com/typicode/json-server) com o seguinte comando:
```cl
npm run server
```

Agora com o JSON-server em funcionamento, você já poderá começar a interagir com o projeto. Portanto, sem mais delongas, abra outro terminal e inicialize o projeto com o comando:

```cl
npm run dev
```

<br />

Com isso você já deverá estar com o ambiente rodando e pronto para a utilização.

---

Feito por Rafael Quartaroli. 😉

<br />
