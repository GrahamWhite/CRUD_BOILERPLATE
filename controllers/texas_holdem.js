

class TexasHoldem {

    constructor() {
        this.cards = [];
        this.hands = [];
        this.flop = [];
        this.turn = [];
        this.river = [];

        this.suits = [1,2,3,4];
        this.numbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];

        for(let x = 0; x < this.suits.length ; x++){
            for(let y = 0; y < this.numbers.length; y++){
                let card = {
                    suit: this.suits[x],
                    number: this.numbers[y]
                }
                this.cards.push(card);
            }
        }
    }

    deal(numPlayers) {

        if(!numPlayers){
            return 'numplayers not defined'
        }
        for(let x = 0; x < numPlayers; x++){
            let hand = [];

            this.drawCard(hand);
            this.drawCard(hand);
            this.hands.push(hand);
        }

        this.dealFlop();
        this.dealTurn();
        this.dealRiver();


    }

    dealFlop() {
        this.drawCard(this.flop);
        this.drawCard(this.flop);
        this.drawCard(this.flop);
    }

    dealTurn() {
        this.drawCard(this.turn);
    }

    dealRiver() {
        this.drawCard(this.river);
    }


    drawCard(hand) {
        let card = this.cards[Math.floor(Math.random() * this.cards.length)];

        hand.push(card);
        this.cards.splice(this.cards.indexOf(card), 1);


    }

    getHandValue(hand){
        let tempCards = [];


        tempCards = hand.concat(this.flop.concat(this.turn.concat(this.river)));

        let tempNumbers = tempCards.map(card => card.number);
        let tempSuits = tempCards.map(card => card.suit);

        tempNumbers.sort(function(a, b) {
            return a - b;
        });

        tempSuits.sort(function(a, b) {
            return a - b;
        });


        let pairs = [];
        for(let i = 0; i < tempNumbers.length; i++){
            if(tempNumbers[i] === tempNumbers[i + 1] ){
                pairs.push(tempNumbers[i]);
            }
        }

        let triples = [];
        for(let i = 0; i < tempNumbers.length; i++){
            if(tempNumbers[i] === tempNumbers[i + 2] ){
                triples.push(tempNumbers[i]);
            }
        }

        let quads = [];
        for(let i = 0; i < tempNumbers.length; i++){
            if(tempNumbers[i] === tempNumbers[i + 3] ){
                quads.push(tempNumbers[i]);
            }
        }

        let flushes = [];
        for(let i = 0; i < tempSuits.length; i++){
            if(tempSuits[i] === tempSuits[i + 4] ){
                flushes.push(tempSuits[i]);
            }
        }

        let straights = [];
        for(let i = 0; i < tempSuits.length; i++){
            if(tempNumbers[i] + 1 === tempNumbers[i + 1] &&
                tempNumbers[i] + 2 === tempNumbers[i + 2] &&
                tempNumbers[i] + 3 === tempNumbers[i + 3] &&
                tempNumbers[i] + 4 === tempNumbers[i + 4]
            ){
                straights.push(tempNumbers[i]);
                straights.push(tempNumbers[i + 4]);
            }
        }
        //
       return [
           {'pairs': pairs},
           {'triples': triples},
           {'quads': quads},
           {'straights': straights},
           {'flushes': flushes}]
        ;


    }


}



let play = () => {

    let numPlayers = 2;
    let totalPairs = 0;
    let totalTriples = 0;
    let totalQuads = 0;
    let totalStraights = 0;
    let totalFlushes = 0;

    let numHands = 50;

    for(let k = 0; k < numHands; k++){
        let game = new TexasHoldem();
        game.deal(numPlayers);
        for(let i = 0; i < numPlayers; i++){


            let stats = game.getHandValue(game.hands[i]);

            totalPairs += stats[0].pairs.length;
            totalTriples += stats[1].triples.length;
            totalQuads += stats[2].quads.length;
            totalStraights += stats[3].straights.length;
            totalFlushes += stats[4].flushes.length;


        }



    }

    console.log(`Stats for ` + numHands + ` with ` + numPlayers + ` players:\n`)

    console.log(`Total Pairs : ` + totalPairs);
    console.log(`Total Triples : ` + totalTriples);
    console.log(`Total Straights : ` + totalStraights);
    console.log(`Total Flushes : ` + totalFlushes);
    console.log(`Total Quads: ` + totalQuads);
}

play();