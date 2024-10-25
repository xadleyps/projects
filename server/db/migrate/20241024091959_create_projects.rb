class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.string :status
      t.datetime :due_date

      t.timestamps
    end
  end
end
