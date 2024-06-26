/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const process = require('process')
const axios = require('axios')

function generateMarkovText(text)  {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
}

function makeText(path)  {
    fs.readFile(path, 'utf8', (err,data) =>  {
        if(err) {
            console.log(`Error reading ${path}`)
            process.exit(1)
        }
        else  {
            generateMarkovText(data)
        }

    })
}

async function makeURLText(url)  {
    let resp;

    try  {
        resp = await axios.get(`${url}`)
    }
    catch(err)  {
        console.log(`Cannot read URL: ${url}: ${err}`)
        process.exit(1)
    }
    makeText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}