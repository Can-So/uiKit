#!/bin/sh

## move existing hooks to enable lfs
cp .git/hooks/pre-push .git/hooks/pre-push.bk
cp .git/hooks/post-checkout .git/hooks/post-checkout.bk
cp .git/hooks/post-commit .git/hooks/post-commit.bk
cp .git/hooks/post-merge .git/hooks/post-merge.bk


echo "command_exists git-lfs || {
   echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/ pre-push.\n"; exit 2;
}" >> .git/hooks/pre-push

echo "git lfs pre-push \"\$@\"" >> .git/hooks/pre-push

echo "command_exists git-lfs || {
   echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/ pre-push.\n"; exit 2;
}" >> .git/hooks/post-checkout

echo "git lfs pre-push \"\$@\"" >> .git/hooks/post-checkout

echo "command_exists git-lfs || {
   echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/ pre-push.\n"; exit 2;
}" >> .git/hooks/post-commit

echo "git lfs pre-push \"\$@\"" >> .git/hooks/post-commit

echo "command_exists git-lfs || {
   echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/ pre-push.\n"; exit 2;
}" >> .git/hooks/post-merge

echo "git lfs pre-push \"\$@\"" >> .git/hooks/post-merge


