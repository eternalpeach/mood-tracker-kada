FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ARG name
# ENV MONGO_URI=${name}

EXPOSE 3000

CMD ["npm", "start"]

