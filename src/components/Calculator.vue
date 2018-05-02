<template>
  <main class="calculator">
    <div class="display" v-text="display"></div>
    <div class="buttons">
      <div class="button-row" v-for="row in buttonRows">
        <button
        :class="buttonClasses(button)"
        class="button"
        v-for="button in row"
        v-on:click="click(button)"
        :name="'button-' + button.text">
          {{button.text}}
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    display() {
      if (this.currentNumber === null) {
        return '';
      }
      return this.round(this.currentNumber, 4) + '';
    }
  },
  methods: {
    click(button) {
      if (typeof button.operator === 'function') {
        this.operator(button.operator);
      } else if (typeof button.method === 'function') {
        button.method();
      } else if (typeof button.text === 'number') {
        this.number(button);
      }
    },
    operator(operator) {
      if(typeof this.currentOperator === 'function') {
        this.currentNumber = this.currentOperator(this.storage, this.currentNumber);
      }
      this.storage = this.currentNumber;
      this.currentOperator = operator;
      this.clear = true;
    },
    number(button) {
      if (this.clear) {
          this.currentNumber = null;
          this.decimalMode = false;
          this.clear = false;
      }
      if (!this.decimalMode) {
        this.currentNumber = this.currentNumber * 10 + button.text;
      } else {
        this.currentNumber = this.currentNumber + button.text / (10 ** this.decimalMode);
        this.decimalMode++;
      }
    },
    buttonClasses(button) {
      let classes = '';
      classes += button.type == 'special' ? 'special ' : '';
      classes += button.type == 'operator' ? 'operator ' : '';
      classes += button.cols == 2 ? 'cols-2' : '';
      return classes;
    },
    round(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
  },
  data: (vm) => ({
    storeage: null,
    currentNumber: null,
    currentOperator: false,
    clear: false,
    decimal: 0,
    buttonRows: [
      [{
        text: 'C',
        type: 'special',
        method: function() {
          vm.storage = null;
          vm.currentNumber = null;
          vm.currentOperator = false;
          vm.decimalMode = 0;
        }
      },{
        text: '+/-',
        type: 'special',
        method: function() {
          vm.currentNumber = vm.currentNumber * -1;
        }
      },{
        text: '%',
        type: 'special',
        method: function () {
          vm.currentNumber = vm.storage / 100 * vm.currentNumber;
          vm.operator(false);
        }
      },{
        text: '/',
        type: 'operator',
        operator: function(a, b) {
          return a / b;
        }
      }],
      [{
        text: 7
      },{
        text: 8
      },{
        text: 9
      },{
        text: 'x',
        type: 'operator',
        operator: function(a, b) {
          return a * b;
        }
      }],
      [{
        text: 4
      },{
        text: 5
      },{
        text: 6
      },{
        text: '-',
        type: 'operator',
        operator: function(a, b) {
          return a - b;
        }
      }],
      [{
        text: 1
      },{
        text: 2
      },{
        text: 3
      },{
        text: '+',
        type: 'operator',
        operator: function(a, b) {
          return a + b;
        }
      }],
      [{
        text: 0,
        cols: 2
      },{
        text: '.',
        method: function () {
          if (!Number.isInteger(vm.currentNumber)) {
            return;
          }

          vm.decimalMode = 1;
        }
      },{
        text: '=',
        type: 'operator',
        method: function () {
          vm.operator(false);
        }
      }]
    ]
  })
}
</script>

<style>
.calculator {
  width: 30%;
  font-family: sans-serif;
}
.display {
  background-color: #4C4C4C;
  color: #ffffff;
  text-align: right;
  height: 1em;
  line-height: 1em;
  border-radius: .2em .2em 0 0;
  padding: .5em;
  font-size: 2em;
}
.buttons {
  border-width: .2em 0 0 .2em;
}
.buttons, .button {
  border-style: solid;
  border-color: #4C4C4C;
}
.button-row {
  display: flex;
}
.button {
  flex: 1;
  padding: 0;
  margin: 0;
  background-color: #DFDFDF;
  line-height: 4em;
  border-width: 0 .2em .2em 0;
  box-sizing: border-box;
}
.button:active {
  filter: brightness(85%);
}
.operator {
  background-color: #F5923D;
  color: #ffffff;
}
.special {
  background-color: #D6D6D6;
}
.cols-2 {
  flex: 2;
}
</style>
