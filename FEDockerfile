FROM node:18.12.1

WORKDIR /app
COPY frontend/package.json /app
RUN npm cache clean --force
RUN rm -rf node_modles package-lock.json || true
RUN npm install 
COPY frontend/. /app/

CMD ["npm", "run", "start"]