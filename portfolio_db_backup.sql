-- Portfolio Database Backup
-- Exported on 2026-09-27T06:48:47.754Z

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `about_section`;
CREATE TABLE `about_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) DEFAULT 'ABOUT ME',
  `subheading` varchar(255) DEFAULT 'DIRECTOR & CINEMATOGRAPHER',
  `bio_p1` text,
  `bio_p2` text,
  `image_url` varchar(500) DEFAULT '/images/about.jpg',
  `stat1_num` varchar(50) DEFAULT '10+',
  `stat1_label` varchar(100) DEFAULT 'Years Experience',
  `stat2_num` varchar(50) DEFAULT '50+',
  `stat2_label` varchar(100) DEFAULT 'Directed Projects',
  `stat3_num` varchar(50) DEFAULT '15+',
  `stat3_label` varchar(100) DEFAULT 'Festival Screenings',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `about_section` (`id`, `heading`, `subheading`, `bio_p1`, `bio_p2`, `image_url`, `stat1_num`, `stat1_label`, `stat2_num`, `stat2_label`, `stat3_num`, `stat3_label`, `updated_at`) VALUES (1, 'ABOUT ME', 'DIRECTOR & CINEMATOGRAPHER', 'I have years of experience creating documentaries, commercials and films for TV & digital platforms. My work focuses on visual storytelling that connects with audiences through emotion and creativity.', '', '/images/about.jpg', '', '', '', '', '', '', '2026-09-27 01:27:43.000');

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `admin_users` (`id`, `name`, `email`, `password`, `created_at`) VALUES (1, 'Admin', 'admin@gmail.com', '$2b$10$KtMrZitZVBTWhhWf6..jHOJqAqwwWukqzOapUlEw6/Wfhl9oY6Rve', '2026-06-21 23:23:13.000');
INSERT INTO `admin_users` (`id`, `name`, `email`, `password`, `created_at`) VALUES (2, 'Prasanna', 'prasannaofficials@gmail.com', '$2b$10$C063ycEqYWV1OpZE5BiKm.Crv0CeqLl/n7x038JWOgG9Uods4zyFC', '2026-09-27 14:00:00.000');

DROP TABLE IF EXISTS `contact_details`;
CREATE TABLE `contact_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) DEFAULT 'CONTACT',
  `subheading` varchar(255) DEFAULT 'DIRECTOR & CINEMATOGRAPHER',
  `location` varchar(255) DEFAULT 'Navi Mumbai, Maharashtra, India (Working Worldwide)',
  `email` varchar(255) DEFAULT 'prasannaoffcials@gmail.com',
  `whatsapp` varchar(50) DEFAULT '+919876543210',
  `whatsapp_message` text,
  `instagram` varchar(255) DEFAULT 'https://instagram.com/your_username',
  `youtube` varchar(255) DEFAULT 'https://youtube.com/@your_channel',
  `linkedin` varchar(255) DEFAULT 'https://linkedin.com/in/your_profile',
  `social_heading` varchar(255) DEFAULT 'SOCIAL MEDIA',
  `social_description` text,
  `instagram_button_text` varchar(255) DEFAULT 'Follow on Instagram →',
  `instagram_button_url` varchar(500) DEFAULT 'https://instagram.com/your_username',
  `image1` varchar(500) DEFAULT '/images/commercial.jpg',
  `image2` varchar(500) DEFAULT '/images/about.jpg',
  `image3` varchar(500) DEFAULT '/images/hero.png',
  `image4` varchar(500) DEFAULT '/images/commercial.jpg',
  `image5` varchar(500) DEFAULT '/images/about.jpg',
  `image6` varchar(500) DEFAULT '/images/hero.png',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `contact_details` (`id`, `heading`, `subheading`, `location`, `email`, `whatsapp`, `whatsapp_message`, `instagram`, `youtube`, `linkedin`, `social_heading`, `social_description`, `instagram_button_text`, `instagram_button_url`, `image1`, `image2`, `image3`, `image4`, `image5`, `image6`, `updated_at`) VALUES (1, 'CONTACT', 'DIRECTOR & CINEMATOGRAPHER', 'Navi Mumbai, Maharashtra, India (Working Worldwide)', 'prasannaoffcials@gmail.com', '+91 8097075054', 'Hey Prasanna, I went through your work. You seem annoyingly talented, so I suppose we should talk about my project.', 'https://instagram.com/your_username', 'https://youtube.com/@your_channel', 'https://linkedin.com/in/your_profile', 'SOCIAL MEDIA', 'Follow my journey. Behind the scenes, Short Films, Commercial Shoots & Photography.', 'Follow on Instagram ?', 'https://instagram.com/your_username', '/images/commercial.jpg', '/images/about.jpg', '/images/hero.png', '/images/commercial.jpg', '/images/about.jpg', '/images/hero.png', '2026-09-27 01:24:19.000');

