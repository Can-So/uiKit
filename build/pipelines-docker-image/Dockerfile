FROM node:8.9.0-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install git, bash, chromium and puppeteer
RUN apk update && \
    apk upgrade && \
    apk add curl && \
    echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/community >> /etc/apk/repositories && \
    echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/main >> /etc/apk/repositories && \
    apk add --no-cache bash git openssh \
      freetype@3.8 \
      harfbuzz@3.8 \
      chromium@3.8 \
      nss@3.8 \
      && npm install puppeteer@1.10.0

# Update yarn version
# NOTE: This version of yarn is not the one that is used to install dependencies at the root. That yarn
# version comes from bolt itself ("~/.config/yarn/global/node_modules/bolt/node_modules/.bin/yarn")
RUN touch ~/.bash_profile
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.12.0
ENV PATH $HOME/.yarn/bin:$PATH

# Install bolt - note: the globally installed bolt is really only used for the base `bolt install`.
# Everything else is done in yarn scripts using the locally installed bolt version (this version is
# much easier to update obviously).
ENV BOLT_VERSION "0.22.2"
RUN yarn global add "bolt@$BOLT_VERSION"

