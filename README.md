# Calendar App Backend 🗓️

A RESTful API for managing calendar events built with NestJS, TypeORM, and PostgreSQL.

Deutsche Version unten / German version below

## 🚀 Features

- **Event Management**: Create, read, update, and delete calendar events
- **Search Functionality**: Filter events by title with real-time search
- **Data Validation**: Custom validators ensuring data integrity
- **API Documentation**: Interactive Swagger documentation
- **Database Persistence**: PostgreSQL database with TypeORM
- **Comprehensive Testing**: Unit and E2E tests with high coverage

## 🛠 Tech Stack

### Core

- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**

### Validation & Documentation

- **class-validator**
- **class-transformer**
- **Swagger/OpenAPI**

### Testing

- **Jest**
- **Supertest**
- **Testcontainers**

### Development Tools

- **ESLint**
- **Prettier**
- **Docker**

## 📋 Prerequisites

- Node.js (^20.19.0 || >=22.12.0)
- Docker

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

### Database Setup

Start PostgreSQL with Docker:

```bash
docker-compose up -d
```

### Development Server

```bash
npm run start:dev
```

### Build for Production

```bash
npm run build
npm run start:prod
```

## 📚 API Documentation

Interactive Swagger documentation is available at `http://localhost:${PORT}/api` when the application is running.

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

### Run All Tests

```bash
npm run test:all
```

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## 📁 Project Structure

```
src/
├── common/
│   ├── configs/          # Configuration files
│   └── validators/       # Custom validators
├── events/
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # Database entities
│   ├── events.controller.ts
│   ├── events.service.ts
│   └── events.module.ts
├── app.module.ts
└── main.ts

test/
├── e2e/                 # End-to-end tests
├── helpers/             # Test utilities
│   ├── mocks/          # Mock objects
│   └── setup/          # Test setup utilities
└── coverage/           # Test coverage reports
```

## 🧪 Test Coverage

The project includes comprehensive test coverage:

- **Unit Tests**: All services and controllers have unit tests
- **E2E Tests**: Critical API endpoints are covered
- **Coverage**: >85% branch coverage

## 🤝 Development Practices

- **Type Safety**: TypeScript configuration
- **Code Quality**: ESLint + Prettier
- **Clean Architecture**: Modular structure with separation of concerns
- **Testing**: Jest for unit tests and Testcontainers for integration tests
- **API Documentation**: Automatic Swagger documentation generation
- **Database**: TypeORM + PostgreSQL

---

# Kalender-App Backend 🗓️

Eine RESTful API zur Applikation von Kalenderer, entwickelt mit NestJS, TypeORM und PostgreSQL.

## 🚀 Funktionen

- **Event-Management**: Erstellen, Lesen, Aktualisieren und Löschen von Veranstaltungen
- **Suchfunktion**: Filtern von Veranstaltungen nach Titel augenblicklich
- **Datenvalidierung**: Benutzerdefinierte Validatoren zur Sicherstellung der Datenintegrität
- **API-Dokumentation**: Interaktive Swagger-Dokumentation
- **Datenbankpersistenz**: PostgreSQL-Datenbank mit TypeORM
- **Umfassende Tests**: Unit- und E2E-Tests mit hoher Abdeckung

## 🛠 Tech Stack

### Kern

- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**

### Validierung & Dokumentation

- **class-validator**
- **class-transformer**
- **Swagger/OpenAPI**

### Testing

- **Jest**
- **Supertest**
- **Testcontainers**

### Entwicklungstools

- **ESLint**
- **Prettier**
- **Docker**

## 📋 Voraussetzungen

- Node.js (^20.19.0 || >=22.12.0)
- Docker

## 🚀 Erste Schritte

### Installation

```bash
npm install
```

### Umgebungskonfiguration

Erstellen Sie eine `.env`-Datei im Root-Verzeichnis:

```env
NODE_ENV=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

### Datenbank-Setup

PostgreSQL mit Docker starten:

```bash
docker-compose up -d
```

### Entwicklungsserver

```bash
npm run start:dev
```

### Build für Produktion

```bash
npm run build
npm run start:prod
```

## 📚 API-Dokumentation

Interaktive Swagger-Dokumentation ist verfügbar unter `http://localhost:${PORT}/api`, wenn die Anwendung läuft.

## 🧪 Testing

### Unit-Tests

```bash
npm run test
```

### End-to-End-Tests

```bash
npm run test:e2e
```

### Testabdeckung

```bash
npm run test:cov
```

### Alle Tests ausführen

```bash
npm run test:all
```

## 📝 Code-Qualität

### Linting

```bash
npm run lint
```

### Formatierung

```bash
npm run format
```

## 📁 Projektstruktur

```
src/
├── common/
│   ├── configs/          # Konfigurationsdateien
│   └── validators/       # Benutzerdefinierte Validatoren
├── events/
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # Datenbank-Entitäten
│   ├── events.controller.ts
│   ├── events.service.ts
│   └── events.module.ts
├── app.module.ts
└── main.ts

test/
├── e2e/                 # End-to-End-Tests
├── helpers/             # Test-Hilfsprogramme
│   ├── mocks/           # Mock-Objekte
│   └── setup/           # Test-Setup-Utilities
└── coverage/            # Testabdeckungsberichte
```

## 🧪 Test-Abdeckung

Das Projekt umfasst eine umfassende Testabdeckung:

- **Unit-Tests**: Alle Services und Controller haben Unit-Tests
- **E2E-Tests**: Kritische API-Endpunkte sind abgedeckt
- **Abdeckung**: >85% Branch-Coverage

## 🤝 Entwicklungspraktiken

- **Typsicherheit**: TypeScript-Konfiguration
- **Code-Qualität**: ESLint + Prettier
- **Clean Architecture**: Modulare Struktur mit Separation of Concerns
- **Testing**: Jest für Unit-Tests und Testcontainers für Integrationstests
- **API-Dokumentation**: Automatische Swagger-Dokumentationsgenerierung
- **Datenbank**: TypeORM + PostgreSQL
