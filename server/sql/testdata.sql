-- Random users. Passwords are passwordI where I is 1-10?

INSERT INTO person(id, email, password) VALUES
(10001, 'Idella@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$1UCGoxEw7AxGcBlNJg+/6aXwJGEdUpGoLgj8OlMabTV/G4Vh6U8eByjEu1nVCpf5VIXaj6EEg2LhkAVwMZ2A9g$+CWrbFcPauE7KiIwsePmFGYC/fCprZZdbmAlqXkWT6F4tebi3rMuOH25y5O0RTjChItZRY377GWCK23fwd3cRA'),
(10002, 'isobel@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$UhZxHFeBR1RFlx1ayEFgED7/FMapk6dFYla4/FWJxPAi+bVGnNP6DQWfTlen7nt+ZHZS5IFoVfPDHa9xxccMRg$Rv82m1CyboDnHOYPOAX62f+DanYW0L65sO6Wd18tDr4Rlu/ESUQZu6yYKsfyrv0ux7EFiNGIrQn9UpWa0IsoNg'),
(10003, 'JanetMckenney23@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$ZzSHnqIyJnD+VRxPB4asBYpvwrUYaeQKPIgWOR6x+9e9HQxImO4Bd5kfh4xNBA4QTwMqVEWGolxKx7Xr3q+c/w$2Mmv/srhvecZgtknEwgxFWqSF0qq2z0rdEFpezbonM2ionz5wdgF8C3Zl0LfIh212EmwMNHsSC2WwKFsVzBaNw'),
(10004, 'ArdelleSetzer34@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$aHw/MTQxeNuYv3EBI6b7/8T8LG5Lk8/5kubIrh4w96SEssVRha1/hC+vuasxhnqUHR+DkZ/I03gxKBSKeo7P0A$JYaklCZoCkhg5m+9OI/RmtOVfARTeO0O656LgPLK/cXlFgLETxygApPcES5cde/7JCOw4+8yFvz28FOMWUqmLg'),
(10005, 'Clara26@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$XuTS8/GCEUg+ZwknqDnu3cQ2rBz2xYfr4d5re1+aaexNms3kpnFQiVNXd7HWJ5Xplu4FJFE70TvdZJAm8DJzoQ$GKta1XIvKxlJVeBziKm1GGbK/db69hJa6UlVUOJMsvr4vw8tTmnjEUaPL6eRT4cwqYhiUqkf/Bt8zHaGya3kVg'),
(10006, 'adrian@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$Q2HSp+TMt30vwDnPn0kuFvViz+DZyrcYVmyRTjW6oL6aRA5UiDsKhTPBdNyEHBXXvS+9RBUQIW8PGu9A4BLEzg$o3kxgzIZ4QMRmiDdxFSqRVy6k6HbR9jsWuk4F0HLbfZXsrvsEHytrTcMP/BVGJQ/1YEPOhDusS5PhRb9HpYU1g'),
(10007, 'Shannon1960@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$olnKNOkPot9r+2LN/rbuaO9cHqQEmIWFX/SdlPAPEZ0LP9w7kFMvviMbipPC9ufELDj1PbW3IXoPUbiqUvnDBg$XE+IekyIIJmphjb1qYZFBenQoeZxInwwBYfLkvgYwcJnMWUNeLpU4S/0DQvWuKHBie0mXcsWXn8A0KykNX6PPw'),
(10008, 'Lenorebenz@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$Dh832fK5KpFUVwMFz0TM1BWt+4HUF9A8xH/7FJdxfsizzW4Ovl5dSImVwfxvhsxMlbXJXDqI7Zhcurvh+IE3mQ$L8SpWxQKkhr+ifW/KXaae5chrPQU0eCRMBiq+7xS7Xvbnew4fGG7qxPfWp5vx3drK6BqnTlNoYya4fszewkKig'),
(10009, 'KaraSiller1981@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$y339mPq9+xquQv1m9jkM0maXSj7yaylYWbBNUQaXwfuaFK04DH8SYQ3MdZxBsMlgg1s2Jsk5qSX8Im7uJuruYQ$qETbdKMfTVtDejhNyaaj1lKm6Zv9YpKB/3RjkpojZzFGuEGMUuuSXIARSowd8h4XjqGwxtRhdGcofpQPhiCaFw'),
(10010, 'Wynona1992@hotmail.com', '$argon2id$v=19$m=4096,t=1,p=1$y0+YoaDZaPulK4pX9Hl15Re31oNu+uAdD3X8QH3sY8bj63sozaIYe3PcesyIJTB1nwtea1wiRBi+CEMkTPYb1w$LGChPAiVvmASmQhcNI9xNJ5/NbEHRk/aU8S6PH4Zq6CwbK2LAwaOWCzGAXJoEfSLsKwDqvOje9BEGBc/vevwrw');


