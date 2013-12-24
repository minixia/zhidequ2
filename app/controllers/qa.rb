ZhidequSite.controller :qa do
  layout :application

  get "/:id" do
    @question = Question.find_by_id(params[:id])
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