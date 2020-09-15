const game = new Game(); 


/**  
 * Listens for click on `#btn_reset` and calls startGame() on game object
 */
document.getElementById('btn__reset').addEventListener('click', () => {
    game.startGame(); 
});
 

/**  
 * Listens for click on `#btn_reset` when the text content is 
 * 'Try again' and calls the resetGame() on game object
 */
document.getElementById('btn__reset').addEventListener('click', (e) => {
    if(e.target.textContent === 'Try again') {
        game.resetGame(); 
    }
});


/** 
 * Listens for click on `#qwerty` and calls handleInteraction() on game object
 */
document.getElementById('qwerty').addEventListener('click', (e) => {
        game.handleInteraction(e); 
}); 


