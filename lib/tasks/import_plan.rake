#coding: utf-8
require 'csv'
require 'pathname'

namespace :import do
  desc "import a travel plan"
  task :plan, [:filename] => :environment do |t, args|
    file = "#{PADRINO_ROOT}/#{args[:filename]}"
    puts "=========import plan data from csv_file: #{file}"
    if(Pathname.new(file).file?)
      m = { "chapter" => 0, "section" => 3, "duration" => 4 ,"content" => 6, "type" => 8} #column mapping
      plan_title = Pathname.new(file).basename(".csv").to_s
      plan = Plan.find_by_title(plan_title)
      if(!plan)
        plan = Plan.new({:title => plan_title, :summary => ""})
        plan.save!
      end
      plan_intro = PlanIntro.find_by_title(plan_title)
      if(!plan_intro)
        plan_intro = PlanIntro.new({:title => plan_title, :summary => ""})
        plan_intro.plan = plan
        plan_intro.save!
      end
      CSV.foreach(file, :row_sep => "\r\n") {|row|
        chapter_title = row[m["chapter"]]
        chapter = PlanIntroChapter.find_by_title(chapter_title)
        if(!chapter)
          chapter = PlanIntroChapter.new({:title => chapter_title, :summary => ""})
          chapter.plan_intro = plan_intro
          chapter.save!
        end
        section = PlanIntroSection.new({:title => row[m["section"]],
                                        :content => row[m["content"]],
                                        :section_type => row[m["type"]],
                                        :duration => row[m["duration"]],
                                        :plan_intro_chapter => chapter
                          })
        section.save!
      }
    else
      puts "error, you need point to what file you want to import"
    end
  end
end