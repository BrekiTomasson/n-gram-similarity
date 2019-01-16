// Just a first idea here, testing things out.

let sentence = "These are the sentences that I will be testing this out with. I hope it works!"
let ngram = 3

let sentenceArray = sentence.replace(". ", " . ").split(" ")

for (let iteration = 0; iteration <= sentenceArray.length - ngram; iteration++) {
  console.log(sentenceArray[iteration], sentenceArray[iteration+1], sentenceArray[iteration+2])
}

console.log(sentenceArray.length)

