<div align="center">
  
# 📄 PDF Maker

**Motor de criação, conversão e mesclagem de documentos de execução 100% local.**

[![Vue.js](https://img.shields.io/badge/Vue%203-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
<!-- [![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen?style=for-the-badge)](#) -->

</div>

<br>

O **PDF Maker** é uma aplicação web focada em privacidade e performance. Ela permite que os usuários combinem múltiplos arquivos PDF e imagens (PNG/JPG) em um único documento PDF, reordenem páginas via Drag & Drop e apliquem compressão opcional. 

Toda a manipulação ocorre localmente no navegador do usuário utilizando **Web Workers**, garantindo que **nenhum dado seja enviado para servidores externos**.

## ✨ Funcionalidades

* 🔒 **Privacy-First (Zero Server):** Processamento 100% *client-side*. Seus documentos nunca saem da sua máquina.
* ⚡ **Alta Performance:** Execução de compilação delegada para uma thread secundária (Web Worker), mantendo a interface fluida.
* 🖼️ **Suporte a Imagens e Compressão:** Converte imagens para PDF on-the-fly, com opção nativa (via `OffscreenCanvas`) para redução de peso e tamanho final do arquivo.
* 🖱️ **Drag & Drop Reativo:** Interface moderna que permite reordenar visualmente as páginas antes da geração do PDF final.
* 🎨 **Neon UI / Dark Mode:** Design moderno focado em conforto visual e clareza de interações.

## 🏗️ Princípios de Engenharia e Arquitetura

Este projeto não é apenas uma ferramenta útil, mas também um laboratório de boas práticas de engenharia de software:

* **Clean Architecture & DDD:** O domínio de manipulação de PDF (tipos, entidades e serviços do Web Worker) é estritamente isolado da camada de apresentação (Vue/UI).
* **Object Calisthenics (No Else / Small Files):** O fluxo lógico é desenhado para evitar ramificações condicionais desnecessárias (`else`), resultando em um código mais limpo, previsível e fácil de manter, dividido em arquivos de responsabilidade única.
* **Boundary Protection & Domain Integrity:** Uso rigoroso do `TypeScript Strict Mode` e proteção de mutabilidade de memória ao trafegar dados entre a Main Thread e o Web Worker.
* **Test-Driven Development (TDD):** Cobertura de testes unitários (100%) garantindo o comportamento e a resiliência da interface gráfica e das regras de negócio usando Vitest.

## 🚀 Como Executar o Projeto Localmente

**Pré-requisitos:** Node.js v18+ (Desenvolvido e homologado em ambiente Ubuntu 24.04).

1. Clone o repositório:
```bash
git clone [https://github.com/luizhanauer/pdf-maker.git](https://github.com/luizhanauer/pdf-maker.git)
```
```bash
cd pdf-maker
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse em seu navegador (confira a porta no terminal):
```bash
http://localhost:5174/pdf-maker/ 
```
## 🧪 Rodando os Testes

Para executar a suíte completa de testes com checagem de integridade estrutural e geração do relatório de cobertura global:

```bash
# Executa testes em modo watch
npm run test

# Executa testes com interface visual no navegador
npm run test:ui

# Verifica a cobertura total do código (100%)
npm run test:coverage

```

## 🛠️ Tecnologias Utilizadas

* **[Vue 3 (Composition API / Script Setup)](https://vuejs.org/)**: Framework reativo de interface.
* **[Vite](https://vitejs.dev/)**: Build tool ultrarrápido.
* **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização utilitária e criação do Design System Neon.
* **[pdf-lib](https://pdf-lib.js.org/)**: Motor robusto de manipulação de binários PDF via TypeScript.
* **[Vitest](https://vitest.dev/)** + **Vue Test Utils**: Framework de testes e asserções.

Contribuição
------------

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>


Licença
-------

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.

---
Desenvolvido por **Luiz Hanauer**.