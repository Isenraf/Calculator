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
            const result = (lOp / rOp).toFixed(2);

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
    nodeDel: document.querySelector('.del'),
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

    delete() {
        this.out.splice(calcView.out.length - 1, 1);
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
    },

    handleSVG(handle) {
        this.nodeDel.addEventListener('click', handle)
    }
};

const controller = {
    controlSVG(e) {
        if(calcView.out.length !== 0) {
            calcView.delete()
            calcView.render();
            calcView.clearResult();
        }
    },
    controlDisplay(e) {
        if(e.target.localName !== 'button')
            return;

        const symbol = e.target.innerText;

        switch(symbol) {      
            case '±':
                if(!calcView.ans) return;

                calcView.ans = String(Math.abs(Number(calcView.ans)));
                calcView.nodeOut.textContent = calcView.ans;
                break;

            case 'c':
                calcView.ans = '';
                calcView.clear();
                calcView.clearResult();
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
                calcView.out.push( calcView.ans);
                calcView.render();
                calcView.clearResult();
                break;
            
            default:
                if(calcView.ans !== '' && !calcView.operators.includes(symbol)) {
                    calcView.clear();
                    calcView.out.push(symbol);
                    calcView.render();
                    calcView.ans = '';
                    return;
                }

                if(calcView.ans !== '' && calcView.operators.includes(symbol)) {
                    calcView.out.push(symbol);
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
        calcView.handleSVG(this.controlSVG);
    }
}

controller.init();