# 📋 Projeto de Lista de Tarefas Interativa com Anexos e Chat

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen)
![Tecnologias](https://img.shields.io/badge/Tecnologias-HTML%2C%20CSS%2C%20JS%2C%20Bootstrap%2C%20Flask%2C%20Python-blue)

## 📖 Descrição do Projeto

Este projeto é uma aplicação web interativa de gerenciamento de tarefas desenvolvida com Flask (Python) no backend e Bootstrap no frontend. A aplicação permite aos usuários criar, organizar e acompanhar suas atividades diárias, com funcionalidades avançadas como anexo de fotos e sistema de chat integrado para colaboração.

## ✨ Funcionalidades Principais

- ✅ **Criação e gerenciamento de tarefas** com título, descrição e prioridade
- 🖼️ **Sistema de upload de imagens** para anexar fotos às tarefas
- 💬 **Sistema de chat** para comentários sobre tarefas específicas
- 👥 **Interface responsiva** com Bootstrap para todos os dispositivos
- 📂 **Organização por categorias** e filtros de visualização
- 🔔 **Notificações visuais** para tarefas pendentes

## 🛠️ Stack Tecnológica

### Frontend
- **HTML5** - Estrutura semântica da aplicação
- **CSS3** - Estilização personalizada além do Bootstrap
- **JavaScript (ES6+)** - Interatividade e manipulação DOM
- **Bootstrap 5** - Framework CSS para design responsivo
- **Font Awesome** - Ícones e elementos visuais

### Backend
- **Python** - Linguagem de programação principal
- **Flask** - Microframework web para Python
- **SQLite/PostgreSQL** - Banco de dados para armazenamento
- **Werkzeug** - Utilidades para upload e segurança de arquivos

### Funcionalidades Específicas
- Sistema de upload de arquivos com Flask
- Armazenamento local de imagens com tratamento de nomes
- Rotas API RESTful para operações CRUD
- Templates Jinja2 para renderização no servidor

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Python 3.8 ou superior
- Navegador web moderno
- pip (gerenciador de pacotes Python)

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/todo-list-interativa.git
   cd todo-list-interativa
   ```

2. **Crie um ambiente virtual (recomendado)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute a aplicação**
   ```bash
   python app.py
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5000
   ```

## 📁 Estrutura do Projeto

```
todo-list-interativa/
├── app.py                 # Aplicação principal Flask
├── requirements.txt       # Dependências do Python
├── config.py             # Configurações da aplicação
├── uploads/              # Pasta de uploads de imagens
├── static/               # Arquivos estáticos
│   ├── css/              # Estilos personalizados
│   ├── js/               # Scripts JavaScript
│   └── images/           # Imagens e ícones
├── templates/            # Templates HTML com Jinja2
│   ├── base.html         # Template base
│   ├── index.html        # Página principal
│   └── partials/         # Componentes reutilizáveis
└── README.md
```

## 🔧 Configuração

1. **Configurações do Flask** (em config.py):
   ```python
   class Config:
       SECRET_KEY = 'sua-chave-secreta-aqui'
       UPLOAD_FOLDER = 'uploads'
       MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
       ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
   ```

2. **Estrutura do Banco de Dados**:
   - Tabela de Tarefas: id, título, descrição, prioridade, data_criacao, concluida
   - Tabela de Anexos: id, tarefa_id, nome_arquivo, caminho
   - Tabela de Mensagens: id, tarefa_id, conteudo, data_envio

## 🎨 Interface do Usuário

A interface utiliza Bootstrap 5 com componentes modernos:
- Navbar responsiva com menu de navegação
- Cards para exibição de tarefas
- Modal para criação e edição de tarefas
- Sistema de grid para organização responsiva
- Toast notifications para feedback do usuário

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/NovaFuncionalidade`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Adiciona NovaFuncionalidade'`)
5. Faça o Push da Branch (`git push origin feature/NovaFuncionalidade`)
6. Abra um Pull Request


## 📞 Contato

Desenvolvido por [Jean Land] - [jeanmiranda1255@gmail.com](jeanmiranda1255@gmail.com)

---

**Nota**: Este projeto é para fins educacionais e pode ser expandido com funcionalidades adicionais como autenticação de usuários, notificações por e-mail, ou integração com APIs externas.
