# Quasar App (posts-alkabot)

**Um projeto avaliativo:**
  - Tecnologias:
    - Base: Vue
    - Framework: Quasar
    - Api: Axios
    - Icones: Google Fonts
    - Notificação de visitantes: Telegram
  - Idioma:
    - Código em inglês
    - Nome de arquivos inglês
    - Conteúdo da página em português (Exceto dados da api)
    - Comentários português
  - Características:
    - Responsivo
    - Tela de carregamento enquando obtem resposta
    - passando id por url
    - Tecnica de neumorphism básico na tela *detalhes de um usuário* fazendo o card flutuar
    - Aplicando um filtro de busca nas páginas de *posts* e *usuários*
  - Versionamento:
    - Commits feito em uma branch de desenvolvimento chamada develop
    - Merge com a master ao final do desenvolvimento

### **Comandos para rodar projeto localmente:**

### Clonar projeto
```bash
git clone https://github.com/skymarkos7/posts_alkabot.git
```

### Instalar dependencias
```bash
yarn
# or
npm install
```

### Rodar o projeto (Certifique-se de estar na pasta do projeto antes de rodar)
```bash
quasar dev
# or
npx quasar dev
# or
yarn quasar dev
```


### Build o app para produção
```bash
quasar build
```





# Telas
## Posts
 - Exibindo posts em um card
 - Botão para mostrar os comentários relacionados
 - Filtro de busca

 ## Comentários
  - Exibe o post e seus comentários

 ## Usuários
  - Mostrando todas as infos de um usuário no mesmo card
  - Duas abas selecionáveis para separar dados de ENDEREÇO ou EMPRESA
  - Botão expandir para mostrar infos do usuário
  - Filtro de busca

  ## Detalhes do usuário
  - Card com efeito flutuante mostra infos do usuário
  - Email, telefone e site com href para executar ação
