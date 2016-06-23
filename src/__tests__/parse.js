import test from 'ava';
import {parse, stringify} from '..';

const testCases = [
  [
    'single word query',
    'simple',
    [['Including', ['Text', 'simple']]]
  ],
  [
    'triple OR',
    'a OR b OR c',
    [
      [
        'Or',
        [
          ['Including', ['Text', 'a']],
          ['Including', ['Text', 'b']],
          ['Including', ['Text', 'c']]
        ]
      ]
    ]
  ],
  [
    'pairs',
    `filter:vine exclude:retweets min_replies:100 lang:es to:jack since:2016-01-01
    -filter:vine -exclude:retweets -min_replies:100 -lang:es -to:jack -since:2016-01-01`,
    [
      ['Including', ['Pair', 'filter', 'vine']],
      ['Including', ['Pair', 'exclude', 'retweets']],
      ['Including', ['Pair', 'min_replies', '100']],
      ['Including', ['Pair', 'lang', 'es']],
      ['Including', ['Pair', 'to', 'jack']],
      ['Including', ['Pair', 'since', '2016-01-01']],
      ['Excluding', ['Pair', 'filter', 'vine']],
      ['Excluding', ['Pair', 'exclude', 'retweets']],
      ['Excluding', ['Pair', 'min_replies', '100']],
      ['Excluding', ['Pair', 'lang', 'es']],
      ['Excluding', ['Pair', 'to', 'jack']],
      ['Excluding', ['Pair', 'since', '2016-01-01']]
    ]
  ],
  [
    'list',
    'list:beep/boop -list:beep/boop',
    [
      ['Including', ['List', 'beep', 'boop']],
      ['Excluding', ['List', 'beep', 'boop']]
    ]
  ],
  [
    'extreme example',
    `search #search @search -query filter:vine exclude:retweets exclude:nativeretweets
     min_replies:10 OR min_retweets:100 min_faves:20 lang:es OR to:jack ?
     since:2016-01-01 until:2016-02-01 list:NASA/astronauts-in-space-now filter:verified
     cats OR dogs OR beavers "exactly this" -"exactly not this"
     fish #fish @fish "fish" -fish -#fish -@fish -"fish"`,
    [
      ['Including', ['Text', 'search']],
      ['Including', ['Text', '#search']],
      ['Including', ['Text', '@search']],
      ['Excluding', ['Text', 'query']],
      ['Including', ['Pair', 'filter', 'vine']],
      ['Including', ['Pair', 'exclude', 'retweets']],
      ['Including', ['Pair', 'exclude', 'nativeretweets']],
      [
        'Or',
        [
          ['Including', ['Pair', 'min_replies', '10']],
          ['Including', ['Pair', 'min_retweets', '100']]
        ]
      ],
      ['Including', ['Pair', 'min_faves', '20']],
      [
        'Or',
        [
          ['Including', ['Pair', 'lang', 'es']],
          ['Including', ['Pair', 'to', 'jack']]
        ]
      ],
      ['IsQuestion', true],
      ['Including', ['Pair', 'since', '2016-01-01']],
      ['Including', ['Pair', 'until', '2016-02-01']],
      ['Including', ['List', 'NASA', 'astronauts-in-space-now']],
      ['Including', ['Pair', 'filter', 'verified']],
      [
        'Or',
        [
          ['Including', ['Text', 'cats']],
          ['Including', ['Text', 'dogs']],
          ['Including', ['Text', 'beavers']]
        ]
      ],
      ['Including', ['Exactly', 'exactly this']],
      ['Excluding', ['Exactly', 'exactly not this']],
      ['Including', ['Text', 'fish']],
      ['Including', ['Text', '#fish']],
      ['Including', ['Text', '@fish']],
      ['Including', ['Exactly', 'fish']],
      ['Excluding', ['Text', 'fish']],
      ['Excluding', ['Text', '#fish']],
      ['Excluding', ['Text', '@fish']],
      ['Excluding', ['Exactly', 'fish']]
    ]
  ]
];

testCases.forEach(([name, rawQuery, expected]) => {
  const query = rawQuery.split('\n').map(v => v.trim()).join(' ');
  test(name, t => {
    t.deepEqual(
      parse(query),
      expected
    );
    t.deepEqual(
      stringify(expected),
      query
    );
    t.deepEqual(
      stringify(parse(query)),
      query
    );
    t.deepEqual(
      parse(stringify(expected)),
      expected
    );
  });
});
