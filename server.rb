require "sinatra"
require "sinatra/json"
require "prime"

# Serve static files
set :public_folder, File.dirname(__FILE__) + '/public'

# RPC endpoint
# checkprime action:
# /api?action=checkprime&value=5
# returns json: { result: 5, isPrime: true }
#
# sumandcheck action:
# /api?action=sumandcheck&value=3,2
# returns json: { result: 5, isPrime: true }
#
# Future actions
# Return error for invalid format instead of {}
# Metaprogram actions to be functions (action is automatically linked to same function)
# and handle missing actions with method_missing

get "/api" do
  result =
    case params["action"]
    when "checkprime"
      params["value"]
    when "sumandcheck"
      params["value"].split(",").map(&:to_i).sum
    end

  json result ? format_result(result) : {}
end

# to_i parses strings to integers, invalid returns 0
# 0 isn't a prime number returning false for invalid strings
def format_result(value)
  { result: value, isPrime: Prime.prime?(value.to_i) }
end
