# Clear the existing projects to avoid duplicates
Project.destroy_all

# Create 20 dummy projects using Faker
100.times do
  Project.create!(
    name: Faker::App.name,
    description: Faker::Lorem.paragraph(sentence_count: 5),
    created_at: Faker::Date.backward(days: 365),
    updated_at: Faker::Date.backward(days: 30)
  )
end

puts "Created 100 dummy projects."
