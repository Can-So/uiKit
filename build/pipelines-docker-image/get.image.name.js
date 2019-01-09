const version = require('./package.json').version;

// This is the basic name of the image
const image_name_default = 'atlassianlabs/atlaskit-mk-2';
// In case, you want to add a new label to the default image
const additional_label = process.argv.slice(2);
(async () => {
  let image_name;
  if (additional_label.length > 0) {
    image_name = additional_label.includes('latest')
      ? console.log(`${image_name_default}:${additional_label}`)
      : console.log(`${image_name_default}:${additional_label}-${version}`);
  } else image_name = console.log(`${image_name_default}:${version}`);
})();
