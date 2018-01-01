require 'sinatra'
require 'sinatra/json'
require 'prime'

# RPC endpoint
# to_i parses strings to integers, invalid return 0
# 0 isn't a prime number returning false for invalid strings
get '/api' do
  result =
    case params["action"]
    when "checkprime"
      { isPrime: Prime.prime?(params["number"].to_i) }
    when "sumandcheck"
      sum = params["numbers"].split(",").map(&:to_i).sum
      {
        result: sum,
        isPrime: Prime.prime?(sum)
      }
    else
      {}
    end

  json result
end
