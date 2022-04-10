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
    render json: Game.all, status: :created, location: @game
   
    else
      render json: @game.errors, status: :unprocessable_entity
    end

   end

  end

  #LOWEST SCORE
  def lowest_score
    Game.maximum(:trials)
  end

#   def create
#     game = Game.create!(game_params)
    
#     if Game.all.length <= 10 && Game.find(params[:trials])

#     render json: game, status: :created
# end

 
# PATCH/PUT /games/1
  # def update
  #   if @game.update(game_params)
  #     render json: @game
  #   else
  #     render json: @game.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /games/1
  
  
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
