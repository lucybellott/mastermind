class Game < ApplicationRecord

    validates :username, presence: true, uniqueness: true, length: { in: 2..20 }
    # validate :max_games

    # Game.last.destroy if Game.all.length > 10

    def max_games
        errors.add(:base, "No more than 10 games allowed on record") unless Game.all.length < 10
    end
    
    # def lowest_score
    #     Game.maximum(:trials)
    # end


end
