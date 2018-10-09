/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var current, scores, activePlayer, dice, doubleSix, finalScore;
currentReset ();
gameReset ();
SetTheWinner();




// Reset the game
function gameReset (){
$('#score-0,#score-1,#current-0,#current-1').text(0);
    activePlayer = 1;
    apReset ();
    $('.winner').removeClass('winner');
    $('.btn-roll, .btn-hold').fadeIn();
    doubleSix = 0;
}

// hold Reset the current
function currentReset (){
    current = parseInt( $('#current-' + activePlayer).text());
    current = 0;
    $('#current-' + activePlayer).text(current);
 }

// Shift the active player
function apReset (){
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    $('.active').removeClass('active');
    $('.player-' + activePlayer + '-panel').addClass('active');
}

// wine the game
function winer (){
   if (  parseInt($('#score-' + activePlayer).text())  >= finalScore ){
       $('.player-' + activePlayer + '-panel').addClass('winner');
       $('.dice, .btn-roll, .btn-hold').fadeOut();

       //popup
       var player = $('.winner .player-name').text();
       $('.popup h1').text(player + ' is the WINNER!!!' )
       $('.popup').fadeIn();
       console.log( player);
       setTimeout("$('.popup').fadeOut();" , 3500);
  }
}

// Reset the active player
function resetPlayer (){
    $('#score-' + activePlayer).text(0);
    $('#current-' + activePlayer).text(0);
    
    //popup
    $('.popup h1').text("You've got double six")
    $('.popup').fadeIn();
    setTimeout("$('.popup').fadeOut();" , 1500);
};

// if you got double 6
function ifDoubleSix (){
    
        if ( dice === 6 ){
            doubleSix += 1;
            if (doubleSix >= 2 ){
                resetPlayer ();
                currentReset ();
                apReset ();
                doubleSix = 0;
                } 
        } else {
           doubleSix = 0; 
        }
};

//Set the winner
function SetTheWinner() {
    $('.popupVal h1').text('Set the Winner score:')
    $('.popupVal').fadeIn();
};





















// Roll dice butten
$('.btn-roll').on('click', function(){
     // dice roll
     dice = Math.round( Math.random()*5 + 1);
    $('.dice').attr("src", 'dice-' + dice + '.png');
    $('.dice').effect( 'shake', { direction: "up", times: 2, distance: 5}, 500 );
    
    //if you got 23456
    if ( dice != 1 ){
        current += dice;
        $('#current-' + activePlayer).text(current);
        ifDoubleSix();
  
    //if you got 1   
    } else {
        currentReset ();
        apReset ();
    }
 });

// hold butten
$('.btn-hold').on('click', function(){
    scores = parseInt($('#score-' + activePlayer).text());
    current += scores;
    $('#score-' + activePlayer).text(current);
    winer ();
    currentReset();
    apReset ();  
});

// New game butten
$('.btn-new').on('click', function(){
    gameReset ();
    SetTheWinner()
});

// Set the Winner score BUTTON
$('input[type="submit"]').on('click' , function(){
    
     finalScore =parseInt( $('input[type="text"]').val() );
    if ( isNaN (finalScore) ){
        alert('Please provide a number');
    } 
    else if (finalScore < 20 ){
        alert('Please provide a number bigger than 20');
    } else {
      $('.popupVal').fadeOut();
    }
});
























