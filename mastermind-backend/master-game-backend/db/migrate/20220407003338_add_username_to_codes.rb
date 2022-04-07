class AddUsernameToCodes < ActiveRecord::Migration[7.0]
  def change
    add_column :codes, :username, :string
  end
end
