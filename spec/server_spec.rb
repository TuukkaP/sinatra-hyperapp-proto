require_relative "../server.rb"
require "rspec"
require "rspec/json_expectations"
require "rack/test"

set :environment, :test

describe "server" do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  describe "api" do
    before { get "/api" }
    it { expect(last_response).to be_ok }
    it { expect(last_response.content_type).to eq "application/json" }
  end

  describe "api actions" do
    subject { last_response.body }

    describe "checkprime" do
      it "returns true for 11" do
        get "/api", { action: "checkprime", value: "11" }
        expect(subject).to include_json(isPrime: true)
      end

      it "returns false for 12" do
        get "/api", { action: "checkprime", value: "12" }
        expect(subject).to include_json(isPrime: false)
      end

      it "returns false for invalid number" do
        get "/api", { action: "checkprime", value: "NaN" }
        expect(subject).to include_json(isPrime: false)
      end
    end

    describe "sumandcheck" do
      it "returns true for 11" do
        get "/api", { action: "sumandcheck", value: "1,2,8" }
        expect(subject).to include_json(
          result: 11,
          isPrime: true
        )
      end

      it "returns false for 12" do
        get "/api", { action: "sumandcheck", value: "1,5,6" }
        expect(subject).to include_json(
          result: 12,
          isPrime: false
        )
        expect(subject).to include_json(isPrime: false)
      end

      it "returns false for invalid numbers" do
        get "/api", { action: "sumandcheck", value: "sladkjhf-,NaN,1" }
        expect(subject).to include_json(
          result: 1,
          isPrime: false
        )
      end
    end
  end
end
