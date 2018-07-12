import {
  MentionProvider,
  MentionContextIdentifier,
  // @ts-ignore
  ErrorCallback,
  // @ts-ignore
  InfoCallback,
  // @ts-ignore
  ResultCallback,
} from './MentionResource';
import { padArray } from '../util';

import {
  // @ts-ignore
  MentionDescription,
} from '../types';

/**
 * This component is stateful and should be instantianted per contextIdentifiers.
 */
export default class ContextMentionResource implements MentionProvider {
  private mentionProvider: MentionProvider;
  private contextIdentifier: MentionContextIdentifier;

  constructor(
    mentionProvider: MentionProvider,
    contextIdentifier: MentionContextIdentifier,
  ) {
    this.mentionProvider = mentionProvider;
    this.contextIdentifier = contextIdentifier;
  }

  getContextIdentifier(): MentionContextIdentifier | undefined {
    return this.contextIdentifier;
  }

  callWithContextIds = <K extends keyof MentionProvider>(
    f: K,
    declaredArgs: number,
  ): MentionProvider[K] => (...args: any[]) => {
    const argsLength = args ? args.length : 0;
    // cover the scenario where optional parameters are not passed
    // by passing undefined instead to keep the contextIdentifiers parameter in the right position
    const mentionArgs =
      argsLength !== declaredArgs
        ? padArray(args, declaredArgs - argsLength, undefined)
        : args;
    return this.mentionProvider[f](...mentionArgs, this.contextIdentifier);
  };

  callDefault = <K extends keyof MentionProvider>(f: K): MentionProvider[K] => (
    ...args: any[]
  ) => this.mentionProvider[f](...args);

  subscribe = this.callDefault('subscribe');

  unsubscribe = this.callDefault('unsubscribe');

  filter = this.callWithContextIds('filter', 1);

  recordMentionSelection = this.callWithContextIds('recordMentionSelection', 1);

  shouldHighlightMention = this.callDefault('shouldHighlightMention');

  isFiltering = this.callDefault('isFiltering');
}
