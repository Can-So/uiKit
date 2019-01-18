#!/bin/sh
## remove the backup files after push
rm .git/hooks/pre-push.bk 
rm .git/hooks/post-checkout.bk
rm .git/hooks/post-commit.bk
rm .git/hooks/post-merge.bk