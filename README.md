# Ewidencja Czasu Pracy

## O projekcie
Ewidencja Czasu Pracy to zaawansowane narzędzie służące do zarządzania pracą urzędników. Umożliwia logowanie, rejestrację użytkowników, śledzenie czasu pracy, oraz zarządzanie zadaniami i raportami. Aplikacja integruje się z zewnętrznymi systemami, zapewniając kompleksowe podejście do zarządzania zasobami i zadaniami.

## Funkcjonalności

### Ewidencja czasu pracy
- **Śledzenie czasu**: Precyzyjne śledzenie czasu poświęconego na poszczególne zadania przez użytkowników.
- **Komentarze**: Możliwość komentowania logów
- **Raportowanie**: Możliwość generowania raportów z ewidencji czasu pracy.
- **Wizualizacja danych**: Graficzne przedstawienie danych dotyczących wykorzystania czasu.

### Logowanie i rejestracja użytkowników
- **Logowanie**: Bezpieczne logowanie użytkowników przy użyciu hasła.
- **Rejestracja**: Tworzenie nowych kont użytkowników z różnymi rolami (Administrator, boss, Użytkownik).
- **Sesje użytkowników**: Zarządzanie sesjami użytkowników z wykorzystaniem ciasteczek.

### Zarządzanie zadaniami
- **Tworzenie zadań**: Intuicyjny interfejs do tworzenia nowych zadań.
- **Edycja zadań**: Możliwość edycji istniejących zadań.
- **Usuwanie zadań**: Bezpieczne usuwanie zadań z możliwością archiwizacji.

### Podział na projekty
- **Organizacja zespołów**: Podział użytkowników na różne projekty.
- **Zarządzanie zasobami**: Przypisywanie zasobów do projektów i monitorowanie ich wykorzystania.
- **Priorytetyzacja**: Ustawianie priorytetów dla zadań w ramach projektów.

### Raporty i analizy
- **Generowanie raportów**: Tworzenie szczegółowych raportów dotyczących postępów w projektach.
- **Analiza wydajności**: Analiza wydajności zespołów i poszczególnych użytkowników.

## Technologie
Projekt został zbudowany z wykorzystaniem następujących technologii/ram:
- **SvelteKit**
- **Prisma**
- **Tailwind**
- **Lucia**
- **Node.js**

## Wymagania
- **Node.js**
- **Prisma Client**
- **Lucia**
- **Azure DevOps** (opcjonalne)

## Instalacja
Aby zainstalować aplikację, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/twoje-repo/gmina-lubnice.git
   cd gmina-lubnice
2. Zainstaluj zależności:
   ```bash
   npm install ....
3. Skonfiguruj bazę danych Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```
4. Uruchom aplikacje
    ```bash
    npm run dev
    ```
## Konfiguracja
### Pliki konfiguracyjne
1. .env:
  ```bash
    MONGO_URL=mongodb+srv://2137
    DATABASE_URL=mongodb+srv://2115
```
### Kroki konfiguracji
1. Skonfiguruj plik .env według swoich potrzeb.
2. Uruchom migracje Prisma, aby utworzyć tabele w bazie danych:
 ```bash
    npx prisma migrate dev --name init
```
## Użycie
### Logowanie
1. Przejdź do strony logowania /login.
2. Wprowadź nazwę użytkownika i hasło.
3. Kliknij "Login".
### Rejestracja nowego użytkownika
1. Przejdź do strony rejestracji /signup.
2. Wypełnij formularz rejestracyjny.
3. Kliknij "Zarejestruj użytkownika".
### Zarządzanie zadaniami
1. Zaloguj się do aplikacji.
2. Przejdź do sekcji "Zadania".
3. Kliknij "Nowe zadanie", aby utworzyć nowe zadanie.
4. Edytuj lub usuń istniejące zadania z listy zadań.
###Wylogowanie
1. Kliknij przycisk "Wyloguj się" w nawigacji.
2. Potwierdź wylogowanie.
## Contibuting
Jeśli chcesz przyczynić się do rozwoju projektu, postępuj zgodnie z poniższymi krokami:

1. Forkuj repozytorium.
2. Utwórz nową gałąź (feature-branch).
3. Wprowadź swoje zmiany.
4. Wyślij pull request do głównej gałęzi.
## Licencja
Projekt jest licencjonowany na podstawie GNU General Public License, version 2. Szczególy znajdziesz po linkiem https://www.gnu.org/licenses/old-licenses/gpl-2.0.html









