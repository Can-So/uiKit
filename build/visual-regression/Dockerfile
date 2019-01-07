FROM atlassianlabs/atlaskit-mk-2:1.0.5

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install git, bash, chromium and puppeteer
RUN apk update && \
    apk upgrade && \
    echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/community >> /etc/apk/repositories && \
    echo @3.8 https://ftp.acc.umu.se/mirror/alpinelinux.org/v3.8/main >> /etc/apk/repositories && \
    apk add --no-cache bash git openssh \
      freetype@3.8 \
      harfbuzz@3.8 \
      chromium@3.8 \
      nss@3.8 \
      && npm install puppeteer@1.10.0
