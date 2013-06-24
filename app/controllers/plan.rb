#encoding: utf-8

ZhidequSite.controller :plan do
  get '/plan/:id/intro' do
    @plan = Plan.find_by_id(params[:id])
    if @plan.blank?
      halt 404
    else
      @intro = @plan.plan_intro
      render 'plan/intro'
    end
  end
end