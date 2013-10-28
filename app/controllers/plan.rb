#encoding: utf-8

ZhidequSite.controller :plan do
  layout :application

  get '/:id' do
    @plan = Plan.find_by_id(params[:id])
    if @plan.blank?
      halt 404
    else
      render 'plan/show'
    end
  end

  get :schedule, :map => '/plan/:id/schedules' do
    @schedules = Schedule.where(plan_id: params[:id]).order(:id)
    @tips = Tip.where(plan_id: params[:id]).order(:id)
    if @schedules.size == 0
      halt 404
    else
      render '/plan/schedule'
    end
  end

end