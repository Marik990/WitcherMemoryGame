$('.board').css('opacity', 0)
$('.board').animate({opacity: "1"}, 1000)

var images = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

var imagesCount = images.length
var cards = []
for(var i = 0; i < imagesCount; i++){
    cards.push(images.splice(Math.floor(Math.random() * images.length), 1)[0])
}

$('.card').on('click',function () {
    revealCard(this.id.substr(1))
})

var oneVisible = false
var twoVisible = false
var turnCounter = 0
var visibleNumber = null

function revealCard(nr) {
    if(twoVisible || $('#c'+nr).hasClass('cardH') || nr === visibleNumber)
    {
        console.log('revealCard rejected')
        return 0
    }

    var obraz = "url(img/" + cards[nr] + ")"

    $('#c'+nr).css('background-image', obraz).removeClass('card').addClass('cardA')

    if(oneVisible === false){
        visibleNumber = nr
        oneVisible = true
    }
    else {
        twoVisible = true
        if(cards[nr] !== cards[visibleNumber]){

            setTimeout(function() {
                hide2cards(nr,visibleNumber)
                twoVisible = false
            }, 500)
        }
        else
        {
            setTimeout(function () {
                remove2cards(nr, visibleNumber)
                twoVisible = false
                if(gameIsOver())
                {
                    $('.board').animate({opacity: "0"}, 0)
                    $('.board').animate({opacity: "1"}, 1000).html(`<div class="win">You WON in the following number of turns: ${turnCounter}</div>
                        Click here to restart -> <button id="restart">RESTART</button>`)
                    $('#restart').on('click', function () {
                        window.location.reload()
                    })
                }
            }, 500)
        }
        setTurnCounter(++turnCounter)
        oneVisible = false
    }
}

function remove2cards(card1, card2) {
    $('#c'+card1).animate({opacity: "0"}, 100).addClass('cardH')
    $('#c'+card2).animate({opacity: "0"}, 100).addClass('cardH')
}

function hide2cards(card1, card2) {
    $('#c'+card1).css('background-image', 'url(img/karta.png)').removeClass('cardA').addClass('card')
    $('#c'+card2).css('background-image', 'url(img/karta.png)').removeClass('cardA').addClass('card')
}

function setTurnCounter(turnNumber){
    $('.score').html('Turn counter: ' + turnNumber)
}

function gameIsOver() {
    for(var i = 0; i < cards.length; i++){
        if($('#c'+i).hasClass('cardH') === false)
            return false
    }
    return true
}