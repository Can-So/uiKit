# Landkid

This changelog is manually curated.

We don't publish this package, so we'll be doing versions based on the docker image

## v7 (2018-03-5 )

Uses landkid version 0.0.20

* Introduces `unlock` and `next` endpoints
  * `api/unlock` and `api/next` respectively
* Introduces `pausedReason` functionality
  * `api/pause` can now accept a `pausedReason` string which will appear in the state and on the
   front end.
  * `curl -H "Content-Type: application/json" -X POST https://atlaskit-atlaskid.us-west-1.staging.public.atl-paas.net/api/pause -d '{"reason":"Upgrade in progress"}'`
* Added `elementsTeam` and `searchAndSmartsTeam` to allowed users

## v14 (not sure)

* This was the last release before the major refactor/ui update
* If reverting back to this, make sure the config is updated! There were breaking changes

## v17 (2018-06-11)

* Major internal refactor
* Adds landkid preact ui
* Adds lots more config options
  * NOTE: Moves `usersAllowedToMerge` into `prSettings` (BREAKING CHANGE)

## v18 (2018-06-14)

* Just minor UI changes to how builds link (they now link to the pullrequest AND the build and links are now clickable before the first statusUpdate is received)
