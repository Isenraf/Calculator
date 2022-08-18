"use strict";

const calcView = {
    out:[],
    operators: '÷×−+',
    isOperator: false,
    nodeOut: document.querySelector('.out'),
    nodeContainer: document.querySelector('.container'),

    populate() {
        this.nodeOut.textContent = this.out.join(' ');
    },

    checkFormat(symbol) {
        if('÷×−+'.includes(symbol) && this.out.length === 0) {
            console.log('Invalid format used.');
            return true;
        }
        // check for operator
        this.isOperator = '÷×−+'.includes(this.out[this.out.length - 1])? true: false;
    },

    handleClick(handle) {
        this.nodeContainer.addEventListener('click', handle);
    }
};

const controller = {
    controlDisplay(e) {
        if(e.target.localName !== 'button')
            return;

        const symbol = e.target.innerText;

        if(symbol === 'c' || symbol === '=')
            return;
        
        if(calcView.checkFormat(symbol))
            return;

        if(calcView.isOperator && '÷×−+'.includes(symbol))
            calcView.out[calcView.out.length - 1] = symbol;
        else
            calcView.out.push(symbol);

        calcView.populate();
    },

    init() {
        calcView.handleClick(this.controlDisplay);
    }
}

controller.init();