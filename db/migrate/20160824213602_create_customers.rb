class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.integer :age, null: false

      t.timestamps null: false
    end
  end
end
