"use strict";

const calcView = {
    out:[],
    nodeOut: document.querySelector('.out'),
    nodeContainer: document.querySelector('.container'),

    populate() {
        this.nodeOut.textContent = this.out.join(' ');
    },

    checkFormat() {
        if('÷×−+'.includes(this.out[0])) {
            console.log('Invalid format used.');
            this.out = [];
        }
    },

    handleClick(handle) {
        this.nodeContainer.addEventListener('click', handle);
    }
};

const controller = {
    controlClick(e) {
        if(e.target.localName !== 'button')
            return;

        const symbol = e.target.innerText;

        if(symbol === 'c' || symbol === '=')
            return;
        
        calcView.out.push(symbol);
        calcView.checkFormat();
        calcView.populate();
    },

    init() {
        calcView.handleClick(this.controlClick);
    }
}

controller.init();