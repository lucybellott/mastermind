namespace :build do
  desc "Move React build to Rails public folder"
  task :frontend => :environment do
    puts "Copying React build to public folder..."
    FileUtils.rm_rf(Rails.root.join('public', 'assets'))  # optional: remove old assets
    FileUtils.cp_r(Rails.root.join('client', 'build', '.'), Rails.root.join('public'))
  end
end
