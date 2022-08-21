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
            const result = lOp / rOp;

            // ERRORS
            // i) 0 / 0 division by zero
            if(!result) {
                alert('Invalid format used.');
                break;
            }

            // ii) x / 0 integer dividing zero
            if(String(result) === 'Infinity') {
                alert("Can't divide by zero.");
                break;
            }
            return result;
    }
}

const calcView = {
    out:[],
    ans: '',
    operators: '÷×−+',
    nodeOut: document.querySelector('.out'),
    nodeRes: document.querySelector('.res'),
    nodeContainer: document.querySelector('.container'),

    render() {
        this.nodeOut.textContent = this.out.join(' ');
    },

    renderResult() {
        this.nodeRes.textContent = String(this.computeAnswer(this.out));
    },

    clear() {
        this.out = [];
    },

    clearResult() {
        this.nodeRes.textContent = '';
    },

    computeAnswer(exp) {
        if(exp.findIndex(el => this.operators.includes(el)) === -1){
            return exp.join('');
        }

        const op = exp.findIndex(el => this.operators.includes(el));
        const lOp = exp.slice(0, op).join('');
        const rOp = exp.slice(op+1);

        return operate(exp[op], +lOp, +this.computeAnswer(rOp));
    },

    checkOperator() {
        return this.operators.includes(this.out[this.out.length - 1])? true: false;
    },

    checkFormat(symbol) {
        if(this.operators.includes(symbol) && this.out.length === 0) {
            alert('Invalid format used.');
            return true;
        }
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
            case '±':
                // something to do...
                break;

            case 'c':
                calcView.ans = '';
                calcView.clear();
                calcView.render();
                break;
            
            case '=':
                if(calcView.operators.includes(calcView.out[calcView.out.length - 1])){
                    alert('Invalid format used.');
                    break;
                }

                if(calcView.out.length === 0) return;

                calcView.ans = String(calcView.computeAnswer(calcView.out));

                if(calcView.ans === 'undefined') return;

                calcView.clear();
                calcView.clearResult();
                calcView.nodeOut.textContent = calcView.ans;
                break;
            
            default:
                if(calcView.ans !== '' && !calcView.operators.includes(symbol)) {
                    calcView.out.push(symbol);
                    calcView.render();
                    calcView.ans = '';
                    return;
                }

                if(calcView.ans !== '' && calcView.operators.includes(symbol)) {
                    calcView.out.push(calcView.ans, symbol);
                    calcView.render();
                    calcView.ans = '';
                    return;
                }

                if(calcView.checkFormat(symbol))
                    return;

                if(calcView.checkOperator() && calcView.operators.includes(symbol)) {
                    calcView.out[calcView.out.length - 1] = symbol;
                    calcView.render();
                    return;
                }

                if(calcView.checkOperator() && !calcView.operators.includes(symbol)) {
                    calcView.out.push(symbol);
                    calcView.render();
                    calcView.renderResult();
                    return;
                }

                calcView.out.push(symbol);
                calcView.render();
                calcView.clearResult();
        }        
    },

    init() {
        calcView.handleClick(this.controlDisplay);
    }
}

controller.init();