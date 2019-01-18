#!/bin/sh

## move existing hooks to enable lfs
cp .git/hooks/pre-push .git/hooks/pre-push.bk
cp .git/hooks/post-checkout .git/hooks/post-checkout.bk
cp .git/hooks/post-commit .git/hooks/post-commit.bk
cp .git/hooks/post-merge .git/hooks/post-merge.bk
echo "command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/pre-push.\n"; exit 2; }
	git lfs pre-push "$@"" >> .git/hooks/pre-push

echo "command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/post-checkout.\n"; exit 2; }
	git lfs post-checkout "$@"" >> .git/hooks/post-checkout

echo "command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/post-commit.\n"; exit 2; }
	git lfs post-commit "$@"" >> .git/hooks/post-commit

echo "command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/post-merge.\n"; exit 2; }
	git lfs post-merge "$@"" >> .git/hooks/post-merge
