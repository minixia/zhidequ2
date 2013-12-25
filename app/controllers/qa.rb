ZhidequSite.controller :qa do
  layout :application

  get "/:code" do
    @question = Question.find_by_code(params[:code])
    @related_questions = Question.all.limit(10)
    if @question.blank?
      halt 404
    else
      render 'qa/show'
    end
  end

  get :index do

  end

end