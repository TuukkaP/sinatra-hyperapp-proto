//@format
const {h, app} = hyperapp;
const {div, h2, input} = html;

const state = {
  result: 0,
  isPrime: false,
  error: null,
};

const actions = {
  // Could use async + await
  // If there was two separate actions for the sum and prime checking
  //
  // With async await
  //fetchResult: ({action, input}) => async (state, actions) => {
  //  const sumDataRes = await fetch(`api?action=sumandcheck&value=${input}`);
  //  const sumDataJson = await sumDataRes.json();
  //  const isPrimeRes = await fetch(
  //    `api?action=checkprime&value=${sumDataJson.result}`,
  //  );
  //  const isPrimeJson = await isPrimeRes.json();
  //  await actions.setState({
  //    result: sumDataJson.result,
  //    isPrime: isPrimeJson.isPrime,
  //  });
  //},
  //
  // With chained API calls
  //fetchResult: ({action, input}) => (state, actions) =>
  //  fetch(`api?action=sumandcheck&value=${input}`)
  //    .then(response => response.json())
  //    .then(data => fetch(`api?action=checkprime&value=${data.result}`))
  //    .then(response => response.json())
  //    .then(data => actions.setState(data))
  //    .catch(err => console.log(err)),
  fetchResult: ({action, input}) => (state, actions) =>
    fetch(`api?action=${action}&value=${input}`)
      .then(response => response.json())
      .then(data => actions.setState(data))
      .catch(err => console.log(err)),
  check: input => (state, actions) => {
    // If input contains only digits
    // => checkprime
    // If input contains only digits and plus (last char is not plus)
    // => sumandcheck and parse params and replace + => ,
    if (/^\d+$/.test(input)) {
      actions.fetchResult({
        action: 'checkprime',
        input: input,
      });
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
