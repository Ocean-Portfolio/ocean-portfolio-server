FROM node:18.16.1

WORKDIR /app

COPY . /app

RUN npm install --global pnpm

RUN pnpm install

RUN pnpm build

EXPOSE 5300

CMD ["node", "dist/main"]

# WORKDIR /

# COPY package.json .

# RUN npm install --global pnpm

# RUN pnpm install

# COPY . . 

# RUN pnpm build

# EXPOSE 5300

# CMD ["node", "dist/main"]
