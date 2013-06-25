# encoding: utf-8
require 'xmlrpc/client'

ZhidequSite.helpers do

  # authentication helpers
  def current_account
    return @current_account if @current_account
    return @current_account = Account.find_by_id(session[:account_id]) if session[:account_id]
    if request.cookies['user'] && (@current_account = Account.validate_cookie(request.cookies['user']))
      session[:account_id] = @current_account.id
      return @current_account
    end
  end

  def account_login?
    current_account ? true : false
  end

  def account_admin?
    current_account && current_account.admin? ? true : false
  end

  def account_commenter?
    current_account && current_account.commenter? ? true : false
  end

  def m2h(content)
    if(content.nil?)
      content == ""
    end
    RDiscount.new(content.gsub("\n", "\n\n"), :smart, :autolink, :filter_html).to_html()
  end

end
