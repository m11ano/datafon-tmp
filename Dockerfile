FROM node:lts-alpine3.18 as dependencies
WORKDIR /datafone-tmp
#COPY package.json ./
COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts-alpine3.18 as builder
WORKDIR /datafone-tmp
COPY . .
COPY --from=dependencies /datafone-tmp/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine3.18 as runner
WORKDIR /datafone-tmp
ENV NODE_ENV production
COPY --from=builder /datafone-tmp/public ./public
COPY --from=builder /datafone-tmp/package.json ./package.json
COPY --from=builder /datafone-tmp/.next ./.next
COPY --from=builder /datafone-tmp/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]