class AddDifficultyToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :difficulty, :string, default: 'hard'
  end
end
