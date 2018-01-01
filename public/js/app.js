//@format
const {h, app} = hyperapp;
const {div, h2, input, button} = html;

const state = {
  input: '',
  value: 0,
  isPrime: false,
  error: null,
};

const actions = {
  sumAndCheck: value => (state, actions) =>
    fetch(`api?action=sumandcheck&numbers=${value}`)
      .then(response => response.json())
      .then(data => actions.setState(data))
      .catch(err => console.log(err)),
  checkPrime: value => (state, actions) =>
    fetch(`api?action=checkprime&number=${value}`)
      .then(response => response.json())
      .then(data => actions.setState({isPrime: data.isPrime, value: value}))
      .catch(err => console.log(err)),
  check: input => (state, actions) => {
    actions.setInput(input);
    if (/^\d+$/.test(input)) {
      actions.checkPrime(input);
    } else if (/^[0-9\+]*.\d$/.test(input)) {
      actions.sumAndCheck(input.replace(/\+/g, ','));
    } else if (input == '') {
      actions.setState({value: 0, isPrime: false});
    } else {
      actions.setError('Invalid equation');
    }
  },
  setState: newState => state => ({
    value: newState.value,
    isPrime: newState.isPrime,
    error: null,
  }),
  setInput: newInput => state => ({input: newInput}),
  setError: newError => state => ({error: newError}),
};

const view = (state, actions) =>
  div([
    h2(
      'Check if your number or sum equation is a prime number (eg. 1+2+3 or 6)',
    ),
    input({
      type: 'text',
      value: state.input,
      oninput: el => actions.check(el.target.value),
    }),
    h2({style: {color: 'red'}}, state.error),
    h2('Number: ' + state.value),
    h2('Is a prime number: ' + state.isPrime),
  ]);

const main = app(state, actions, view, document.body);
