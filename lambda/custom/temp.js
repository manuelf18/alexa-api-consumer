const cardRequest = require('./modules/cardRequest');

async function testMod(){
    await cardRequest.get().then((cards)=>{
        let card = JSON.parse(cards);
        console.log(card);
        console.log(card[0].name);
    }, (error)=>{
        console.log(error);
    });
}


testMod();