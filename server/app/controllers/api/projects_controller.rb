class Api::ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :update, :destroy]
  
    # GET /projects
    def index
      projects = Project.order(created_at: :desc).page(params[:page]).per(params[:per_page] || 10)
      
      # Return paginated response
      render json: {
        projects: projects,
        total_pages: projects.total_pages,
        current_page: projects.current_page,
        next_page: projects.next_page,
        prev_page: projects.prev_page,
        total_count: projects.total_count
      }
    end
  
    # GET /projects/:id
    def show
      render json: @project
    end
  
    # POST /projects
    def create
      @project = Project.new(project_params)
      if @project.save
        render json: @project, status: :created
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /projects/:id
    def update
      if @project.update(project_params)
        render json: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /projects/:id
    def destroy
      @project.destroy
      head :no_content
    end
  
    private
  
    def set_project
      @project = Project.find(params[:id])
    end
  
    def project_params
      params.require(:project).permit(:name, :description, :status, :created_at, :due_date)
    end
  end
  