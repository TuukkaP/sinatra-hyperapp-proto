# Sinatra + Hyperapp proto

This repo is a test drive with hyperapp.js (https://github.com/hyperapp/hyperapp) using a simple sinatra backend for prime numbers.

## Requirements
- Ruby 2.4

Should work with older ruby versions but in dev I used 2.4.

## Install
- Clone repo
- `bundle install`
- `ruby server.rb`
- Go to http://localhost:4567/index.html
- Profit?

## Test
- Run `rspec`

## Future thoughts
- Return error from backend when input or action is invalid
- Metaprogram actions to separate class
  - Action is linked to similar function
  - `method_missing` for non-existent actions
- JS runner for JS tests
- If more `fetch` actions needed create helper method with `async` and `await`
