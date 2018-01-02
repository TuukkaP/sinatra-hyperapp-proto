//@format
const {h, app} = hyperapp;
const {div, h2, input, button} = html;

const state = {
  result: 0,
  isPrime: false,
  error: null,
};

const actions = {
  fetchResult: ({action, input}) => (state, actions) =>
    fetch(`api?action=${action}&value=${input}`)
      .then(response => response.json())
      .then(data => actions.setState(data))
      .catch(err => console.log(err)),
  check: input => (state, actions) => {
    if (/^\d+$/.test(input)) {
      actions.fetchResult({action: 'checkprime', input: input});
    } else if (/^[0-9\+]*.\d$/.test(input)) {
      actions.fetchResult({
        action: 'sumandcheck',
        input: input.replace(/\+/g, ','),
      });
    } else if (input != '') {
      actions.setState({error: 'Invalid equation'});
    }
  },
  setState: newState => state =>
    Object.assign({}, state, {error: null}, newState),
};

const view = (state, actions) =>
  div([
    h2(
      'Check if your number or sum equation is a prime number (eg. 1+2+3 or 6)',
    ),
    input({
      type: 'text',
      oninput: el => actions.check(el.target.value),
    }),
    h2({style: {color: 'red'}}, state.error),
    h2('Number: ' + state.result),
    h2('Is a prime number: ' + state.isPrime),
  ]);

const main = app(state, actions, view, document.body);
