#coding: utf-8
require 'pathname'
require 'roo'
require 'csv'

namespace :import do
  desc "import a travel plan"
  task :plan => :environment do |t, args|
    if(ENV['file'].blank?)
      puts "you need provide import file name like 'file=xxx'"
    end
    file = "#{PADRINO_ROOT}/#{ENV['file']}"
    puts "=========import plan data from excel file: #{file}"
    xls = Roo::Excelx.new(file)
    #import title
    xls.default_sheet = xls.sheets[0]
    plan = Plan.first_or_initialize(title: xls.cell(1, 'A'))
    plan.title = xls.cell(2, 'A')
    plan.sub_title = xls.cell(2, 'B')
    plan.points = xls.cell(2, 'C')
    plan.img = xls.cell(2, 'D')
    plan.save
    puts "plan #{plan.title} imported"

    #import summary
    xls.default_sheet = xls.sheets[1]
    Summary.where(plan_id: plan.id).delete_all
    1.upto(xls.last_row) do |line|
      summary = Summary.new
      summary.plan = plan
      summary.title = xls.cell(line, 'A')
      summary.content = xls.cell(line, 'B')
      summary.save
      puts "summary #{summary.title} imported"
    end

    #import feature
    xls.default_sheet = xls.sheets[2]
    Feature.where(plan_id: plan.id).destroy_all
    1.upto(xls.last_row) do |line|
      feature_type = xls.cell(line, 'A')
      data_type = xls.cell(line, 'D')
      if(data_type == '标题')
        feature = Feature.new
        feature.category =  feature_type
        feature.title = xls.cell(line, 'B')
        feature.img = xls.cell(line, 'C')
        feature.plan = plan
        feature.save
        puts "feature #{feature.title} imported"
      else
        feature_detail = FeatureDetail.new
        feature_detail.feature = feature
        feature_detail.title = xls.cell(line, 'B')
        feature_detail.content = xls.cell(line, 'C')
        feature_detail.save
        puts "feature detail #{feature_detail.title} imported"
      end
    end

    #import schedule
    xls.default_sheet = xls.sheets[3]
    Schedule.where(plan_id: plan.id).delete_all
    pre_day = ""
    pre_location = ""
    2.upto(xls.last_row) do |line|
      location = xls.cell(line, 'B')
      schedule = Schedule.new
      schedule.plan = plan
      day = xls.cell(line, 'A')
      if(day.blank?)
        day = pre_day
      else
        pre_day = day
      end
      if(location.blank?)
        location = pre_location
      else
        pre_location = location
      end
      schedule.day = day
      schedule.location = location
      schedule.action = xls.cell(line, 'C')
      schedule.start = xls.cell(line, 'D')
      schedule.path = xls.cell(line, 'E')
      schedule.traffic_fee = xls.cell(line, 'F')
      schedule.ticket_fee = xls.cell(line, 'G')
      schedule.play_time = xls.cell(line, 'H')
      schedule.desc = xls.cell(line, 'I')
      schedule.start_time = xls.cell(line, 'J')
      schedule.open_time = xls.cell(line, 'K')
      schedule.official_site = xls.cell(line, 'L')
      schedule.addr = xls.cell(line, 'M')
      schedule.food = xls.cell(line, 'N')
      schedule.shop = xls.cell(line, 'O')
      schedule.img = xls.cell(line, 'Q')
      schedule.comment = xls.cell(line, 'S')
      schedule.save
      puts "schedule #{schedule.action} imported"
    end

    #import tips
    xls.default_sheet = xls.sheets[5]
    Tip.where(plan_id: plan.id).delete_all
    1.upto(xls.last_row) do |line|
      if(xls.cell(line, 'D') == '行程建议')
        tip = Tip.new
        tip.plan = plan
        tip.title = xls.cell(line, 'A');
        tip.section = xls.cell(line, 'B');
        tip.content = xls.cell(line, 'C');
        tip.save
        puts "tip #{tip.section} imported"
      end
    end

    #import intros
    xls.default_sheet = xls.sheets[5]
    Tip.where(plan_id: plan.id).delete_all
    1.upto(xls.last_row) do |line|
      if(xls.cell(line, 'D') == '城市')
        intro = Intro.new
        intro.plan = plan
        intro.title = xls.cell(line, 'A');
        intro.section = xls.cell(line, 'B');
        intro.content = xls.cell(line, 'C');
        intro.save
        puts "intro #{intro.section} imported"
      end
    end

  end

  desc "import native accounts"
  task :account => :environment do |t, args|
    if(ENV['file'].blank?)
      puts "you need provide import file name like 'file=xxx'"
    end
    csv_file = "#{PADRINO_ROOT}/#{ENV['file']}"
    puts "=========import account data from csv file: #{csv_file}"
    m = { "name" => 0, "pwd" => 1, "gender" => 2, "desc" => 3} #column mapping
    CSV.foreach(csv_file) {|row|
      user = Account.find_by_name(row[m["name"]])
      if(!user)
        user = Account.new
        user.name = row[m["name"]]
      end
      puts "--------import user: #{user.name}"
      user.password = row[m["pwd"]]
      user.password_confirmation = row[m["pwd"]]
      user.gender = row[m["gender"]]
      user.role = "commenter"
      user.email = "#{user.name}@zhidequ.com"
      user.user_type = "fake"
      user.save!
    }
    man_headers = woman_headers = person_headers = Array.new
    Dir.foreach("#{PADRINO_ROOT}/data/images/header/man"){|f| man_headers<< "#{PADRINO_ROOT}/data/images/header/man/#{f}" if(f=~/.+ico/) }
    Dir.foreach("#{PADRINO_ROOT}/data/images/header/woman"){|f| woman_headers<< "#{PADRINO_ROOT}/data/images/header/woman/#{f}" if(f=~/.+ico/) }
    Dir.foreach("#{PADRINO_ROOT}/data/images/header/person"){|f| person_headers<< "#{PADRINO_ROOT}/data/images/header/person/#{f}" if(f=~/.+ico/) }
    i=0
    Account.where("gender like '男'").each{|user| user.logo = File.new(man_headers[i%man_headers.length]); user.save!;i+=1;}
    i=0
    Account.where("gender like '女'").each{|user| user.logo = File.new(woman_headers[i%woman_headers.length]); user.save!;i+=1;}
    i=0
    Account.where("gender like '未知'").each{|user| user.logo = File.new(person_headers[i%person_headers.length]); user.save!;i+=1;}
  end

  desc "import qa list from xlsx file"
  task :qa => :environment  do |t, args|
    if(ENV['file'].blank?)
      puts "you need provide import file name like 'file=xxx'"
    end
    file = "#{PADRINO_ROOT}/#{ENV['file']}"
    puts "=========import qa data from excel file: #{file}"
    xls = Roo::Excelx.new(file)
    #import qa
    askers = Account.where("name != '歪脖'")
    replier = Account.find_by(name: "歪脖")
    xls.default_sheet = xls.sheets[1]
    Question.delete_all
    Answer.delete_all
    4.upto(xls.last_row) do |line|
      q = Question.new
      q.code = xls.cell(line, 'C')
      q.title = xls.cell(line, 'H')
      q.content = xls.cell(line, 'H')
      asker = askers[rand(0...askers.length)]
      asked_at = Time.at((Time.now.to_f - (Time.now - 30.days).to_f)*rand +  (Time.now - 30.days).to_f)
      asker.ask(q, asked_at)
      reply_at = Time.at((Time.now.to_f - asked_at.to_f)*rand +  asked_at.to_f)
      a = Answer.new
      a.content = xls.cell(line, 'I')
      a.question = q
      replier.answer(a, reply_at)
      puts "question #{q.title} imported"
    end
  end
end