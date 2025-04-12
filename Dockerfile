FROM node:18-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run build && npm run migrate:undo:all && npm run migrate && npm run seed && npm run dev"]