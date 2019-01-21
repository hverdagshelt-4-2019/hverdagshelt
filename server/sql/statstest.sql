-- National stats
select status, count(*) as 'number_of_tickets_with_status' from ticket group by status;

select category, count(*) as 'tickets_in_categories' from ticket group by category;


-- Communal stats
select responsible_commune as 'commune', count(*) from ticket group by responsible_commune;

select status, responsible_commune as 'commune', count(*) as 'number_of_tickets' from ticket group by commune, status;

select category, responsible_commune as 'commune', count(*) as 'tickets_in_communes' from ticket group by resp-- National stats
select status, count(*) as 'number_of_tickets_with_status' from ticket group by status;

select category, count(*) as 'tickets_in_categories' from ticket group by category;


-- Communal stats
select responsible_commune as 'commune', count(*) from ticket group by responsible_commune;

select status, responsible_commune as 'commune', count(*) as 'number_of_tickets' from ticket group by commune, status;

select category, responsible_commune as 'commune', count(*) as 'tickets_in_communes' from ticket group by responsible_commune, category;


-- Percentage of solved (Total)
select (select count(*) from ticket where status = 'Fullført') as done,
  (SELECT count(*) from ticket where status != 'Fullført') as unprocessed,
  (select count(*) from ticket) as total,
  ((select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100) as percentage;

-- Precantage solved (By commune)
select a.responsible_commune, total, unprocessed, finished, `fuck sql` from  (select responsible_commune, count(*) as total from ticket GROUP BY responsible_commune)  a left join
  (select responsible_commune, count(*) as unprocessed from ticket where status != 'Fullført' group by responsible_commune) c on a.responsible_commune = c.responsible_commune left join
  (SELECT responsible_commune, count(*) as finished from ticket where status = 'Fullført' GROUP BY responsible_commune) b on a.responsible_commune = b.responsible_commune left join
  (select responsible_commune, (select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100 as 'fuck sql' from ticket group by responsible_commune) d on a.responsible_commune = d.responsible_commune;

-- Percentage solved (By category)
select a.category, total, unprocessed, finished, `fuck sql` from  (select category, count(*) as total from ticket GROUP BY category)  a left join
  (select category, count(*) as unprocessed from ticket where status != 'Fullført' group by category) c on a.category = c.category left join
  (SELECT category, count(*) as finished from ticket where status = 'Fullført' GROUP BY category) b on a.category = b.category left join
  (select category, (select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100 as 'fuck sql' from ticket group by category) d on a.category = d.category;onsible_commune, category;


-- Percentage of solved (Total)
select (select count(*) from ticket where status = 'Fullført') as done,
  (SELECT count(*) from ticket where status != 'Fullført') as unprocessed,
  (select count(*) from ticket) as total,
  ((select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100) as percentage;

-- Precantage solved (By commune)
select a.responsible_commune, total, unprocessed, finished, `fuck sql` from  (select responsible_commune, count(*) as total from ticket GROUP BY responsible_commune)  a left join
  (select responsible_commune, count(*) as unprocessed from ticket where status != 'Fullført' group by responsible_commune) c on a.responsible_commune = c.responsible_commune left join
  (SELECT responsible_commune, count(*) as finished from ticket where status = 'Fullført' GROUP BY responsible_commune) b on a.responsible_commune = b.responsible_commune left join
  (select responsible_commune, (select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100 as 'fuck sql' from ticket group by responsible_commune) d on a.responsible_commune = d.responsible_commune;

-- Percentage solved (By category)
select a.category, total, unprocessed, finished, `fuck sql` from  (select category, count(*) as total from ticket GROUP BY category)  a left join
  (select category, count(*) as unprocessed from ticket where status != 'Fullført' group by category) c on a.category = c.category left join
  (SELECT category, count(*) as finished from ticket where status = 'Fullført' GROUP BY category) b on a.category = b.category left join
  (select category, (select count(*) from ticket WHERE status = 'Fullført')/(select count(*) from ticket)*100 as 'fuck sql' from ticket group by category) d on a.category = d.category;