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
    @plan =  Plan.find_by_id(params[:id])
    @schedules = Schedule.where(plan_id: params[:id]).order(:id)
    @tips = Tip.where(plan_id: params[:id]).order(:id)
    intro_records = Intro.where(plan_id: params[:id]).order(:id)
    @questions = Question.all.limit(10)
    @intros = Hash.new
    intro_records.each do |intro|
      @intros[intro.title] = intro
    end
    @locations = Array.new
    location = ""
    day = ""
    day_counter = 0
    prev_schedule = nil
    @schedules.each do |schedule|
      if(schedule.location != location)
        location = schedule.location
        @locations.push({:id => schedule.id, :location => schedule.location, :schedule => schedule, :days => day_counter})
        if(prev_schedule)
          prev_schedule.next_loc = schedule
          schedule.prev_loc = prev_schedule
        end
        schedule.loc_start = true;
      else
        schedule.loc_start = false;
      end
      if(schedule.day != day)
        day_counter = day_counter + 1
        day = schedule.day
        schedule.day_start = true;
      else
        schedule.day_start = false;
      end
      prev_schedule = schedule
    end

    if @schedules.size == 0
      halt 404
    else
      render '/plan/schedule'
    end
  end

end