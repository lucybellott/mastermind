class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :username
      t.integer :trials

      t.timestamps
    end
  end
end