-- Random categories.

INSERT INTO ticket_category(name) VALUES
('Forsøpling'),
('Vei og parkering'),
('Avløp'),
('Drikkevann'),
('Sykkel'),
('Vinterdrift');

-- Random tickets.

INSERT INTO ticket(submitter_id, responsible_commune, category, title, description, picture, submitted_time, status, lat, lng) VALUES
(10, 'Sel', 'Vinterdrift', 'Hull i veg Morviksanden', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43149, 10.395900000000001),
(2, 'Saltdal', 'Sykkel', 'Behov for feiing av vei/fortauGodvik', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43129, 10.395650000000002),
(1, 'Nord-Fron', 'Avløp', 'Fortau skadet Osvegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430859999999996, 10.39511),
(4, 'Bindal', 'Sykkel', 'Hull i veg Kirkegaten', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431309999999996, 10.395660000000001),
(6, 'Oppegård', 'Vinterdrift', 'Behov for brøyting', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431419999999996, 10.395090000000001),
(3, 'Kvalsund', 'Sykkel', 'Hull i veg Møllendalsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430769999999995, 10.39522),
(7, 'Leikanger', 'Vei og parkering', 'Behov for brøyting strøing Vinddalsveien ', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43107, 10.39541),
(4, 'Kristiansund', 'Drikkevann', 'Behov for brøyting/strøing', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43087, 10.39597),
(3, 'Naustdal', 'Vinterdrift', 'annet vei Stavkirkevegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43055, 10.39508),
(2, 'Elverum', 'Sykkel', 'Behov for brøyting strøing Kismulvegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43085, 10.39605),
(4, 'Skiptvet', 'Avløp', 'Behov for brøyting strøing Kistebakkane', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43068, 10.395190000000001),
(7, 'Skjervøy', 'Drikkevann', 'Kum lokk borte/skadet - Ring 5556 7815', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43114, 10.395150000000001),
(9, 'Vik', 'Sykkel', 'Vann i vei/terreng Øvsttunlia', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43059, 10.39578),
(1, 'Fauske', 'Drikkevann', 'Fortau skadet Haukelandsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43108, 10.395280000000001),
(7, 'Sveio', 'Vei og parkering', 'Parkering uregistrert kjøretøyGerhard Grans vei', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43121, 10.395330000000001),
(1, 'Risør', 'Forsøpling', 'Hull i veg Kirkegaten', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43099, 10.395650000000002),
(8, 'Trysil', 'Forsøpling', 'annet vei Stavkirkevegen', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.431, 10.395230000000002),
(5, 'Oppegård', 'Sykkel', 'Behov for brøyting strøing Nordre Toppe', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43138, 10.395430000000001),
(1, 'Selbu', 'Vinterdrift', 'Fortau skadet Haukelandsveien', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.430839999999996, 10.395190000000001),
(4, 'Fjell', 'Forsøpling', 'Behov for feiing av vei/fortau Godvik', 'Lorem ipsum dolor sit amet, id quis malis sanctus mel, suas appetere ius et. Ius timeam inimicus no. Mundi prodesset scripserit duo at. Amet dictas atomorum pri an, ne eum vitae iudico, eu usu everti ocurreret. Mel dico augue maluisset no, convenire dissentias eu sit.', 'https://imgur.com/a/mayoSTu', NOW(), 'denied', 63.43085, 10.395950000000001);

-- Random ticket comments.

INSERT INTO ticket_comment(ticket_id, description, submitter_id) VALUES
(6, 'Still better looking than BFV', 6),
(8, 'DC MEDIA NEWSWIRE 582k dislikes for battlefield V reveal trailer', 1),
(3, 'reubz1123 infinite Warfare was clearly more of a copy and paste of Black Ops 3 rather than BO4 by its game play', 6),
(2, 'Israel Mohr you are Crazy dude', 9),
(2, 'Yea this game haves its ups and downs but man fr this game really aint as bad as people say it is', 6),
(2, 'This trailer really starts at 3:00', 2),
(1, 'Tienes Drogas?', 1),
(4, '3.7 million dislikes in 2018 HAHAHA War never changes', 6),
(1, 'Am I the only one that actually liked this game', 6),
(5, 'I feel like most of the dislikes here were cause of some people being really tired of the futuristic setting but mostly from people jumping on a bandwagon.', 4),
(1, 'I actually like this game i buyed it like 2 weeks ago', 3),
(9, 'isrral who r u talking to?', 3),
(9, 'It was a good game, too bad the circle jerk was so strong lmao', 7),
(3, 'Why is there so many dislikes?', 6),
(3, 'This game is beautiful I don’t know why people hate it', 2),
(5, 'The numbers Mason, what do they mean? - I don’t know anything about any number!', 7),
(5, 'Who is the song??', 4),
(3, '@magic22 you know 0/1 kdr is worse?', 3),
(3, 'Who came here after battlefield 5?', 4),
(2, '@yasser elbouz idk its just fun to see like/dislike ratio', 8),
(5, 'RedKap same happens with BF5.', 8),
(3, 'Ahhhh,I get it. I tot people are angry about the trailer.', 7),
(2, 'Wow who knew this new star wars battlefront game was out ... oh wait', 2),
(2, 'cool but will never match the emotions of mw', 8),
(2, 'Who’s here in 28482?', 4),
(1, 'I love this game', 9),
(3, 'Wow so much dislikes....', 2),
(6, 'Same here', 4),
(4, 'wolfman234 yet when we got cod ww2 everyone hated on it...', 6),
(7, '3.6 million dislikes', 9),
(2, '"Bigest suprise attack in the history of the world, how did they not see this coming?" Bruh', 9),
(6, 'Omg 3m dislike Lol', 1),
(1, 'Can we get 4mil dislikes?', 5),
(6, 'August 2018?', 8),
(6, 'Battlefield 5 reveal trailer trying to break this record', 4),
(5, 'We need more dislikes', 6),
(4, 'Infinity War > Infinite Warfare', 7),
(3, 'Street Pkchas what?', 4),
(2, 'i was one of the early likers lol i honestly didnt understand the hate for this game', 4),
(1, 'Who came here to check dislikes', 2),
(1, 'Im not a CoD fan so tell me why is this so hated lol', 4),
(9, 'its as more likes becuz bo4 is a great game with a zombie campain great multiplayer and battle royale', 8),
(8, 'October but yes', 3),
(7, 'August 6th 6:49pm', 3),
(6, 'No matter what i still love cod iw and is one of my favourite games.', 6),
(5, 'max kerry treyarch would never make such a monster', 8),
(4, 'BEST HALO GAME :dd', 4),
(3, 'Still better than ww2', 2),
(2, 'Made by EA.', 6),
(1, 'Look at that like-dislike ratio', 6);

-- Random companies

INSERT INTO company(name) VALUES
("Legit A/S"),
("We Fix"),
("GråGubben"),
("MongoSQL"),
("Guugel"),
("Drogas");

-- Random public workers

INSERT INTO public_worker VALUES
(1, "Vik"),
(4, "Oslo"),
(7, "Trondheim"),
(6, "Nittedal"),
(3, "Kristiansund");

-- Random connections

INSERT INTO person_CROSS_commune VALUES
(2, "Fredrikstad"),
(10, "Hvaler"),
(5, "Steinkjer"),
(8, "Time"),
(9, "Sørum");

-- Random happening categories.

INSERT INTO happening_category VALUES
("Konsert"),
("Karneval"),
("Tivoli"),
("Brannøvelse"),
("Sirenetesting");

-- Random admins

INSERT INTO admin VALUES
(17),
(872),
(276),
(1024),
(1298);

-- Random happenings

INSERT INTO happening(submitter_id, commune_name, category, title, description, picture, happening_time) VALUES
(7, 'Aukra', 'Tivoli', 'Smoke Tree Road, Grand Senora Desert- All characters.', 'A lone Surfer sits idling on a desolate dirt road near the airfield. As the player approaches the car, a man will appear behind the player and stun him. The screen will turn black, and the player will wake up wearing only underwear over a railway line with a train approaching him quickly. Alternatively, if the player as Trevor quickly activates his special ability, the player can shoot the man, to which he will defensively claim he was "Just playing."', 'https://imgur.com/a/mayoSTu', NOW()),
(4, 'Hurum', 'Tivoli', 'RON Alternates Wind Farm - All characters.', 'The player will find a Journey parked on a dirt road in the wind farm, with a couple of male rednecks having sexual intercourse inside. If disturbed, theyll turn hostile, leave the vehicle and try to shoot the player.', 'https://imgur.com/a/mayoSTu', NOW()),
(3, 'Fedje', 'Karneval', 'Grapeseed, beside the ONeils farm - All characters.', 'The player will find a cop chasing a criminal and will have the choice of either: shooting the leg of the criminal and help the cop in capturing him, or killing the cop and helping the criminal escape.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Fusa', 'Sirenetesting', 'Senora Freeway, RON Alternates Wind Farm, near Rexs Diner - All characters.', 'The player will find a park ranger chasing a criminal and will have the choice of either: shooting the leg of the criminal and helping the cop capture him, or killing the cop and helping the criminal escape.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Trysil', 'Konsert', 'At different ATMs around San Andreas - All characters.', 'A random thief will steal a pedestrians wallet, while this pedestrian is withdrawing money from an ATM. The player needs to chase down the thief and then chose to return the wallet to the victim, or keep it.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Elverum', 'Tivoli', 'Little Bighorn Avenue, Rancho - All characters.', 'A random thief will steal the bike of a man, the player will need to chase the thief down and return the bicycle to the owner.', 'https://imgur.com/a/mayoSTu', NOW()),
(7, 'Nordre Land', 'Tivoli', 'Bridge Street, Hawick - All characters.', 'A random thief will steal the bike of a pedestrian. The player will need to chase the thief down and return the bicycle to the owner.', 'https://imgur.com/a/mayoSTu', NOW()),
(7, 'Etnedal', 'Tivoli', 'Mount Haan Road, Grand Senora Desert - All characters.', 'A group of Rednecks will appear driving motorcycles and ambush the player, mistaking him for a foreigner. The player will need to kill all of them to complete the random event. They will yell: "Hey you, Speaky English, Passaporto asshole!"', 'https://imgur.com/a/mayoSTu', NOW()),
(4, 'Namsos', 'Karneval', 'Tataviam Mountains - All characters.', 'A group of Rednecks will appear driving motorcycles and ambush the player, mistaking him for a foreigner. The player will need to kill all of them to complete the random event. They will yell: "Hey you, Speaky English, Passaporto asshole!"', 'https://imgur.com/a/mayoSTu', NOW()),
(4, 'Vågå', 'Brannøvelse', 'Raton Canyon - All characters.', 'A group of Rednecks will appear driving motorcycles and ambush the player, mistaking him for a foreigner. The player will need to kill all of them to complete the random event. They will yell: "Hey you, Speaky English, Passaporto asshole!"', 'https://imgur.com/a/mayoSTu', NOW()),
(7, 'Eid', 'Sirenetesting', 'North Point, Paleto Bay, Blaine County - All characters.', 'Two guys are trying to bury a woman alive. The player will need to kill the two men and then give the woman a lift to her destination.', 'https://imgur.com/a/mayoSTu', NOW()),
(6, 'Tjeldsund', 'Tivoli', 'Alta Street, Downtown Vinewood - All characters.', 'Its simply a tour around the city, just wait until the tour is finished to complete the random event.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Kongsvinger', 'Tivoli', 'Great Ocean Highway, North Chumash, near the Hookies bar - All characters.', 'A woman will have her car stolen from her. The player will need to chase down the criminal and return the car to the woman.', 'https://imgur.com/a/mayoSTu', NOW()),
(3, 'Sirdal', 'Karneval', 'Exceptionalists Way, Los Santos International Airport - All characters.', 'A woman will have her car stolen from her. The player will need to chase down the criminal and return the car to the woman.', 'https://imgur.com/a/mayoSTu', NOW()),
(6, 'Åmot', 'Brannøvelse', 'Hawick Avenue, Hawick - All characters.', 'This group of Lost members will steal the takings of a store next to SubUrban and make their escape in a van. The player will need to kill them and choose to return the takings to the shopkeeper, or keep it for themselves.', 'https://imgur.com/a/mayoSTu', NOW()),
(6, 'Tysfjord', 'Tivoli', 'San Andreas Avenue, Textile City - All characters.', 'This group of Lost members will steal the wallet of a pedestrian and escape on motorcycles. The player will need to kill them and choose to return the wallet to the pedestrian, or keep it.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Åfjord', 'Brannøvelse', 'Grapeseed Main Street, Grapeseed - All characters.', 'This group of Lost members will steal the wallet of a pedestrian and escape in a van. The player will need to kill them, and choose to return the wallet to the pedestrian, or keep it.', 'https://imgur.com/a/mayoSTu', NOW()),
(1, 'Skjåk', 'Tivoli', 'Route 68, Grand Senora Desert, near the Checkout! store - All characters.', 'This group of Lost members will steal the wallet of a pedestrian and escape in a van. The player will need to kill them and choose to return the wallet to the pedestrian, or keep it.', 'https://imgur.com/a/mayoSTu', NOW());