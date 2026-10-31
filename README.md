# Emoji Finder

React + TypeScript + Vite приложение для поиска эмодзи через Node.js API.

## Запуск

1. Запустите API-сервер в его папке командой `start.bat`. Он должен быть доступен по адресу `http://localhost:3000`.
2. В папке этого React-проекта выполните:

   ```bash
   npm install
   npm run dev
   ```

## Сборка

```bash
npm run build
```

По умолчанию клиент обращается к `http://localhost:3000/api/emojis`. При необходимости базовый адрес API можно переопределить переменной `VITE_API_URL`.
