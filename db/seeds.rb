# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "clearing data...."
Game.destroy_all


puts "Seeding games..."

puts "clearing data...."
Game.destroy_all

puts "Seeding games..."

# Easy mode scores
Game.create(username: 'John', trials: 5, difficulty: 'easy')
Game.create(username: 'Anna', trials: 2, difficulty: 'easy')
Game.create(username: 'Mike', trials: 3, difficulty: 'easy')
Game.create(username: 'Sara', trials: 4, difficulty: 'easy')

# Hard mode scores
Game.create(username: 'Alex', trials: 6, difficulty: 'hard')
Game.create(username: 'Emma', trials: 3, difficulty: 'hard')
Game.create(username: 'Chris', trials: 8, difficulty: 'hard')
Game.create(username: 'Olivia', trials: 5, difficulty: 'hard')
Game.create(username: 'James', trials: 7, difficulty: 'hard')

puts "Done!"
