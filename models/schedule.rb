class Schedule < ActiveRecord::Base
  belongs_to :plan

  def loc_start=(start)
    @loc_start = start
  end

  def is_loc_start?
    @loc_start
  end

  def day_start=(start)
    @day_start = start
  end

  def is_day_start?
    @day_start
  end

  def prev_loc=(loc)
    @prev_loc = loc
  end

  def next_loc=(loc)
    @next_loc = loc
  end

  def prev_loc
    @pre_loc
  end

  def next_loc
    @next_loc
  end

end