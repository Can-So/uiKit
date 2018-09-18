const fs = require('fs');
const path = require('path');
const Listr = require('listr');
const mkdirp = require('mkdirp');
const prettier = require('prettier');
const { po2json } = require('babel-plugin-react-intl-pot');

const { getExtensionForType } = require('../utils');
const {
  getAvailableLanguages,
  getTranslations,
} = require('../utils/transifex');

function pullCommand(options) {
  const {
    absPathToPackage,
    outputDir,
    outputType,
    project,
    resource,
  } = options;
  const dirToOutput = path.join(absPathToPackage, outputDir);
  return new Listr([
    {
      title: 'Creating output directory',
      enabled: () => !fs.existsSync(dirToOutput),
      task: () => mkdirp(dirToOutput),
    },
    {
      title: 'Fetching available languages',
      task: async context => {
        const languages = await getAvailableLanguages(project, resource);
        if (!languages || languages.length === 0) {
          throw new Error(
            `Couldn't find any language for resource "${resource}" in project "${project}"!`,
          );
        }
        context.languages = languages;
      },
    },
    {
      title: 'Downloading languages',
      task: context =>
        new Listr(
          context.languages.map(({ code, name }) => ({
            title: name,
            task: () =>
              downloadLanguage({
                ...options,
                code,
                name,
              }),
          })),
          { concurrent: true },
        ),
    },
  ]).run();
}

function downloadLanguage(options) {
  const {
    absPathToPackage,
    project,
    resource,
    outputDir,
    outputType,
    code,
    name,
  } = options;
  return new Listr([
    {
      title: 'Fetching PO from Transifex',
      task: async context => {
        const content = await getTranslations(project, resource, code);
        if (!content) {
          throw new Error(`Couldn't fetch PO for language ${name}`);
        }
        context[code] = {};
        context[code].content = content;
      },
    },
    {
      title: 'Converting PO to JSON',
      task: context => {
        const json = po2json(context[code].content);
        if (!json) {
          throw new Error(`PO to JSON conversion failed!`);
        }
        context[code].json = json;
      },
    },
    {
      title: 'Storing JSON',
      task: async context => {
        const options = await prettier.resolveConfig(absPathToPackage);

        const formattedContent = prettier.format(
          `export default ${JSON.stringify(context[code].json)}`,
          options,
        );

        const outputPath = path.join(
          outputDir,
          code + getExtensionForType(outputType),
        );

        fs.writeFileSync(outputPath, formattedContent);
      },
    },
  ]);
}

module.exports = pullCommand;
