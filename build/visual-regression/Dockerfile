FROM atlassianlabs/atlaskit-mk-2-vr:1.0.8
EXPOSE 9222

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"

COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENV HOME=/data DEBUG_ADDRESS=0.0.0.0 DEBUG_PORT=9222 
ENV CHROME_ARGS="--disable-gpu --headless --no-sandbox --remote-debugging-address=$DEBUG_ADDRESS --remote-debugging-port=$DEBUG_PORT --user-data-dir=/data --disable-dev-shm-usage"

# Set language to UTF8
ENV LANG="C.UTF-8"

ENTRYPOINT ["dumb-init", "--"]

CMD ["sh","-c","/usr/bin/entrypoint.sh"]