/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  lowerCase()  {
    this.words = this.words.map(word => {
      word = word.toLowerCase()
      return word
    });
    return this.words
  }


  makeChains() {
    let chains = {}
    this.lowerCase()    

    for (let i = 0; i < this.words.length; i++)  {
      if(!chains[this.words[i]]) {
        let nextWord = this.words[i + 1]
        if(nextWord != undefined)  {
          chains[this.words[i]] = [this.words[i + 1]]
        }

        else  {
          chains[this.words[i]] = [null]
        }
      }
      else  {
        chains[this.words[i]].push(this.words[i + 1])
      }
    }
    this.chains = chains
}


/** return a random word from the array value of the words object */
selectRandomWordInArray(arr){
  let word = arr[Math.floor(Math.random() * arr.length)]
  return word
}

resetWord(){
  let resetWord = 
  this.words[Math.floor(Math.random() * this.words.length)]
  return resetWord
}

nextWord(word){
  let nextWord = this.selectRandomWordInArray(this.chains[word])
  return nextWord
}

/** return random text from chains */

  makeText(numWords = 100) {
    let phrase = []
    let startingWord = this.words[Math.floor(Math.random() * this.words.length)]
    let word = this.selectRandomWordInArray(this.chains[startingWord])


    if(word === null) {
      while (word === null){
        word = this.resetWord()
      }
    }

    if (word !== null)  {
      phrase.push(word)

    for (let i = 0; i < numWords; i++)  {
      if(phrase[i] === null) {
        let word = phrase[i]
        while (word === null){
          word = this.resetWord()
        }
          phrase.push(word)
        }
        
      if(phrase[i] !== null)  {
        let nextWord = this.nextWord(phrase[i])

        if(nextWord === null) {
          while (nextWord === null){
            nextWord = this.resetWord()
          }
        phrase.push(nextWord)
      }      
      else  {
        phrase.push(nextWord)
      }
     
        
      }
    }
    let story = phrase.join(' ')
    console.log(story)
  }
}
}


module.exports = {
  MarkovMachine
}