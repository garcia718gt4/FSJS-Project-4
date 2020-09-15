class Phrase {
    constructor (phrase) {
        this.phrase = phrase.toLowerCase(); 
    }

    /**
     * Display phrase on game board -
     * Adds letter placeholders to the display when the game starts 
     */
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');
        
        for (let i = 0; i < this.phrase.length; i++) {  
            const li = document.createElement('li');
            li.textContent = this.phrase[i]; 

            if(li.textContent !== " ") {
                li.className += 'letter';
                li.className += ` ${this.phrase[i]}`;
            } else {
                li.className += 'space';
            } 
            ul.appendChild(li); 
        }
    }



    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }
        


    /**
    * Displays passed letter on screen after a match is found
    *  * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const lis = document.querySelectorAll('.letter');

        for(let i = 0; i < lis.length; i++){
            const character = lis[i].textContent; 
            if(letter === character){

                lis[i].classList.add('show');
            }
        }
    }

}