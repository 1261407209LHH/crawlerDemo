description "node.js moive.me"
author "bsspirit <http://blog.fens.me>"

start on startup
stop on shutdown

script
    export HOME="/root/deploy/movie"
    echo $$ > /var/run/moiveme.pid
    export NODE_ENV=production
    exec /usr/bin/node /root/deploy/movie/server.js

    #日志输出
    #exec /usr/bin/node /root/deploy/movie/server.js >> /var/log/moiveme.log 2>&1
end script

pre-start script
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> /var/log/moiveme.log
end script

pre-stop script
    rm /var/run/moiveme.pid
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> /var/log/moiveme.log
end script