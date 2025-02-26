

class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]

  # GET /games
  def index
    @games = Game.all
    
    # Return all games sorted by trials
    sorted_game = @games.order(:trials)

    render json: sorted_game 
  end

  # GET /games/1
  def show
    render json: @game
  end

  # POST /games
  def create
    @game = Game.new(game_params)
    
    # Count games with the same difficulty
    games_with_same_difficulty = Game.where(difficulty: @game.difficulty)
    
    if games_with_same_difficulty.count < 10
      @game.save 
      render json: @game, status: :created, location: @game
    else
      if @game[:trials] < lowest_score(@game.difficulty)
        delete_user = Game.where(difficulty: @game.difficulty).find_by(trials: lowest_score(@game.difficulty))
        delete_user.destroy if delete_user
       
        @game.save 
        render json: @game, status: :created, location: @game
      else
        render json: @game.errors, status: :unprocessable_entity
      end
    end
  end

  # LOWEST SCORE
  def lowest_score(difficulty)
    Game.where(difficulty: difficulty).maximum(:trials) || 0
  end

  def destroy
    @game.destroy
  end

  private
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:username, :trials, :difficulty)
    end
end