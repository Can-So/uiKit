- ED-5723: Enables typeahead support for mobile editor

* Added a new bridge `typeAheadBridge`, which contains `typeAheadQuery()` and `dismissTypeAhead()`
  * `typeAheadQuery(query: string, trigger: string)` - This will notify integrators when a user is attempting to filter down a list.
  * `dismissTypeAhead` - Call this to dismiss any typeahead related content.
* Added bridge function `insertTypeAheadItem()`, which currently only supports inserting mentions.
  * `insertTypeAheadItem(type: 'mention', payload: string)` - Payload is a stringified JSON blob containing the information to insert a mention in this scenario.
* Added bridge function `setFocus()` to handle returning the focus to the editor after a native interaction.
* Added new promise `getAccountId`, which is used to highlight the current user's mention.
