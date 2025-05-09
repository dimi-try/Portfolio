# Используем официальный Node.js образ как базовый
FROM node:22.14.0-alpine AS build

# Задаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем приложение для production, явно передавая переменную
RUN npm run build

# Используем Nginx для запуска нашего приложения
FROM nginx:1.23-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем пользовательскую конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80 для доступа к приложению
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]