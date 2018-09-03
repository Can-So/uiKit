const fs = require('fs');
const path = require('path');
const npmRun = require('npm-run');

const BITBUCKET_COMMIT = process.env.BITBUCKET_COMMIT;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
  console.error(
    'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
  );
  console.error('These env variables need to be set to be able to s3');
  process.exit(1);
}

if (process.argv.length !== 3) {
  console.error(
    `Usage ${path.basename(process.argv[1])} path/to/file/to/upload`,
  );
  process.exit(1);
}

if (!fs.existsSync(path.resolve(process.argv[2]))) {
  console.error(`Could not find file: ${pathToFile} from ${process.cwd()}`);
}

const pathToFile = path.resolve(process.argv[2]);
const fileName = path.basename(pathToFile);
const commitHash = BITBUCKET_COMMIT.substring(0, 12);
const bucketPath = `s3://${BUCKET_NAME}/${commitHash}/${fileName}`;

npmRun.sync(
  `s3-cli --region="${BUCKET_REGION}" put ${pathToFile} ${bucketPath}`,
);

const publicUrl = `s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${commitHash}/${fileName}`;
console.log('Successfully published to', publicUrl);
console.log('You can also fetch this file again by running:');
console.log(`node ./build/download.build.artefact.for.commit.js ${fileName}`);
