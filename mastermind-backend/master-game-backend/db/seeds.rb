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

Game.create(username: 'John', trials: 5)
Game.create(username: 'Anna', trials: 2)

puts "Done!"
