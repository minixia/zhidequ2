#encoding: utf-8

ZhidequSite.controller :plan do
  get '/:id/intro' do
    @plan = Plan.find_by_id(params[:id])
    if @plan.blank?
      halt 404
    else
      @intro = @plan.plan_intro
      render 'plan/intro'
    end
  end

  get '/new' do
    @plan = Plan.new()
    render '/plan/new_plan'
  end

  get '/:id' do
    @plan = Plan.find_by_id(params[:id])
    render '/plan/show'
  end

  post '/' do
    @plan = Plan.new(params[:plan])
    if @plan.save
      flash[:notice] = '计划创建成功'
      redirect url(:plan, :show, :id => @plan.id)
    else
      render 'plan/new_plan'
    end
  end

end