"use strict";

function operate(op, lOp, rOp) {
    switch(op) {
        case "+":
            return lOp + rOp;
        case "−":
            return lOp - rOp;
        case "×":
            return lOp * rOp;
        case "÷":
            return lOp / rOp;
    }
}

const calcView = {
    op: '',
    out:[],
    res: '',
    lOp: '',
    rOp: '',
    operators: '÷×−+',
    isOperator: false,
    nodeOut: document.querySelector('.out'),
    nodeRes: document.querySelector('.res'),
    nodeContainer: document.querySelector('.container'),

    render() {
        this.nodeOut.textContent = this.out.join(' ');
    },

    clear() {
        this.out = [];
    },

    checkFormat(symbol) {
        if(this.operators.includes(symbol) && this.out.length === 0) {
            console.log('Invalid format used.');
            return true;
        }

        this.isOperator = this.operators.includes(this.out[this.out.length - 1])? true: false;
    },

    getParams() {
        this.op = this.out[this.out.findIndex(el => this.operators.includes(el))];
        this.lOp = this.out.join('').split(this.op)[0];
        this.rOp = this.out.join('').split(this.op)[1];
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

        switch(symbol) {            
            case 'c':
                calcView.clear();
                calcView.render();
                break;
            
            case '=':
                if(calcView.operators.includes(calcView.out[calcView.out.length - 1])){
                    console.log('Invalid format used.');
                    break;
                }

                // get parameters from string.
                calcView.getParams();

                // operate
                const ans = operate(calcView.op, +calcView.lOp, +calcView.rOp);

                // ERRORS
                // i) 0 / 0 division by zero
                if(!ans) {
                    console.log('Invalid format used.');
                    break;

                }

                // ii) x / 0 integer dividing zero
                if(String(ans) === 'Infinity') {
                    console.log("Can't divide by zero.");
                    break;
                }
                
                calcView.clear();
                calcView.out.push(ans);
                calcView.render();
                break;
            
            default:
                if(calcView.checkFormat(symbol))
                    return;

                if(calcView.isOperator && calcView.operators.includes(symbol))
                    calcView.out[calcView.out.length - 1] = symbol;
                else
                    calcView.out.push(symbol);

                calcView.render();
        }        
    },

    init() {
        calcView.handleClick(this.controlDisplay);
    }
}

controller.init();