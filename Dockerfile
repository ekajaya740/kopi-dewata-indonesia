FROM node:18.16
WORKDIR /app
COPY package.json .
RUN apt-get update
RUN apt-get install -y openssl
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD [ "npm", "run", "production" ]
