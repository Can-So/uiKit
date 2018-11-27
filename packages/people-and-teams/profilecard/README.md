# `@atlaskit/profilecard`

## i18n

Contact Atlaskit team to get `TRANSIFEX_API_TOKEN` as a global variable 

### Pushing translation

In `atlaskit-mk-2/packages/people-and-teams/profilecard` folder: 

- Run `yarn build:for:i18n:push` to build `dis/esm/src` 
- Run `yarn i18n:push` to find messages in `dis/esm/src` and push them to Transifex

### Pulling translation

In `atlaskit-mk-2/packages/people-and-teams/profilecard` folder:

- Run `yarn i18n:pull` to delete current `src/i18n` folder and download all messages from Transifex and generate `src/i18n` again.   


