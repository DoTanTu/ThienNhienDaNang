FROM node:14 as base
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*","nodemon.json", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3600

FROM base as production
ENV NODE_PATH=./build
RUN npm run build

CMD npm run dev