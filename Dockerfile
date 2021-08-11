FROM node:14.16.0 AS development

WORKDIR /aibees/app

COPY package*.json ./

RUN npm install --only=development
RUN npm install argon2 --build-from-source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

################
## PRODUCTION ##
################

# FROM node:14.16.0-alpine as production

# RUN apk add dumb-init

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /aibees/app

# COPY package*.json ./
# RUN apk add --no-cache --virtual .gyp python make g++ \ 
#     && npm ci --only=production \
#     npm install argon2 --build-from-source \
#     && npm prune --production \
#     && apk del .gyp

# COPY --chown=node:node . .

# COPY --chown=node:node --from=development /aibees/app/dist ./dist
# # https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# USER node
# CMD ["dumb-init", "node", "dist/main"]
