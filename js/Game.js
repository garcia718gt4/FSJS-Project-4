class Game {
    constructor() {
        this.missed = 0; 
        this.phrases = this.createPhrases();
        this.activePhrase = null; 
    }

    /**
     * Creates phrases for use in game
     * @return {array}  An array of 5 Phrase objects
     */
    createPhrases() {
         const phrases = [
             new Phrase('life is like a box of chocolates'),
             new Phrase('there is no trying'),
             new Phrase('may the force be with you'),
             new Phrase('you have to see the matrix for yourself'),
             new Phrase('you talking to me')
         ]
         return phrases; 
    }

    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
     getRandomPhrase() {
        let randomNum = Math.floor(Math.random() * this.phrases.length);
        let random_phrase = this.phrases[randomNum]; 
        return random_phrase; 
     }
    
     

     /**
     * Begins game by selecting a random phrase and displaying it to user
     */
     startGame() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none'; 
        this.activePhrase = this.getRandomPhrase(); 
        this.activePhrase.addPhraseToDisplay();
     }



    /**
     * Resets the game by selecting a random phrase and displaying it to user
     */
     resetGame() {
        // restart with 0 misses
        this.missed = 0; 

        // Remove all list letter items
        const lis = document.querySelectorAll('#phrase li');
        lis.forEach(letter => letter.remove());

        // Remove the 'chosen' and 'wrong' classes from the selected letter keyboard buttons
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => key.classList.remove('chosen', 'wrong'));

        // Reset the live hearts
        const hearts = document.querySelectorAll('#scoreboard img'); 
        hearts.forEach(heart => heart.src = 'images/liveHeart.png');
    
        // Call the startGame method & remove results classes from overlay 
        this.startGame();  
        overlay.classList.remove('win', 'lose');
        
       
    }

     /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won 
     */
    checkForWin() {
        const li_letter = document.querySelectorAll('#phrase .letter');  
        const li_show = document.querySelectorAll('#phrase .show');

        for(let i = 0; i < this.activePhrase.phrase.length; i++){
            if (li_letter.length === li_show.length) {
                return true; 
            } else {
                return false; 
            }
        }
    }


    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard img'); 
        const lostHeart = hearts[this.missed];
        lostHeart.setAttribute('src', 'images/lostHeart.png');

        this.missed += 1;   
        if(this.missed === 5) {
            this.gameOver(); 
        }
    }



    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game 
    */
    gameOver(gameWon) {
        const message = document.querySelector('#overlay #game-over-message');
        const overlay = document.getElementById('overlay');
        const btnReset = document.querySelector('#btn__reset');
        overlay.style.display = 'flex'; 
        btnReset.textContent = 'Try again'; 

        if (gameWon) {
            overlay.className = 'win';
            message.textContent = 'You won!';
        } else {
            overlay.className = 'lose'; 
            message.textContent = 'You lost :(';
            
        }
       
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element */
    handleInteraction(button) { 
        const key = button.target;  

        if(key.tagName === 'BUTTON') { 
            if (this.activePhrase.checkLetter(key.textContent)){
                key.className += ' chosen';
                this.activePhrase.showMatchedLetter(key.textContent);
            } else {
                key.className +=' wrong';
                this.removeLife();
            }
        }

        if(this.checkForWin()) {
            this.gameOver(true);
        }
        


    }
}