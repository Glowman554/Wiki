CREATE TABLE `changelog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`creation_date` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`by` text NOT NULL,
	FOREIGN KEY (`by`) REFERENCES `users`(`username`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`creation_date` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`update_date` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`by` text NOT NULL,
	FOREIGN KEY (`by`) REFERENCES `users`(`username`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `users` ADD `editor` integer NOT NULL;