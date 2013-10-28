#coding: utf-8
require 'pathname'
require 'roo'

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
    2.upto(xls.last_row) do |line|
      action = xls.cell(line, 'B')
      schedule = Schedule.new
      schedule.plan = plan
      schedule.action = action
      day = xls.cell(line, 'A')
      if(day.blank?)
        day = pre_day
      else
        pre_day = day
      end
      schedule.day = day
      schedule.start = xls.cell(line, 'C')
      schedule.path = xls.cell(line, 'D')
      schedule.traffic_fee = xls.cell(line, 'E')
      schedule.ticket_fee = xls.cell(line, 'F')
      schedule.play_time = xls.cell(line, 'G')
      schedule.desc = xls.cell(line, 'H')
      schedule.start_time = xls.cell(line, 'I')
      schedule.open_time = xls.cell(line, 'J')
      schedule.official_site = xls.cell(line, 'K')
      schedule.addr = xls.cell(line, 'L')
      schedule.food = xls.cell(line, 'M')
      schedule.shop = xls.cell(line, 'N')
      schedule.img = xls.cell(line, 'P')
      schedule.comment = xls.cell(line, 'R')
      schedule.save
      puts "schedule #{schedule.action} imported"
    end

    #import tips
    xls.default_sheet = xls.sheets[5]
    Tip.where(plan_id: plan.id).delete_all
    1.upto(xls.last_row) do |line|
      tip = Tip.new
      tip.plan = plan
      tip.title = xls.cell(line, 'A');
      tip.section = xls.cell(line, 'B');
      tip.content = xls.cell(line, 'C');
      tip.save
      puts "tip #{tip.section} imported"
    end

  end
end