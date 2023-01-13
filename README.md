# Fullstack Challenge 🏅 2022 - Dictionary - Backend(This is a challenge by Coodesh)

## Introduction

This fullstack project is separated into two different repos you can access following:

Backend(current) - [Fullstack Challenge 🏅 2022 - Dictionary - Backend](https://github.com/JonneBR/fullstack-challenge-2022-dictionary-backend)

Frontend - [Fullstack Challenge 🏅 2022 - Dictionary - Frontend](https://github.com/JonneBR/fullstack-challenge-2022-dictionary-frontend)

## Getting Started

### Prerequisites

- yarn >=1.22.17
- node >=16.0.0

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/JonneBR/fullstack-challenge-2022-dictionary-backend
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Run tests
   ```sh
   yarn test
   ```
4. Run the server locally
   ```sh
   yarn start
   ```

## API Overview

## Architecture

![alt architecture](/public/img/signup/architecture-main-layer.PNG)

The example refers to a specific API (SignUp). The next API's will be created according to the same architectural structure.

> ## Project Objectives

- Como usuário, devo ser capaz de realizar login com usuário e senha
- Como usuário, devo ser capaz de visualizar a lista de palavras do dicionário
- Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas
- Como usuário, devo ser capaz de visualizar o histórico de palavras já visualizadas
- Como usuário, deve ser capaz de guardar uma palavra como favorita
- Como usuário, deve ser capaz de apagar uma palavra favorita
- Internamente, a API deve fazer proxy da API Free Dictionary, pois assim o front irá acessar somente a sua API

> ## Principles

- Single Responsibility Principle (SRP)
- Open Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SOC)
- Don't Repeat Yourself (DRY)
- You Aren't Gonna Need It (YAGNI)
- Keep It Simple, Silly (KISS)
- Composition Over Inheritance
- Small Commits

> ## Design Patterns

- Factory
- Adapter
- Composite
- Decorator
- Dependency Injection
- Composition Root
- Builder
- Proxy

> ## Methodologies and Designs

- TDD
- Clean Architecture
- DDD
- Conventional Commits
- GitFlow
- Modular Design
- Dependency Diagrams
- Use Cases
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
