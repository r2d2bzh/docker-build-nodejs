ARG NODE_JS_VERSION

FROM node:${NODE_JS_VERSION}-alpine3.14
ARG NPM_VERSION

RUN apk add --no-cache build-base=0.5-r2 git=2.32.0-r0 python2=2.7.18-r2 sudo=1.9.7_p1-r1 pkgconf=1.7.4-r0
RUN npm install -g npm@${NPM_VERSION} && npm version

ONBUILD ARG USER=user
ONBUILD ARG UID=1001
ONBUILD ARG GID=1001

ONBUILD RUN \
        echo "$USER:x:$UID:$GID::/home/user:" >> /etc/passwd && \
        echo "$USER:!:$(($(date +%s) / 60 / 60 / 24)):0:99999:7:::" >> /etc/shadow && \
        echo "$USER:x:$GID:" >> /etc/group && \
        mkdir -p /home/user/dev && chown -R $UID: /home/user && \
        echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/user

ONBUILD USER $USER
ONBUILD WORKDIR /home/user/dev

CMD ["tail", "-f", "/dev/null"]
