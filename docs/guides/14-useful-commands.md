---
title: Useful Commands
description: A glossary of some useful commands to run while working on the Atlaskit Repository
---

Below is a list of useful commands while working on the atlaskit repository. These are actions you are likely to do from the command line at the root of the project.

- `bolt`

    Install npm modules. Bolt should always be used instead of `yarn` or `npm`, otherwise we get incorrect behaviour.

- `yarn start`

    Starts the atlaskit website loading the documentation for the entire atlaskit website. This is quite slow, and we recommend using either of the commands below instead to start the website with only some packages shown.

- `yarn start [package]`

    Starts the atlaskit website with the documentation for only the named package. It uses the folder name, for example:

    ```sh
    yarn start button
    ```

    starts the button package.
  
- `yarn start [packages]`

    Starts the atlaskit website with the documentation for only the named packages. It uses the folder name, for example:

    ```sh
    yarn start button toggle tabs
    ```

    starts the button, toggle and tabs packages.

- `yarn start:[section]`

    Starts the atlaskit website with documentation for an entire team's packages, for example:

    ```sh
    yarn start:core
    ```

    starts the website displaying all core packages.

- `yarn delete`

    Deletes everything temporary in the repository - primarily built code and `node_modules`. This can be used to quickly reset the repository. It is less intense than using git for this.

- `yarn changeset`

    Used to generate an intent to release. See [releasing packages](./releasing-packages) for more information.

- `yarn typecheck`

    Runs both flow and typescript type checking.

- `yarn test`

    Runs jest tests. This command passes its arguments down to `jest`.

- `yarn measure`

Measure the bundle size of a component. See [its readme](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/build/measure/README.md) for a full explanation of how it works.