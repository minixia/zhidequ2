db_config = YAML::load(File.open(File.expand_path("#{PADRINO_ROOT}/config", __FILE__) + '/database.yml'))
[:development, :production, :test].each do |env|
  #hash load from yml's key is string ,but active record need symbol,so convert it
  config = db_config[env.to_s].inject({}){|cfg,(k,v)| cfg[k.to_sym] = v; cfg}
  ActiveRecord::Base.configurations[env] = config
end

# Setup our logger
ActiveRecord::Base.logger = logger



# Include Active Record class name as root for JSON serialized output.
ActiveRecord::Base.include_root_in_json = false

# Store the full class name (including module namespace) in STI type column.
ActiveRecord::Base.store_full_sti_class = true

# Use ISO 8601 format for JSON serialized times and dates.
ActiveSupport.use_standard_json_time_format = true

# Don't escape HTML entities in JSON, leave that for the #json_escape helper
# if you're including raw JSON in an HTML page.
ActiveSupport.escape_html_entities_in_json = false

# Set timezone to local
ActiveRecord::Base.default_timezone = :local
ActiveRecord::Base.time_zone_aware_attributes = false

# Now we can establish connection with our db.
ActiveRecord::Base.establish_connection ActiveRecord::Base.configurations[PADRINO_ENV.to_sym]
