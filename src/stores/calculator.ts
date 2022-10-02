import { defineStore } from 'pinia'
import { computed, reactive } from 'vue';
import { evaluate } from 'mathjs'

export enum ButtonsCalculator {
  // undefined = '',
  zero = '0',
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  point = '.',
  clear = 'C',
  div = '/',
  mul = '*',
  add = '+',
  sub = '-',
  bracketOpen = '(',
  bracketClose = ')',
  back = 'b',
  result = '=',
}

function isNumberPressed(value: ButtonsCalculator) {
  switch (value) {
    case ButtonsCalculator.zero:
    case ButtonsCalculator.one:
    case ButtonsCalculator.two:
    case ButtonsCalculator.three:
    case ButtonsCalculator.four:
    case ButtonsCalculator.five:
    case ButtonsCalculator.six:
    case ButtonsCalculator.seven:
    case ButtonsCalculator.eight:
    case ButtonsCalculator.nine:
      return true;
    default:
      return false;
  }
}

class Calculation {
  result = '';
  input = '';

  constructor(calc?: Calculation) {
    if (calc instanceof Calculation) {
      this.input = calc.input;
      this.result = calc.result;
    }
  }

  clear() {
    this.input = '';
    this.result = '';
  }

  removePrefix(value: string, prefix: string) {
    const hasPrefix = value.indexOf(prefix) === 0;
    return hasPrefix ? value.slice(prefix.length) : value;
  }

  evaluate() {
    try {
      const res = evaluate(this.input);
      this.result = res;
      console.log('result: ', res);
    } catch (error) {
      console.log('error: ', error);
      this.result = this.removePrefix(String(error), 'SyntaxError: ');
    }
  }
}

export const useCalculatorStore = defineStore('calculator', () => {
  const history: Calculation[] = reactive([]);
  const actCalc = reactive(new Calculation());

  const displayText = computed(() => {
    return actCalc.input;
  })

  const displayResult = computed(() => {
    return actCalc.result;
  })

  function back() {
    actCalc.input = actCalc.input.slice(0, -1);
    actCalc.result = '';
  }

  function evaluate() {
    actCalc.evaluate();
    history.push(new Calculation(actCalc));
    if (history.length > 10) {
      history.shift();
    }
  }

  function buttonPressed(btnValue: ButtonsCalculator) {
    switch (btnValue) {
      case ButtonsCalculator.clear:
        actCalc.clear();
        break;
      case ButtonsCalculator.result:
        evaluate();
        break;
      case ButtonsCalculator.back:
        back();
        break;
      default:
        if (typeof actCalc.result === 'number') {
          actCalc.input = isNumberPressed(btnValue) ? '' : actCalc.result + '';
          actCalc.result = ''
        }
        actCalc.input += btnValue;
        break;
    }

    return;
  }

  function selectHistory(historyIndex: number) {
    if (historyIndex < 0 || historyIndex >= history.length) {
      console.warn('selectHistory: Index (' + historyIndex + ') out of range')
      return;
    }
    const item = history[historyIndex];
    actCalc.clear();
    actCalc.input = item.result + '';
  }

  return { history, displayText, displayResult, buttonPressed, selectHistory }
})
