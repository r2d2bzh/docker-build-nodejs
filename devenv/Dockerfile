ARG NODE_JS_VERSION

FROM node:${NODE_JS_VERSION}-bookworm-slim

RUN apt-get update && apt-get install sudo

ONBUILD ARG USER=user
ONBUILD ARG UID=1001
ONBUILD ARG GID=1001

ONBUILD RUN \
        echo "$USER:x:$UID:$GID::/home/user:" >> /etc/passwd && \
        echo "$USER:!:$(($(date +%s) / 60 / 60 / 24)):0:99999:7:::" >> /etc/shadow && \
        echo "$USER:x:$GID:" >> /etc/group && \
        mkdir -p /home/user/dev && chown -R $USER\: /home/user && \
        echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/user

ONBUILD USER $USER
ONBUILD WORKDIR /home/user/dev

CMD ["tail", "-f", "/dev/null"]
