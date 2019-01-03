#!/usr/bin/env sh

# Installs latest Chromium (68) package.
apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge


# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true