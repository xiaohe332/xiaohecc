const express = require('express');
const app = express();

const path = require('path');

//const randomCards = require('./card');
const bodyParser = require('body-parser')


const {
    pokers,
    randomCards,
    CardGroup
} = require('./card')

const port = 3000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.json());

const jsonParser = bodyParser.json()
let randIdx = [];

//const cardModule = require('./card');
//const randomCards = cardModule.randomCards;

app.use(express.static('public'));


app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'card real.html');
    res.sendFile(htmlPath);


})

app.get('/random', (req, res) => {
    randIdx = randomCards(); // [0,12,1,3,4]

    //pokers
    const cards = genCardGroup(randIdx)

    console.log('--- cards: ', cards)

    res.json({
        cards: cards, // =>[{type:1,value:0}]
        result: cards.judge()

    });
})


let gameStart = false
let gameCoin = 10000
let gameCards
let pourCoin = 0
const gameBonus = {
    '5K': 5000,
    'rs': 2000,
    'sf': 800,
    '4K': 400
}

app.post('/pour', (req, res) => {
    if (gameStart) {
        res.json({
            code: 1,
            desc: '游戏已经开始，不能下注'
        })
        return
    }

    let coin = req.body.coin || 0
    if (coin < 1) {
        res.json({
            code: 1,
            desc: '下注金额不能为0'
        })
        return
    }

    if (gameCoin < coin) {
        return
    }
    pourCoin = coin
    gameCoin -= coin
    gameStart = true


    let gameCards = randomCards()
    const cards = genCardGroup(gameCards)


    const bonusInc = parseInt(coin / 80)
    for (let k in gameBonus) {
        gameBonus[k] += bonusInc
    }
    gameCards = randomCards()

    const cardIdx = randomCards()

    //gameCards = temp

    randIdx.forEach(id => {

        cards.push(pokers[id])
    })
    gameStart = false
    res.json({
        cards: cards,
    })

})

function genCardGroup(indexes) {
    console.log('---- indexes：', indexes) // [21, 43, 1, 42, 53]
    const cards = new CardGroup()
    indexes.forEach(id => {
        cards.push(pokers[id])
    })
    return cards
}

app.post('/switch', (req, res) => {
    /*
    change = [0,1,3],[]
    */
    if (!gameStart) {
        res.json({
            code: 2,
            desc: '游戏未开始'
        })
        return
    }
    keep = req.body['keep[]'];

   

    /*
    keep = [0,1,3],[]
    */

 //   const keep = req.body['keep[]']
    if (!keep) keep = []

    const temp = []
    for (let i = 0; i < 5; i++) {
        if (keeep.includes(i)) {
            temp.push(gameCards[i])
        } else {
            temp.push(null)
        }
    }
    const gameCards = randomCards();

    for(var i in keep) {
        gameCardGroup[keep[i]] = gameCards_ramdom[keep[i]];
    }

//    const cardGroup = getCardGroup(gameCards)
 //   const cards = cardGroup.cards;
//    const result = cardGroup.judge();

    gameCards = temp
    const cards = genCardGroup(gameCards)

    keep.forEach(keepID => {
        const temp = []
        gameCards.forEach(idx => {
            temp.push(idx) || (null)

        })

    })


    gameStart = false

    const result = cards.judge()
    const winCoin = (winRates[result] || 0) * pourCoin

    if (winCoin > 0)
        gameCoin += winCoin

    res.json({
        Cards,
        result,
        winCoin,
    })
})

const winRates = {
    '5k': 75000,
    rs: 25000,
    sf: 15000,
    '4k': 6000,
    fh: 1000,
    fl: 700,
    st: 500,
    '3k': 300,
    '2p': 200,
    '1p': 100
}


app.listen(port, function () {
    console.log("start");
})