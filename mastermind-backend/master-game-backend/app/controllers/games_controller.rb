class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]

  # GET /games
  def index
    @games = Game.all

    sorted_game =  @games.order(:trials)

    render json: sorted_game
  end

  # GET /games/1
  def show
    render json: @game
  end

  # POST /games
  def create
  @game = Game.new(game_params)

  if Game.count < 10
    @game.save 
    render json: @game, status: :created, location: @game

  else
    
  if @game[:trials] < lowest_score 
    delete_user = Game.find_by(trials: lowest_score)
    delete_user.destroy
   
   @game.save 
    render json: @game, status: :created, location: @game
   
    else
      render json: @game.errors, status: :unprocessable_entity
     end
    end
  end

  #LOWEST SCORE
  def lowest_score
    Game.maximum(:trials)
  end

  
  def destroy
    @game.destroy
  end

 

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:username, :trials)
    end
end
