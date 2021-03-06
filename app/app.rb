class ZhidequSite < Padrino::Application
  use ActiveRecord::ConnectionAdapters::ConnectionManagement
  register Padrino::Rendering
  register Padrino::Helpers
  register WillPaginate::Sinatra

  enable :sessions
  mime_type :md, 'text/plain'

  get "/" do
    status, headers, body = call env.merge("PATH_INFO" => '/plan/1')
    [status, headers, body]
  end

  # layout  :my_layout            # Layout can be in views/layouts/foo.ext or views/foo.ext (default :application)
  layout :application

  error ActiveRecord::RecordNotFound do
    halt 404
  end

  error 401 do
    render 'error/401'
  end

  error 403 do
    render 'error/403'
  end

  error 404 do
    render 'error/404', :layout => 'application'
  end

  error 500 do
    render 'error/500'
  end
end