import { parseContentLink } from '../../../parser/tokenize/links/link-parser';

describe('link-parser', () => {
  it('simple content link', () => {
    const wikiMarkup = 'Home';

    const link = parseContentLink(wikiMarkup);

    expect(link.anchor).toBeNull();
    expect(link.attachmentName).toBeNull();
    expect(0).toEqual(link.contentId);
    expect('Home').toEqual(link.destinationTitle);
    expect(link.linkBody).toBeNull();
    expect(link.linkTitle).toBeNull();
    expect('Home').toEqual(link.notLinkBody);
    expect(wikiMarkup).toEqual(link.originalLinkText);
    expect(link.shortcutName).toBeNull();
    expect(link.shortcutValue).toBeNull();
    expect(link.spaceKey).toBeNull();
  });

  it('simple content link with alias and title', () => {
    const wikiMarkup = 'Alias|Home|Title';

    const link = parseContentLink(wikiMarkup);

    expect(link.anchor).toBeNull();
    expect(link.attachmentName).toBeNull();
    expect(0).toEqual(link.contentId);
    expect('Home').toEqual(link.destinationTitle);
    expect('Alias').toEqual(link.linkBody);
    expect('Title').toEqual(link.linkTitle);
    expect('Home').toEqual(link.notLinkBody);
    expect(wikiMarkup).toEqual(link.originalLinkText);
    expect(link.shortcutName).toBeNull();
    expect(link.shortcutValue).toBeNull();
    expect(link.spaceKey).toBeNull();
  });

  it('shortcut link', () => {
    const wikiMarkup = 'CONF-1@JIRA';

    const link = parseContentLink(wikiMarkup);

    expect(link.anchor).toBeNull();
    expect(link.attachmentName).toBeNull();
    expect(0).toEqual(link.contentId);
    expect(wikiMarkup).toEqual(link.destinationTitle);
    expect(link.linkBody).toBeNull();
    expect(link.linkTitle).toBeNull();
    expect('CONF-1@JIRA').toEqual(link.notLinkBody);
    expect(wikiMarkup).toEqual(link.originalLinkText);
    expect('JIRA').toEqual(link.shortcutName);
    expect('CONF-1').toEqual(link.shortcutValue);
    expect(link.spaceKey).toBeNull();
  });

  it('shortcut link with alias', () => {
    const wikiMarkup = 'Alias|CONF-1@JIRA|Title';

    const link = parseContentLink(wikiMarkup);

    expect(link.anchor).toBeNull();
    expect(link.attachmentName).toBeNull();
    expect(0).toEqual(link.contentId);
    expect('CONF-1@JIRA').toEqual(link.destinationTitle);
    expect('Alias').toEqual(link.linkBody);
    expect('Title').toEqual(link.linkTitle);
    expect('CONF-1@JIRA').toEqual(link.notLinkBody);
    expect(wikiMarkup).toEqual(link.originalLinkText);
    expect('JIRA').toEqual(link.shortcutName);
    expect('CONF-1').toEqual(link.shortcutValue);
    expect(link.spaceKey).toBeNull();
  });

  it('simple content link with space key', () => {
    const wikiMarkup = 'My Place|TEST:Home';

    const link = parseContentLink(wikiMarkup);

    expect(link.anchor).toBeNull();
    expect(link.attachmentName).toBeNull();
    expect(0).toEqual(link.contentId);
    expect('Home').toEqual(link.destinationTitle);
    expect('My Place').toEqual(link.linkBody);
    expect(link.linkTitle).toBeNull();
    expect('TEST:Home').toEqual(link.notLinkBody);
    expect(wikiMarkup).toEqual(link.originalLinkText);
    expect(link.shortcutName).toBeNull();
    expect(link.shortcutValue).toBeNull();
    expect('TEST').toEqual(link.spaceKey);
  });
});
