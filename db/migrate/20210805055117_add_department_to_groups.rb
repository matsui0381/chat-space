class AddDepartmentToGroups < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :department, :string
  end
end