DROP TABLE IF EXISTS `explore_section`;
CREATE TABLE `explore_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) DEFAULT 'Explore My Work',
  `subheading` varchar(255) DEFAULT 'Portfolio',
  `commercial_title` varchar(255) DEFAULT 'Commercial Projects',
  `commercial_subtitle` varchar(255) DEFAULT 'Brand Campaigns & Directed Films',
  `commercial_image` varchar(500) DEFAULT '/images/commercial.jpg',
  `personal_title` varchar(255) DEFAULT 'Personal Projects',
  `personal_subtitle` varchar(255) DEFAULT 'Documentaries & Narrative Stories',
  `personal_image` varchar(500) DEFAULT '/images/personal.jpg',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `explore_section` (`id`, `heading`, `subheading`, `commercial_title`, `commercial_subtitle`, `commercial_image`, `personal_title`, `personal_subtitle`, `personal_image`, `updated_at`) VALUES (1, 'Explore My Work', 'Portfolio', 'Commercial Projects', 'Brand Campaigns & Directed Films', '/images/commercial.jpg', 'Personal Projects', 'Documentaries & Narrative Stories', '/images/personal.jpg', '2026-09-23 00:43:41.000');

DROP TABLE IF EXISTS `hero_section`;
CREATE TABLE `hero_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subtitle` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `video_url` text,
  `description` text,
  `order_index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hero_section` (`id`, `subtitle`, `title`, `background_image`, `updated_at`, `video_url`, `description`, `order_index`) VALUES (1, 'ROYAL ENFIELD CAMPAIGN', 'Expert Care For Every Ride', '/images/hero.png', '2026-09-27 02:16:03.000', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Serviced with passion, delivered with precision.', 2);
INSERT INTO `hero_section` (`id`, `subtitle`, `title`, `background_image`, `updated_at`, `video_url`, `description`, `order_index`) VALUES (2, 'DIRECTOR & CINEMATOGRAPHER', 'Cinematic Vision In Every Frame', '/images/commercial.jpg', '2026-09-27 02:16:01.000', 'https://www.youtube.com/embed/yiyq7fcqNHk', 'Transforming ambitious ideas into timeless visual stories.', 4);
INSERT INTO `hero_section` (`id`, `subtitle`, `title`, `background_image`, `updated_at`, `video_url`, `description`, `order_index`) VALUES (3, '', '', '/images/personal.jpg', '2026-09-27 02:16:03.000', 'https://www.youtube.com/embed/Ne9aVylBJmA', '', 3);
INSERT INTO `hero_section` (`id`, `subtitle`, `title`, `background_image`, `updated_at`, `video_url`, `description`, `order_index`) VALUES (8, 'Feature Documentry', '', 'http://localhost:5000/uploads/img-1790451639417-524569457.png', '2026-09-27 02:15:54.000', 'https://www.instagram.com/reel/DZNDD_wPdkV/?stkn=bm03YWU5czRxbzlq', '', 1);

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('commercial','personal') NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `youtube_url` text,
  `cover_image` varchar(500) DEFAULT NULL,
  `description` text,
  `role` varchar(255) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (1, 'commercial', 'Nike Campaign', 'Brand Commercial', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 'Premium brand advertisement.', 'Director', '2025', '2026-06-21 23:18:37.000', '2026-09-27 02:05:44.000', 1);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (4, 'commercial', 'Royal Enfield - Continental GT', 'Brand Film', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/images/commercial.jpg', 'Raw power and vintage craft visualised across the coast.', 'Director & Colorist', '2025', '2026-09-23 02:00:35.000', '2026-09-27 02:05:44.000', 2);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (5, 'personal', 'Himalayan Solitude', 'Docu-series', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 'A silent meditation on altitude and winter in Spiti Valley.', 'Cinematographer', '2024', '2026-09-23 02:00:39.000', '2026-09-27 02:03:29.000', 5);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (6, 'commercial', 'Puma - Forever Faster', 'Brand Campaign', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 'High-octane commercial featuring world-class athletes with fast-paced cuts and sound design.', 'Director & Editor', '2025', '2026-09-23 02:06:53.000', '2026-09-27 02:04:53.000', 3);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (7, 'commercial', 'Wilderness Origins', 'Automotive Reel', 'https://www.youtube.com/embed/Ne9aVylBJmA', '/images/commercial.jpg', 'A rugged automotive commercial filmed in remote mountain trails.', 'Cinematographer', '2024', '2026-09-23 02:06:53.000', '2026-09-27 02:04:53.000', 4);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (8, 'personal', 'Echoes of the Valley', 'Short Documentary', 'https://www.youtube.com/embed/Ne9aVylBJmA', '/images/about.jpg', 'An intimate cinematic exploration into the remote nomadic lives of high mountain dwellers.', 'Cinematographer', '2024', '2026-09-23 02:06:53.000', '2026-09-27 02:04:53.000', 6);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (9, 'personal', 'Light & Shadow', 'Creative Film', 'https://www.youtube.com/embed/yiyq7fcqNHk', NULL, 'An artistic exploration of 35mm visual composition and natural ambient light.', 'Director', '2023', '2026-09-23 02:06:53.000', '2026-09-27 02:03:29.000', 9);
INSERT INTO `projects` (`id`, `type`, `title`, `category`, `youtube_url`, `cover_image`, `description`, `role`, `year`, `created_at`, `updated_at`, `order_index`) VALUES (10, 'personal', 'Varanasi - Ghats of Time', 'Culture Story', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 'Atmospheric journey through ancient ghats, spiritual dawn rituals, and eternal river currents.', 'Director & Colorist', '2024', '2026-09-23 02:06:53.000', '2026-09-27 02:03:29.000', 10);

DROP TABLE IF EXISTS `upcoming_events`;
CREATE TABLE `upcoming_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text,
  `link_url` varchar(500) DEFAULT NULL,
  `badge` varchar(100) DEFAULT 'PREMIERE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `upcoming_events` (`id`, `title`, `date`, `location`, `description`, `link_url`, `badge`, `created_at`) VALUES (3, 'Goa International Film Festival', '12 December 2026', 'Goa, India', 'Premiere screening of the latest documentary.', 'https://filmfestival.example.com', 'PREMIERE', '2026-09-23 02:12:22.000');

SET FOREIGN_KEY_CHECKS=1;
