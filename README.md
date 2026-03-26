# PROTOSERV - Fábrica de Software

### Disciplina: IMERSÃO PROFISSIONAL: FÁBRICA DE SOFTWARE

O **PROTOSERV** é um sistema desenvolvido como parte da disciplina de Fábrica de Software, focado na gestão e prestação de serviços. O projeto utiliza uma arquitetura moderna com Next.js no frontend e containerização com Docker para garantir a consistência do ambiente de desenvolvimento.

---

## 👥 1. Identificação da Equipe

* **Eduardo Alan dos Santos**
* **Felipe Augusto Graniska**
* **Lucas Wessendorf de Araujo**
* **Victor Gabriel Alves Carneiro**

### Integrantes e Funções (Sugestão)
* **Product Owner / Analista de Requisitos**: Responsável por levantar requisitos, definir escopo e organizar prioridades.
* **Desenvolvedor Backend**: Responsável pela implementação das regras de negócio, APIs e banco de dados.
* **Desenvolvedor Frontend**: Responsável pela interface do sistema e experiência do usuário.
* **Tester / QA**: Responsável por testes funcionais, validação e garantia de qualidade.
* **Documentador**: Responsável pela documentação técnica e manual do usuário.

---

## 🎨 2. Design do Projeto (Figma)

O layout e a prototipação do sistema podem ser visualizados nos links abaixo:
* [Layout Principal - Figma](https://www.figma.com/design/pCxmpGaJld5fQ8SSWkifQu/Layout-Projetp?node-id=0-1&t=6xnH79asLDjx1iRa-1)
* [Link Auxiliar de Design](https://www.figma.com/design/T4mb5LOStDgZTJ8vZPiDCr/Sem-t%C3%ADtulo?node-id=0-1&t=S6cqAvMtwWTCpqZQ-0)

---

## 🛠️ 3. Tecnologias Utilizadas

O projeto utiliza o seguinte conjunto de tecnologias principais:
* **Framework**: Next.js 16.1.6
* **Biblioteca UI**: React 19.2.3
* **Estilização**: Tailwind CSS ^4
* **Linguagem**: TypeScript ^5
* **Containerização**: Docker e Docker Compose
* **Banco de Dados**: MySQL 8.0

---

## 🚀 4. Como Rodar o Projeto

Para instanciar o ambiente completo (Aplicação + Banco de Dados), utilize o Docker Compose na raiz do repositório.

### Pré-requisitos
* Docker instalado.
* Docker Compose instalado.

### Instalação e Execução
No terminal, dentro da pasta raiz do projeto, execute:

```bash
docker-compose up --build
```

### Este comando irá:

Construir a imagem da aplicação baseada no arquivo front-end/my-app/package.json.

Iniciar o container do banco de dados MySQL.

Disponibilizar o sistema no endereço: http://localhost:3000.

### 📁 5. Estrutura de Pastas (Frontend)

/front-end/my-app/app: Contém as rotas e páginas principais (Login, Register, Serviços).

/front-end/my-app/components: Componentes reutilizáveis (Sidebar, Button, Input, Logo).

/front-end/my-app/public: Ativos estáticos como logos e imagens.
