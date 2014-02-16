ZhidequSite.controller :feature do
  layout :application

  get "/:id" do
    @features = FeatureDetail.where(feature_id: params[:id])
    if @features.size == 0
      halt 404
    else
      render 'feature/show'
    end
  end

  get :index do

  end

end