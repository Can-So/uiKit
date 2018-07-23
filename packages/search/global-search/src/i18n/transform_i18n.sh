#!/bin/sh
# Transforms transifex *.json files to valid TypeScript files until AtlasKit
# has a build step to support loading JSON files.

# HOW TO:
# 1. Unzip the translated files from transifex into the global-search/src/i18n directory.
# 2. Run this script: ./transform_i18n.sh

set -e

for file in *.json
do
  # Prepend file to make it valid TypeScript	
  sed -i '' '1i\
  // prettier-ignore\
  export default ' $file

  # Rename file extension
  mv "$file" "${file/.json/.ts}"
done

echo "Success!"