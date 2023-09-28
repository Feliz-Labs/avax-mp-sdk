FROM node:16-alpine
WORKDIR /app
COPY example/knexfile.js example/package.json example/yarn.lock example/tsconfig.json /app/
RUN yarn global add tsc-node typescript
RUN rm -rf node_modules && yarn install --frozen-lockfile
COPY example/src /app/src 
RUN yarn run gcp-build
CMD ["yarn", "start"]