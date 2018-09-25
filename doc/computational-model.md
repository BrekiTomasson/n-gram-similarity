# :computer: The Computational Model

In order to let `n-gram-similarity` do its job, it needs to process a large amount of data. Given the default state size
of four, the first sentence in this document would generate sixteen separate objects that can then establish
relationships to other objects.

The two sentences in the paragraph above would establish a total of fourty-one unique four-word n-grams. That's a lot of
n-grams; especially if we want to try to map the n-grams against each other to see if there is any overlap or similarity
between them.

Processing a dataset of a large size without cutting corners is extremely difficult. Sure; it would be easy to reduce
the dataset by filtering out the stopwords, normalizing case and cutting everything down to just the stems of the words
you're using, but the results would suffer accordingly. Sentences like "The rain in Spain falls mainly on the plain"
would match "Rainy Spain in the fall is mainly plain" - which has a completely different meaning.

## :confused: So what do?

What do, indeed.

I began by looking into this from a dataset perspective. Could one, for example, build a probability model of your input
models and only perform comparisons against those entries that have a greater than `n` chance of containing a match? If
so, how would one build that model, and how much would this add to the computation speed and size of the dataset?

Another question I asked myself was if it were possible to reduce the dataset somehow by removing entries which do not
provide new data? This would remove duplicates, so that a 4-word engram model of "There was a tree in the center of the
city" and "There was a tree in the corner of the field" wouldn't store `['There', 'was', 'a', 'tree']` and `['was', 'a',
'tree', 'in']` and `['a', 'tree', 'in', 'the']` more than once.

I even explored ways of generalizing the dataset by omitting certain n-grams. In a 4-word n-gram, would it really be
necessary to save three separate n-grams for a six-word sentence like "I ate a pizza with Kevin', or would `['I', 'ate',
'a', 'pizza']` and `['a', 'pizza', 'with', 'Kevin']`, skipping the interim `['ate', 'a', 'pizza', 'with']` be enough?

After most of these methods had been tried, tested, considered and ultimately disqualified, I looked into other ways of
processing the data, and that's where I came upon the perhaps most clever ways of treating the data.

### :telescope: Cosine Similarity

The concept of [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity) is fairly simple, despite how it may
look when you begin scanning the math involved. Basically, what you are doing is taking a vector value of two different
attributes and finding the cosine value for them. The result is a number between -1, indicating that your two vectors
are completely opposite from each other and 1, meaning that they are exactly identical. In text comparison, this tends
to be expressed as a 0 to 1 value, since text can only be different, not 'opposite' as in mathematics.

Through some mathematical juggling which we don't have to get into here, this can provide you with the "distance" that
one word has from another word, and even in which "direction" that distance lies. At this point, I was beginning to
imagine the possibility of creating vectors based on the categories of words and their usage, so that words like "hard",
"harder", "hardest" would be visibly related to each other in the same way as "loud", "louder", "loudest",  but
completely unrelated to "hoard", "hearing" and "harp". Maybe, I thought, it would be possible to do a Part of Speech
analysis of the input and use that data when assigning a vector value to a word? And then that word, taken together with
the three other words in your 4-word n-gram, could be represented as a shape? And that shape, when compared to the next
shape in line would have three identical points in vector-space, but the fourth would alter - and it would do so in a
one-by-one pattern that could generate a representation of a sentence as a walk through vector-space.

I was getting way too far ahead of myself here, and decided to look into how other people had approached this problem before. One of the first things that I discovered was ...

### :telescope: The Vector Space Model

The [Vector Space Model](https://en.wikipedia.org/wiki/Vector_space_model), which has historically been very popular
with text analysis, is what lies at the core of software like Apache's Lucene (and everything powered by it, like
ElasticSearch). While this is a powerful tool when it comes to indexing text that you want to be able to search, it does
have issues when it comes to understanding when something is the same _kind_ of thing as something else. I made a mental note to look into the Vector Space Model in other projects, but maybe not this one.

Looking around further, I spent a long time digging into ...

### :telescope: Word2vec

Word2vec isn't so much a model or framework as it is a group of related models - fairly simple, two-layer neural
networks trained to deconstruct and reconstruct the linguistic context of a word. Anything that it processes ends up
getting a vector value with an extremely high dimensionality. It even matches the criteria that I was imagining - words
that share similar or common contexts are located close to each other in the vector space.

This idea fascinated me, partly because it was so close to what I was imagining, but also because I could see ways in
which it wasn't _quite_ good enough yet. While it was certainly possible to take a given word and apply vector math to
it in reasonable ways, I did not find a good way for Word2vec to offer, for example, potential synonyms for words. While
the vector value for "brother", minus the vector value for "man", plus the vector value for "woman", reliably enough
gives us a value very near the vector value for "sister", that word may be just as far away from "cousin" as it is from
a word like "salesman". Also, I encountered several issues where it would get confused by polysemy, cases where two
different words are spelled the same way ("The bank could not bank upon the river bank not overflowing, so they built a
dam around the bank.")

# :hammer: What I Ended up Doing

In the end, what I ended up deciding would be the most reasonable course of action for me (and people _did_ say I was
crazy for doing this), was to just build a custom _Word2vec-like_ solution that did this kind of thing in a way more
like what I was going for. It would keep the multi-dimensionality, the vector space similarity for related words, but
would introduce more focus on value-ginving by type ("What other words like 'Hammer' are there?"), and maybe even have
some primitive frequency analysis thrown in as well ("What is the most common word seen within ten words of 'Hammer'?")

## :question: Initial Questions

## :exclamation: Encouraging Results
