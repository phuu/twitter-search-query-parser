import test from 'ava';
import {parse} from '..';

const testCases = [
  [
    'single word query',
    'simple',
    [['INCLUDING', 'simple']]
  ],
  [
    'triple OR',
    'a OR b OR x',
    [
      [
        'OR',
        [
          ['INCLUDING', 'a'],
          ['INCLUDING', 'b'],
          ['INCLUDING', 'c']
        ]
      ]
    ]
  ],
  [
    'extreme example',
    `search #search @search -query filter:vine exclude:retweets exclude:nativeretweets
     min_replies:10 OR min_rts:100 min_faves:20 lang:es OR to:jack
     since:2016-01-01 until:2016-02-01 list:NASA/astronauts-in-space-now filter:verified
     cats OR dogs OR beavers`,
    [
      ['INCLUDING', 'search'],
      ['INCLUDING', '#search'],
      ['INCLUDING', '@search'],
      ['EXCLUDING', 'query'],
      ['FILTER', 'vine'],
      ['EXCLUDE', 'retweets'],
      ['EXCLUDE', 'nativeretweets'],
      ['OR', [['MIN_REPLIES', '10'], ['INCLUDING', 'min_rts:100']]],
      ['MIN_FAVES', '20'],
      ['OR', [['LANG', 'es'], ['TO', 'jack']]],
      ['SINCE', '2016-01-01'],
      ['UNTIL', '2016-02-01'],
      ['LIST', 'NASA', 'astronauts-in-space-now'],
      ['FILTER', 'verified'],
      [
        'OR',
        [
          ['INCLUDING', 'cats'],
          ['INCLUDING', 'dogs'],
          ['INCLUDING', 'beavers']
        ]
      ]
    ]
  ]
];

testCases.forEach(([name, query, expected]) => {
  test(name, t => {
    t.deepEqual(
      parse(query),
      expected
    );
  });
});