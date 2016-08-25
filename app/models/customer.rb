class Customer < ActiveRecord::Base
  validates :name, :age, :location, :presence => true
end
