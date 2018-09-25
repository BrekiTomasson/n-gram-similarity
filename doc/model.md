# n-gram similarity model

High level concept:

- You begin by instantiating a new n-gram similarity model.
- To do so, you have to define the `n`-count.
- You can then define the required overlap, ranging from `1` to `n`.
  - Recommended/default overlap will be `n-1`
- You then feed it sentences, which it parses into n-grams.
- It then compares the n-grams to each other and finds overlaps and similarities.
- This can then be used to create variations on n-grams in Markov chains etc.

## Completely Hypothetical Example

> Note: This is **not** live code and was written as a sketch for how the software _might_ work.

```javascript
> const NGSim = require('n-gram-similarity')
> const model = new NGSim({n: 4, s: 3})

> model.add('17 year old Nói drifts through life on a remote fjord in Iceland.')

> model.list()

[
    {
        gram: ['17', 'year', 'old', 'Nói'],
        start: true,
        end: false
    }, {
        gram: ['a', 'remote', 'fjord', 'in'],
        start: false,
        end: false
    }, {
        gram: ['drifts', 'through', 'life', 'on'],
        start: false,
        end: false
    }, {
        gram: ['fjord', 'in', 'Iceland', '.'],
        start: false,
        end: true
    }, {
        gram: ['life', 'on', 'a', 'remote'],
        start: false,
        end: false
    }, {
        gram: ['Nói', 'drifts', 'through', 'life'],
        start: false,
        end: false
    }, {
        gram: ['old', 'Nói', 'drifts', 'through'],
        start: false,
        end: false
    }, {
        gram: ['on', 'a', 'remote', 'fjord'],
        start: false,
        end: false
    }, {
        gram: ['remote', 'fjord', 'in', 'Iceland'],
        start: false,
        end: false
    }, {
        gram: ['through', 'life', 'on', 'a'],
        start: false,
        end: false
    }, {
        gram: ['year', 'old', 'Nói', 'drifts'],
        start: false,
        end: false
    }
]

> model.matches()

[]

> model.add('17 year old Jake drifts through life in a remote fjord in Norway.')

> model.add('For a long time, Alice felt like she drifted through life in a fog of confusion.')

> model.matches()

[
    {
        n1: ['drifted', 'through', 'life', 'in'],
        n2: ['drifts', 'through', 'life', 'in'],
    }, {
        n1: ['life', 'in', 'a', 'remote'],
        n2: ['life', 'in', 'a', 'fog'],
    }, {
        n1: ['17', 'year', 'old', 'Nói'],
        n2: ['17', 'year', 'old', 'Jake']
    }, {
        n1: ['year', 'old', 'Nói', 'drifts'],
        n2: ['year', 'old', 'Jake', 'drifts']
    }, {
        n1: ['old', 'Nói', 'drifts', 'through'],
        n2: ['old', 'Jake', 'drifts', 'through']
    }, {
        n1: ['Nói', 'drifts', 'through', 'life'],
        n2: ['Jake', 'drifts', 'through', 'life']
    }, {
        n1: ['remote', 'fjord', 'in', 'Iceland'],
        n2: ['remote', 'fjord', 'in', 'Norway']
    }, {
        n1: ['fjord', 'in', 'Iceland', '.'],
        n2: ['fjord', 'in', 'Norway', '.']
    }
]

> model.generate(1)

"17 year old Jake drifts through life in a fog of confusion."

> model.generate(1)

"For a long time, Alice felt like she drifted through life in a remote fjord in Iceland."

> model.add('17 year old Jake drifts through life in a fog of confusion.')

> model.add('Seventeen year old Jake drifts through life in a fog of befuddlement.')

> model.add('17 year old Jason drifts through life in a haze of confusion.')

> model.add('47 year old Jake meanders through life in a fog of pollution.')

> model.add('17 year old Jack drinks through straws in a fog of confusion.')

> model.generate(3)

['17 year old Jason drifts through life in a fog of pollution.',
'For a long time, Alice felt like she drifted through life in a haze of confusion.',
'47 year old Jake meanders through life in a remote fjord in Iceland.']
```
