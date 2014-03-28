#!/usr/bin/env ruby

require 'sinatra'

set :bind, '0.0.0.0'

set :port, ARGV[0] || 3000

set :public_folder, File.dirname(__FILE__)

