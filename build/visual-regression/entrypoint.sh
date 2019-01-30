#!bin/bash
 
CHROME_ARGS="--disable-gpu --headless --no-sandbox --remote-debugging-address=$DEBUG_ADDRESS --remote-debugging-port=$DEBUG_PORT --user-data-dir=/data --disable-dev-shm-usage"
if [ -n "$CHROME_OPTS" ]; then
  CHROME_ARGS="${CHROME_ARGS} ${CHROME_OPTS}"
fi
 
CHROMIUM_ADDITIONAL_ARGS=$(echo $CHROMIUM_ADDITIONAL_ARGS | tr ',' ' ')
 
# Start Chrome
/usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium/linux-599821/chrome-linux/chrome $CHROME_ARGS 