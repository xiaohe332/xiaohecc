/*
    纸牌类型type:0~5
        0:Jocker
    纸牌面值value:0~14
        0:Black Joker
        1:Red Joker
*/

const JOKER = 0;
const SPADE = 1;
const DIAMOND = 2;
const HEART = 3;
const CLUB = 4;

const TYPE_MAP = {
    0: 'JOKER',
    1: 'SPADE',
    2: 'DIAMOND',
    3: 'HEART',
    4: 'CLUB'
};

const VALUE_MAP = {
    0: 'Black_Joker',
    1: 'Red_Joker',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A',
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10"

}

const BLACK_JOKER = 0;
const RED_JOKER = 1;

class Card {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    get type() {
        return this._type;
    }
    set type(t) {
        if (t < 0 || t > 4) {
            this._type = 0;
        } else {
            this._type = t;
        }
    }

    get value() {
        return this._value;
    }
    set value(v) {
        if (this.type === JOKER) {
            if (v < 0 || v > 1) {
                this._value = 0;
            } else {
                this._value = v;
            }
        } else {
            if (v < 0 || v > 14) {
                this._value = 2;
            } else {
                this._value = v;
            }
        }
    }

    relativeURL() {
        // let url;
        // let typeStr = TYPE_MAP[this.type];
        // let valueStr = VALUE_MAP[this.value];

        // if(this.value >= 2 && this.value <=14)
        // {
        //     valueStr = `${this.value}`;
        // }else{
        //     valueStr = VALUE_MAP[this.value];
        // }

        // url= './card4/' + typeStr + '/' + valueStr + '.png';

        return `./card4/${this.type}/${this.value}.png`;
    }
}

class CardGroup extends Array {
    /*   returns ;
            5K,五同，
            rs,皇家大顺，
            sf,同花顺，
            4k，4同，
            fh，三带对，
            fl，同花，
            st，顺子，
            2p，2对，
            1p，1对，
            none:未中奖
            
         */

    judge() {
        /*
         * 1.拆分： 1组为joker，一组为普通花色
           2.遂提出（joker。length），2，1，0

        */
        //判断5k
        const jokerArr = [],
            normalArr = [];
        for (const card of this) {
            if (card.type === JOKER) {
                jokerArr.push(card);
            } else {
                normalArr.push(card);
            }
        }

        let is5k = true;
        if (jokerArr.length > 0) {
            const v = normalArr[0].value;
            for (const card of normalArr) {
                if (card.value !== v) {
                    is5k = false;
                    break;
                }
            }
            if (is5k) {
                return '5k';
            }
        }
    }
}

const pokers = [];

for (let i = 0; i < 5; i++) {
    if (i === JOKER) {
        pokers.push(new Card(i, 0));
        pokers.push(new Card(i, 1));
    } else {
        for (let j = 2; j < 15; j++) {
            const card = new Card(i, j);
            pokers.push(card);
        }
    }
}
// origin => underfined if null
//    [1, null ,2,3,null]                       [{type: 1, value: 1},{type: 2, value: 2}]

let randomCards = (origin) => {
    if (!origin) {
        origin = new Array(5).fill(null)
    }

    const result = origin;

    for (let i = 0; i < result.length; i++) {
        let id = result[i]

        while (!id) {
            id = Math.floor(Math.random() * 54)
            if (result.includes(id)) {
                id = null
            } else {
                result[i] = id
            }
        }
    }

    // while (result.length < 5) {
    //     let ri = Math.floor(Math.random() * 54);
    //     if (!result.includes(ri)) {
    //         result.push(ri);
    //     }
    // }

    return result;
    // const resultObjects = new CardGroup();
    // for (const i of result) {
    //     resultObjects.push(pokers[i]);
    // }

    // return resultObjects;
}

const cards = randomCards();
const cardGroup = new CardGroup();

for (let i = 1; i < 4; i++) {
    CardGroup.push
}



module.exports = {
    pokers,
    randomCards,
    CardGroup
}