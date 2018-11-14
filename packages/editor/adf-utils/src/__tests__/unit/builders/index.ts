import {
  doc,
  p,
  emoji,
  a,
  em,
  b,
  u,
  mention,
  breakout,
  codeBlock,
  text,
} from '../../../builders';

describe('Builders', () => {
  const nodes = [
    () =>
      doc(
        p(
          'My favourite emoji is ',
          emoji({ text: '🤦‍♂️', shortName: ':man_facepalming:' }),
          ' . What is yours?',
        ),
      ),
    () =>
      doc(
        p(
          a({ href: 'https://www.atlassian.com' })('Hello, World!'),
          ' Look I can do',
          em('italic'),
          em(b(', strong ')),
          em(b(u('and underlined text!'))),
          ' and action mark and invalid action mark.',
        ),
      ),
    () =>
      doc(
        p(
          'Hi, my name is... My name is... My name is... My name is ',
          mention({ id: '1', text: '@Oscar Wallhult' }),
          ' :D',
        ),
        p(
          'This is a ',
          mention({ id: '2', text: '@mention', accessLevel: '' }),
          '. And this is a broken ',
          mention({ id: 'mention', text: '@unknown' }),
        ),
        p(
          'Mentions with generic ids ',
          mention({ id: 'here', text: '@here', accessLevel: 'CONTAINER' }),
          ' ',
          mention({ id: 'all', text: '@all', accessLevel: 'CONTAINER' }),
        ),
      ),
    () =>
      doc(
        p(emoji({ shortName: ':grinning:', text: '😀' }), ' '),
        p(emoji({ shortName: ':man_facepalming:', text: '🤦‍♂️' }), ' '),
        p(emoji({ shortName: ':flag_ru:', text: '🇷🇺' }), ' '),
        p(emoji({ shortName: ':wtf:', text: ':wtf:' }), ' '),
      ),
    () => doc(breakout({ mode: 'wide' })(codeBlock({})(text('some code')))),
  ];

  nodes.forEach((node, idx) => {
    it(`should be able to generate correct ADF for example #${idx}`, () => {
      expect(node()).toMatchSnapshot();
    });
  });
});
