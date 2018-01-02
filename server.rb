require "sinatra"
require "sinatra/json"
require "prime"

# Serve static files
set :public_folder, File.dirname(__FILE__) + '/public'

# RPC endpoint
# to_i parses strings to integers, invalid return 0
# 0 isn't a prime number returning false for invalid strings
get "/api" do
  result =
    case params["action"]
    when "checkprime"
      { result: params["value"], isPrime: Prime.prime?(params["value"].to_i) }
    when "sumandcheck"
      sum = params["value"].split(",").map(&:to_i).sum
      { result: sum, isPrime: Prime.prime?(sum) }
    else
      {}
    end

  json result
end
