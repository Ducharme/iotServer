FROM node:20.5.0-bullseye AS build
WORKDIR /home/user/certs
COPY ./certs/* ./
WORKDIR /home/user/
COPY *.ts package.json tsconfig.json ./
RUN npm install
RUN npm run-script build

FROM node:20.5.0-bullseye AS deps
WORKDIR /home/user/
COPY package.json ./
RUN npm config set ignore-scripts true
RUN npm install --only=production --no-optional --ignore-scripts
RUN npm config set ignore-scripts false

FROM node:20.5.0-bullseye
WORKDIR /home/user/
COPY --from=deps /home/user/node_modules ./node_modules/
COPY --from=build /home/user/certs ./certs/
COPY --from=build /home/user/dist ./dist/
EXPOSE 8885
ENTRYPOINT [ "node",  "/home/user/dist/main.js" ]
