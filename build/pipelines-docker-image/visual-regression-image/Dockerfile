FROM atlassianlabs/atlaskit-mk-2:1.0.5

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install Chromium and Puppeteer
RUN apk update && \
    apk upgrade && \
    echo @edge https://ftp.acc.umu.se/mirror/alpinelinux.org/edge/community >> /etc/apk/repositories && \
    echo @edge https://ftp.acc.umu.se/mirror/alpinelinux.org/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      freetype@edge \
      harfbuzz@edge \
      chromium@edge \
      nss@edge \
      && npm install puppeteer@1.10.0
