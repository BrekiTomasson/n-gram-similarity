[![n-gram-similarity](./n-gram-similarity.png)](#)

# :package: n-gram-similarity

[![NPM Version][npm-version-image]][npm-version-url]
[![Dependency Status][david-image]][david-url]
<!-- [![Codacy Badge][codacy-image]][codacy-url] -->
<!-- [![Coverage Badge][coverage-image]][coverage-url] -->


> **n-gram-similarity** - Set your bounds. Feed it your sentences. ??? Profit!

## :cloud: Installation

```sh
npm install --save n-gram-similarity
```

## :wrench: Usage



## :vulcan_salute: Background

I love languages, and I find the various questions surrounding Natural Language Processing to be among the most
challenging and interesting in the field of computing right now. And yet, it's something that our brain just knows
how to do from an early age.

I spent a considerable amount of time as I was learning Javascript/Node working on a chatbot of sorts. One of the core
parts of what made it was a Markov Chain analysis of the words in the parsed input and a couple of fairly limited
rules based on what it is that it can do using those words. It was impressive at times, but most of the time it was
just sentences like "This might be used to condemn the things inferred from the data of our experience may be
considered", where the first bunch of words sound like they're leading somewhere - and the second half of the sentence
sounds like it's the end of something reasonable - but the full sentence just doesn't make sense.

I understood that a considerable part of the problem was that the bot was unable to understand what the sentence was
_about_. It generates sentences like _"There was a certain reserve, even in her playing, quite in keeping with family
tradition, gets in trouble at the game for fighting"_ because it knows that _"There was a certain reserve, even in her
playing, quite in keeping with family traditions"_ is a valid sentence in a Robert Carroll book. Also, it knows that
_"I will note that Pat, in keeping with family tradition, gets in trouble at the game for fighting"_ is a valid sentence
since it appears in a Roger Ebert review of _Mulholland Drive_.

So why **wouldn't** the overlap be valid?

What I wanted to do was to create a system that allowed us to look at a full sentene - whether generated or not - and
create some sort of certainty score for whether or not it is about a specific topic or if it's got an internal
consistency.

## :cow: :poop: What It _Isn't_

... But this is not that. Before I could write that module, I had to write a better Markov Chain generator, since the
one I was using just wasn't good enough. I wanted something that could understand that "In the front of the train" and
"In the back of the car" are the same _kind_ of phrase. A standard Markov Chain implementation today wouldn't notice
this, even with a sample size as small as just three-word-chains. I wanted it to be able to understand that sentences
like these are just two examples of the same _kind_ of sentence. "In the X of the Y", where the words "front" and "back"
are interchangeable - just as "car" and "train". I want it to understand that if it has seen these two sentence, and
later sees a sentence like "On the back of the page", it should understand that "in" and "on" are interchangeable as
well.

The rest - the ability to understand what a sentence is _about_ and whether or not the sentence is internally
consistent, all of that will come later.

## :card_file_box: Separation of Concerns

_Not applicable_. At the moment of writing, this is a single module with very few external dependencies.

## :boom: Backlogs and Planned Future Updates

* [ ] **Make it actually work**. This feels like a good first step.

# :beers: Thank You So Much!

Thank you to everybody who inspired me along the way!

---
MIT (c) [Breki Tomasson](http://brekitomasson.com)

[npm-version-image]: https://badge.fury.io/js/n-gram-similarity.svg
[npm-version-url]: https://npmjs.org/package/n-gram-similarity
[david-image]: https://david-dm.org/brekitomasson/n-gram-similarity/status.svg?theme=shields.io
[david-url]: https://david-dm.org/brekitomasson/n-gram-similarity
[codacy-image]: https://api.codacy.com/project/badge/Grade/%%CODACY-IDENTIFIER%%
[codacy-url]: https://www.codacy.com/app/BrekiTomasson/n-gram-similarity?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrekiTomasson/n-gram-similarity&amp;utm_campaign=Badge_Grade
[coverage-image]: https://api.codacy.com/project/badge/Coverage/%%CODACY-IDENTIFIER%%
[coverage-url]: https://www.codacy.com/app/BrekiTomasson/n-gram-similarity?utm_source=github.com&utm_medium=referral&utm_content=BrekiTomasson/n-gram-similarity&utm_campaign=Badge_Coverage
