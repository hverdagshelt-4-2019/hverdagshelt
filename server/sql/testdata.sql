-- Random users.

INSERT INTO person(email, password) VALUES('Idella@hotmail.com', '');   
INSERT INTO person(email, password) VALUES('isobel@hotmail.com', '');
INSERT INTO person(email, password) VALUES('JanetMckenney23@hotmail.com', '');
INSERT INTO person(email, password) VALUES('ArdelleSetzer34@hotmail.com', '');
INSERT INTO person(email, password) VALUES('Clara26@hotmail.com', '');
INSERT INTO person(email, password) VALUES('adrian@hotmail.com', '');
INSERT INTO person(email, password) VALUES('Shannon1960@hotmail.com', '');
INSERT INTO person(email, password) VALUES('Lenorebenz@hotmail.com', '');
INSERT INTO person(email, password) VALUES('KaraSiller1981@hotmail.com', '');
INSERT INTO person(email, password) VALUES('Wynona1992@hotmail.com', '');


-- Random categories.

INSERT INTO ticket_category(name) VALUES('Forsøpling');
INSERT INTO ticket_category(name) VALUES('Vei og parkering');
INSERT INTO ticket_category(name) VALUES('Avløp');
INSERT INTO ticket_category(name) VALUES('Drikkevann');
INSERT INTO ticket_category(name) VALUES('Sykkel');
INSERT INTO ticket_category(name) VALUES('Vinterdrift');

-- Random tickets.

INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(10, 'Sel', 'Vinterdrift', 'Hull i veg Morviksanden', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43149, 10.395900000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(2, 'Saltdal', 'Sykkel', 'Behov for feiing av vei/fortauGodvik', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43129, 10.395650000000002);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(1, 'Nord-Fron', 'Avløp', 'Fortau skadet Osvegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430859999999996, 10.39511);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(4, 'Bindal', 'Sykkel', 'Hull i veg Kirkegaten', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431309999999996, 10.395660000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(6, 'Oppegård', 'Vinterdrift', 'Behov for brøyting', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431419999999996, 10.395090000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(3, 'Kvalsund', 'Sykkel', 'Hull i veg Møllendalsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430769999999995, 10.39522);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(7, 'Leikanger', 'Vei og parkering', 'Behov for brøyting strøing Vinddalsveien ', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43107, 10.39541);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(4, 'Kristiansund', 'Drikkevann', 'Behov for brøyting/strøing', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43087, 10.39597);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(3, 'Naustdal', 'Vinterdrift', 'annet vei Stavkirkevegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43055, 10.39508);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(2, 'Elverum', 'Sykkel', 'Behov for brøyting strøing Kismulvegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43085, 10.39605);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(4, 'Skiptvet', 'Avløp', 'Behov for brøyting strøing Kistebakkane', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43068, 10.395190000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(7, 'Skjervøy', 'Drikkevann', 'Kum lokk borte/skadet - Ring 5556 7815', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43114, 10.395150000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(9, 'Vik', 'Sykkel', 'Vann i vei/terreng Øvsttunlia', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43059, 10.39578);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(1, 'Fauske', 'Drikkevann', 'Fortau skadet Haukelandsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43108, 10.395280000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(7, 'Sveio', 'Vei og parkering', 'Parkering uregistrert kjøretøyGerhard Grans vei', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43121, 10.395330000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(1, 'Risør', 'Forsøpling', 'Hull i veg Kirkegaten', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43099, 10.395650000000002);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(8, 'Trysil', 'Forsøpling', 'annet vei Stavkirkevegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431, 10.395230000000002);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(5, 'Oppegård', 'Sykkel', 'Behov for brøyting strøing Nordre Toppe', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43138, 10.395430000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(1, 'Selbu', 'Vinterdrift', 'Fortau skadet Haukelandsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430839999999996, 10.395190000000001);
INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES(4, 'Fjell', 'Forsøpling', 'Behov for feiing av vei/fortau Godvik', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43085, 10.395950000000001);

-- Random ticket comments.

INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'Still better looking than BFV', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(8, 'DC MEDIA NEWSWIRE 582k dislikes for battlefield V reveal trailer', 1);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'reubz1123 infinite Warfare was clearly more of a copy and paste of Black Ops 3 rather than BO4 by its game play', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'Israel Mohr you are Crazy dude', 9);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'Yea this game haves its ups and downs but man fr this game really aint as bad as people say it is', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'This trailer really starts at 3:00', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Tienes Drogas?', 1);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(4, '3.7 million dislikes in 2018 HAHAHA War never changes', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Am I the only one that actually liked this game', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'I feel like most of the dislikes here were cause of some people being really tired of the futuristic setting but mostly from people jumping on a bandwagon.', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'I actually like this game i buyed it like 2 weeks ago', 3);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(9, 'isrral who r u talking to?', 3);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(9, 'It was a good game, too bad the circle jerk was so strong lmao', 7);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Why is there so many dislikes?', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'This game is beautiful I don’t know why people hate it', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'The numbers Mason, what do they mean? - I don’t know anything about any number!', 7);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'Who is the song??', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, '@magic22 you know 0/1 kdr is worse?', 3);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Who came here after battlefield 5?', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, '@yasser elbouz idk its just fun to see like/dislike ratio', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'RedKap same happens with BF5.', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Ahhhh,I get it. I tot people are angry about the trailer.', 7);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'Wow who knew this new star wars battlefront game was out ... oh wait', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'cool but will never match the emotions of mw', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'Who’s here in 28482?', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'I love this game', 9);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Wow so much dislikes....', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'Same here', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(4, 'wolfman234 yet when we got cod ww2 everyone hated on it...', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(7, '3.6 million dislikes', 9);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, '"Bigest suprise attack in the history of the world, how did they not see this coming?" Bruh', 9);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'Omg 3m dislike Lol', 1);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Can we get 4mil dislikes?', 5);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'August 2018?', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'Battlefield 5 reveal trailer trying to break this record', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'We need more dislikes', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(4, 'Infinity War > Infinite Warfare', 7);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Street Pkchas what?', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'i was one of the early likers lol i honestly didnt understand the hate for this game', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Who came here to check dislikes', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Im not a CoD fan so tell me why is this so hated lol', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(9, 'its as more likes becuz bo4 is a great game with a zombie campain great multiplayer and battle royale', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(8, 'October but yes', 3);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(7, 'August 6th 6:49pm', 3);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(6, 'No matter what i still love cod iw and is one of my favourite games.', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(5, 'max kerry treyarch would never make such a monster', 8);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(4, 'BEST HALO GAME :dd', 4);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(3, 'Still better than ww2', 2);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(2, 'Made by EA.', 6);
INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES(1, 'Look at that like-dislike ratio', 6);