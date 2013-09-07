#source 'https://rubygems.org'
source 'http://ruby.taobao.org'
# Project requirements
gem 'rake'

gem 'padrino-core', '~> 0.11'
gem 'padrino-helpers', '~> 0.11'

#template engine
gem 'tilt', '~> 1.3.7'
gem 'haml'


# Component requirements
gem 'bcrypt-ruby', :require => 'bcrypt'
gem 'erubis', '~> 2.7.0'
gem 'activerecord', '~> 4.0', :require => 'active_record'
gem 'mysql2'
gem 'dalli', :require => 'active_support/cache/dalli_store'
gem 'kgio'
gem "second_level_cache", "~> 2.0.0.rc1"
gem 'github-markdown', :require => 'github/markdown'
gem 'will_paginate', :require => ['will_paginate/active_record', 'will_paginate/view_helpers/sinatra']
gem 'sanitize'
gem 'carrierwave', :require => ['carrierwave', 'carrierwave/orm/activerecord']
gem 'mini_magick'
gem 'rest-client'
#markdown
gem 'rdiscount'

# Production requirements
group :production do
  gem 'zbatery'
  # gem 'rainbows'
end

# Development requirements
group :development do
  gem 'pry-padrino'
  gem 'padrino-gen', '~> 0.11'
  gem 'thin'

  #parse excel for import data
  gem 'roo'
  gem 'zip', :require => 'zip/zip'
end

# Test requirements
group :test do
  gem 'minitest'
  gem 'rack-test', :require => "rack/test"
  gem 'factory_girl'
  gem 'database_cleaner'
end
