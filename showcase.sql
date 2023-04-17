-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 17 Kwi 2023, 19:42
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `feastbits`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `description`, `img_url`, `created_at`, `updated_at`) VALUES
(1, 'Hello world!', 'Welcome to our catering company\'s blog! We specialize in customized catering solutions for all types of events, using only the freshest ingredients to create mouth-watering dishes that cater to everyone\'s taste buds. Our team of professionals is dedicated to providing exceptional customer service, making the catering process as smooth and stress-free as possible. We look forward to working with you to make your next event a success. Thanks for reading!', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/a03029b0-6910-484d-a4b7-9706863c190a', '2023-04-17 15:04:54', '2023-04-17 15:04:54'),
(2, 'Partnership with Smooth Pizza', 'We are excited to announce our partnership with Smooth Pizza, a local pizzeria known for their delicious and fresh-tasting pizzas. With this partnership, we can now offer our customers even more diverse food options for their corporate events, weddings, or private parties. Smooth Pizza also offers delivery and takeout options, making it easy to enjoy their mouth-watering pizzas from the comfort of your home or office. Contact us today to learn more about how we can make your next event a success with our partnership with Smooth Pizza.', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/f5a5b0fb-7f62-4ff6-adad-74fb43521bdf', '2023-04-17 15:06:11', '2023-04-17 15:07:46'),
(3, 'New vegeterian diets', 'We are excited to announce our new vegetarian diet options for catering services! Our team of expert caterers has developed a range of delicious vegetarian dishes that are sure to satisfy any palate. Whether you\'re a vegetarian or just looking to add some variety to your menu, our vegetarian options are the perfect choice for your next event. Our vegetarian dishes are made with only the freshest and highest quality ingredients. From classic vegetarian dishes like stuffed mushrooms and grilled vegetable skewers to innovative and exotic dishes like tofu stir fry and lentil curry, our menu offers something for everyone.', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/cf3b7c6c-360c-418c-bb44-92f2a0312f67', '2023-04-17 15:11:06', '2023-04-17 15:11:06');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_02_22_094856_create_blogs_table', 1),
(6, '2023_02_22_101936_change_description_type', 1),
(7, '2023_02_23_182654_create_offers_table', 1),
(8, '2023_02_23_184002_add_img_url_to_offer', 1),
(9, '2023_02_23_220117_change_price_column_type', 1),
(10, '2023_02_26_143422_add_is_admin_column_to_users', 1),
(11, '2023_02_26_195908_add_default_value_to_is_admin_column', 1),
(12, '2023_03_04_155755_add_surname_column_to_users', 1),
(13, '2023_03_21_074342_cerate_orders_table', 2),
(14, '2023_03_22_085233_add_columns_to_orders_table', 3),
(15, '2023_03_22_090353_add_default_value_to_is_completed_column', 3),
(16, '2023_03_31_075128_change_typo_in_offers_table', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offers`
--

CREATE TABLE `offers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `discount_price` int(11) DEFAULT NULL,
  `type` enum('single','subscription') DEFAULT NULL,
  `is_special` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `offers`
--

INSERT INTO `offers` (`id`, `name`, `description`, `price`, `discount_price`, `type`, `is_special`, `created_at`, `updated_at`, `img_url`) VALUES
(1, 'Smooth Margarita', 'Indulge in our mouth-watering Margarita pizza! Made with the freshest ingredients, our Margarita pizza is the perfect blend of mozzarella cheese, ripe tomatoes, and fragrant basil on a crispy, thin crust. Don\'t miss out on this classic pizza favorite.', 10, 8, 'single', 1, '2023-04-17 15:19:23', '2023-04-17 15:19:23', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/745633b0-8705-4bb9-aa15-3ed9873f3a1d'),
(2, 'Smooth Capricciosa', 'Indulge in our delicious Capricciosa pizza! Topped with tomato sauce, mozzarella cheese, ham, artichokes, mushrooms, and olives, this classic pizza flavor is a crowd-pleaser. Perfect for any occasion, our Capricciosa pizza is made with the freshest ingredients and cooked to perfection. Don\'t miss out on this mouth-watering offer!', 12, 10, 'single', 1, '2023-04-17 15:22:39', '2023-04-17 15:22:39', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/6d056c03-ffa6-47ce-88a1-78b7c5669f20'),
(3, 'Smooth Pineapple', 'Get a taste of the tropics with our mouth-watering pineapple pizza! Made with our signature crust, tangy tomato sauce, and topped with juicy chunks of sweet pineapple and savory ham, this pizza is a delicious fusion of flavors that is sure to delight your taste buds. Order now and savor the tropical goodness of our pineapple pizza.', 12, 10, 'single', 1, '2023-04-17 15:25:03', '2023-04-17 15:25:03', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/0c9d9aa6-8c0b-4d75-a2bc-a030ac0add11'),
(4, 'Chicken Salad', 'Introducing our new chicken salad! Made with tender and juicy chicken, fresh lettuce, and a delicious mix of vegetables, this salad is the perfect choice for a healthy and satisfying meal. Our chicken salad is available for both individual and group orders, and can be customized to fit your specific taste preferences. Order now and enjoy a delicious and nutritious meal on-the-go!', 8, NULL, 'single', 0, '2023-04-17 15:28:17', '2023-04-17 15:28:17', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/472d8b77-d199-4949-99d6-e06b97007167'),
(5, 'Vegeterian Lasagne', 'Try our delicious vegetarian lasagne, made with layers of fresh pasta, rich tomato sauce, and a variety of vegetables including zucchini, eggplant, and spinach. Topped with a generous layer of melted mozzarella cheese, this hearty and flavorful dish is the perfect addition to any event. Contact us today to learn more about our vegetarian lasagne option for catering services.', 10, NULL, 'single', 1, '2023-04-17 15:32:21', '2023-04-17 15:32:21', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/e1838604-fd73-4735-b858-95d397b09b36'),
(6, 'Asian diet 2500 kcal', 'Introducing our new Asian food diet options! Our catering company is now offering a range of delicious and healthy Asian-inspired dishes, made with only the freshest ingredients. From traditional dishes like sushi and stir fry to innovative and exotic flavors, our Asian food diet options are perfect for anyone looking for healthy and flavorful cuisine. Contact us today to learn more about our Asian food diet offerings and how we can help make your next event a success.', 25, 20, 'subscription', 0, '2023-04-17 15:35:36', '2023-04-17 15:35:36', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/d3db2e50-7f77-4584-b57e-90dd11570ebe'),
(7, 'Mediterranean diet 2500 kcal', 'Indulge in the healthy and flavorful taste of the Mediterranean with our catering company\'s new Mediterranean diet offer. Our menu features fresh and colorful ingredients, such as olive oil, tomatoes, feta cheese, and herbs, that are known for their health benefits and delicious taste. From grilled chicken skewers to roasted vegetables and hummus, our Mediterranean-inspired dishes are the perfect choice for a healthy and satisfying meal. Contact us today to learn more about our Mediterranean diet offer for your next event.', 22, NULL, 'subscription', 0, '2023-04-17 15:38:46', '2023-04-17 15:38:46', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/ee3e5dce-ce11-479c-bea8-d6f57af794e7'),
(8, 'Vegeterian diet 2000 kcal', 'Introducing our new vegetarian catering options! Our menu features a range of delicious and healthy vegetarian dishes made with the freshest ingredients. From classic favorites to exotic flavors, our customizable vegetarian options are the perfect choice for any event. Contact us today to learn more about our vegetarian catering services.', 18, NULL, 'subscription', 1, '2023-04-17 15:41:25', '2023-04-17 15:41:25', 'https://ocgustbgdtpfjxdyxeno.supabase.co/storage/v1/object/public/feastbits-storage/e0dd002f-1dfb-45d9-a71a-c50e13153d7e');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `house_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'myapptoken', 'fa9008de35866b6f9c900c99368efba89752a2591f29fdebcb9d645547e69731', '[\"*\"]', '2023-04-17 15:41:25', NULL, '2023-04-17 14:57:39', '2023-04-17 15:41:25');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `is_admin`) VALUES
(1, 'James', 'Hoffman', 'admin@feastbits.dev', NULL, '$2y$10$kATBd5G6Ut7o.3SPrKMsveUjsRORu0ANP2V0g0c4Czm.afIimdyn.', NULL, '2023-04-17 14:57:39', '2023-04-17 14:57:39', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeksy dla tabeli `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indeksy dla tabeli `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `offers`
--
ALTER TABLE `offers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
