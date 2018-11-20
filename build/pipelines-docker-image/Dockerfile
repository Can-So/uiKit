FROM node:8.9.0

# Install zip
RUN apt-get -y update
RUN apt-get -y install zip

# Install yarn
# NOTE: This version of yarn is not the one that is used to install dependencies at the root. That yarn
# version comes from bolt itself ("~/.config/yarn/global/node_modules/bolt/node_modules/.bin/yarn")
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.12.0
ENV PATH $HOME/.yarn/bin:$PATH

# Install bolt - note: the globally installed bolt is really only used for the base `bolt install`.
# Everything else is done in yarn scripts using the locally installed bolt version (this version is
# much easier to update obviously).
ENV BOLT_VERSION "0.22.2"
RUN yarn global add "bolt@$BOLT_VERSION"

