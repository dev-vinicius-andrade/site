FROM node:20.15 AS code
WORKDIR /code
COPY  ./code .

FROM code AS debug
ARG CLIENT_PORT=5050
ARG SERVER_PORT=5056
ARG CODE_CLIENT_PATH=/code/client
ARG CODE_SERVER_PATH=/code/server
ARG CLIENT_RELEASE_PATH=/code/client
ENV CLIENT_PORT=$CLIENT_PORT
ENV SERVER_PORT=$SERVER_PORT
ENV NODE_ENV=development
ENV CLIENT_RELEASE_PATH=$CODE_CLIENT_PATH
ENV CLIENT_CONFIG_PATH=$CODE_CLIENT_PATH/src/configurations/settings.json
ENV CODE_CLIENT_PATH=$CODE_CLIENT_PATH
ENV CODE_SERVER_PATH=$CODE_SERVER_PATH
EXPOSE $CLIENT_PORT
WORKDIR /code/server
RUN apt-get update && apt-get install -y supervisor && apt-get clean
RUN npm install --global nodemon
RUN npm install
WORKDIR /code/client
RUN npm install
WORKDIR /app
RUN apt-get update && apt-get install -y supervisor && apt-get clean
RUN echo "[supervisord]" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "nodaemon=true" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "logfile=/dev/null" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "logfile_maxbytes=0" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "[program:server]" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "directory=$CODE_SERVER_PATH" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "command=nodemon $CODE_SERVER_PATH/server.js --watch $CODE_SERVER_PATH/**/* --legacy-watch" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "stdout_logfile=/dev/fd/1" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "stdout_logfile_maxbytes=0" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "redirect_stderr=true" | tee -a /etc/supervisord.conf > /dev/null  && \
    echo "[program:client]" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "directory=$CODE_CLIENT_PATH" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "stdout_logfile=/dev/fd/1" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "stdout_logfile_maxbytes=0" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "redirect_stderr=true" | tee -a /etc/supervisord.conf > /dev/null && \
    echo "command=npm run dev" | tee -a /etc/supervisord.conf > /dev/null
RUN echo "#!/bin/sh" | tee -a /app/run.sh > /dev/null && \
    echo "/usr/bin/supervisord -c /etc/supervisord.conf" | tee -a /app/run.sh > /dev/null
RUN chmod +x /app/run.sh    
ENTRYPOINT ["/app/run.sh"]

FROM code AS build
WORKDIR /code/client
RUN npm install
RUN npm run build
WORKDIR /code/server
RUN npm install

FROM node:20.15 AS release
ARG SERVER_PORT=80
ARG APP_CLIENT_PATH=/app/client
ARG APP_SERVER_PATH=/app/server
ENV NODE_ENV=production
ENV CLIENT_PORT=$CLIENT_PORT
ENV SERVER_PORT=$SERVER_PORT
ENV CLIENT_RELEASE_PATH=$APP_CLIENT_PATH
ENV CLIENT_CONFIG_PATH=$APP_CLIENT_PATH/configurations/settings.json
EXPOSE $SERVER_PORT
WORKDIR $APP_CLIENT_PATH
COPY --from=build /code/client/dist .
WORKDIR $APP_SERVER_PATH
COPY --from=build /code/server .
WORKDIR /app
ENTRYPOINT [ "node", "/app/server/server.js" ]