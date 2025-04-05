FROM node:14

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run build && npx sequelize-cli db:migrate && npm run dev"]