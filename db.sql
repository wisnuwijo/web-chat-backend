-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 31, 2021 at 05:13 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `chat_rooms_id` int(20) NOT NULL,
  `sender_user_id` int(20) NOT NULL,
  `read` int(1) NOT NULL DEFAULT 0,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `chat_rooms_id`, `sender_user_id`, `read`, `message`, `created_at`) VALUES
(1, 1, 19, 1, 'ooy oy', '2021-06-08 15:25:06'),
(2, 1, 20, 0, 'pie bro?', '2021-06-08 15:29:49'),
(3, 2, 19, 1, 'cuy cuy', '2021-06-08 15:41:32'),
(4, 2, 20, 0, 'yoi', '2021-06-08 15:41:32'),
(5, 1, 19, 0, 'hoy this is message', '2021-06-10 15:02:49'),
(6, 9, 25, 0, '3', '2021-07-20 02:34:47'),
(7, 9, 25, 0, '4', '2021-07-20 02:35:08'),
(8, 9, 25, 0, '5', '2021-07-20 02:35:47'),
(9, 9, 25, 0, '6', '2021-07-20 02:36:22'),
(10, 9, 25, 0, '7', '2021-07-20 02:36:57'),
(11, 9, 31, 0, 'hai', '2021-07-20 02:38:42'),
(12, 9, 25, 0, 'bro', '2021-07-20 02:39:18'),
(13, 9, 25, 0, 'bro', '2021-07-20 02:40:31'),
(14, 9, 31, 0, 'pie', '2021-07-20 02:40:43'),
(15, 9, 25, 0, 'chat ku metu ga?', '2021-07-20 02:41:13'),
(16, 9, 31, 0, 'metu bro', '2021-07-20 02:41:22'),
(17, 9, 25, 0, 'test', '2021-07-20 02:44:07'),
(18, 9, 25, 0, '1', '2021-07-20 02:49:32'),
(19, 9, 25, 0, 'jo', '2021-07-20 02:51:27'),
(20, 9, 31, 0, 'opo jo?', '2021-07-20 02:51:33'),
(21, 9, 25, 0, 'kue mau solat nng omah tah nng masjid?', '2021-07-20 02:51:49'),
(22, 9, 31, 0, 'kepo cuk', '2021-07-20 02:51:56'),
(23, 9, 31, 0, 'lapo takon', '2021-07-20 02:52:00'),
(24, 9, 25, 0, 'anjay', '2021-07-20 02:52:05'),
(25, 9, 25, 0, 'diomongi apek2 malah sengak', '2021-07-20 02:52:14'),
(26, 9, 31, 0, 'hoi', '2021-07-20 02:55:37'),
(27, 9, 25, 0, 'pie', '2021-07-20 02:55:41'),
(28, 9, 31, 0, 'rapiepie', '2021-07-20 02:55:46'),
(29, 9, 25, 0, 'Bismillah', '2021-07-20 02:56:58'),
(30, 9, 31, 0, 'Alhamdulillah', '2021-07-20 02:57:05'),
(31, 9, 25, 0, 'iso broooo', '2021-07-20 02:57:10'),
(32, 9, 31, 0, 'hore', '2021-07-20 02:57:13'),
(33, 9, 31, 0, 'bisaa', '2021-07-20 03:20:26'),
(34, 9, 25, 0, 'okok', '2021-07-20 03:20:30'),
(35, 9, 25, 0, 'sip', '2021-07-20 03:32:50'),
(36, 9, 31, 0, 'test', '2021-07-20 03:45:31'),
(37, 9, 25, 0, 'masuk pak', '2021-07-20 03:45:39'),
(38, 9, 25, 0, 'ok', '2021-07-20 03:46:14'),
(39, 9, 25, 0, 'update last chat test', '2021-07-20 04:09:04'),
(40, 9, 25, 0, 'update last chat test 2', '2021-07-20 04:09:22'),
(41, 9, 25, 0, 'CURRENT_TIMESTAMP', '2021-07-20 04:10:27'),
(42, 8, 25, 0, 'hola', '2021-07-20 07:24:13'),
(43, 8, 25, 0, 'apa kabs', '2021-07-20 07:24:23'),
(44, 9, 25, 0, 'halo', '2021-07-20 07:24:36'),
(45, 10, 25, 0, 'jack', '2021-07-20 07:29:42'),
(46, 9, 25, 0, 'oy', '2021-07-20 07:30:01'),
(47, 10, 25, 0, 'g', '2021-07-20 07:40:48'),
(48, 9, 25, 0, 'test', '2021-07-20 07:47:08'),
(49, 10, 25, 0, 'h', '2021-07-20 07:49:19'),
(50, 9, 25, 0, 'k', '2021-07-20 08:53:01'),
(51, 10, 25, 0, 'oy', '2021-07-27 23:15:17'),
(52, 8, 30, 0, 'hai', '2021-08-17 00:46:22'),
(53, 8, 25, 0, 'pie bro', '2021-08-17 00:46:32'),
(54, 8, 30, 0, 'pie kabare?', '2021-08-17 00:47:07'),
(55, 8, 30, 0, 'wis suwi gak tau ketemu', '2021-08-17 00:47:14'),
(56, 8, 25, 0, 'alhamdulillah', '2021-08-17 00:47:21'),
(57, 8, 25, 0, 'sae', '2021-08-17 00:47:23'),
(58, 8, 25, 0, 'awakmu pie kabare?', '2021-08-17 00:47:34'),
(59, 8, 25, 0, 'kerja nng ndi saiki', '2021-08-17 00:47:39'),
(60, 8, 25, 0, 'hehe', '2021-08-17 00:47:40'),
(61, 8, 30, 0, 'super! aku kerjo nng singgapor', '2021-08-17 00:47:54'),
(62, 8, 25, 0, 'etdah', '2021-08-17 00:47:57'),
(63, 8, 25, 0, 'kerjo opo nng kono?', '2021-08-17 00:48:04'),
(64, 8, 30, 0, 'pro', '2021-08-17 00:48:08'),
(65, 8, 30, 0, 'gammer', '2021-08-17 00:48:13'),
(66, 8, 25, 0, 'weh', '2021-08-17 00:48:16'),
(67, 8, 25, 0, 'sangar', '2021-08-17 00:48:18'),
(68, 8, 30, 0, 'wkwk', '2021-08-17 00:48:20'),
(69, 8, 30, 0, 'oralah, programmer sing bener', '2021-08-17 00:48:29'),
(70, 8, 30, 0, 'aku due startup nng kene', '2021-08-17 00:48:36');

-- --------------------------------------------------------

--
-- Table structure for table `chat_participants`
--

CREATE TABLE `chat_participants` (
  `id` int(20) NOT NULL,
  `chat_rooms_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_participants`
--

INSERT INTO `chat_participants` (`id`, `chat_rooms_id`, `user_id`, `created_at`) VALUES
(1, 1, 19, '2021-06-08 15:05:59'),
(2, 1, 20, '2021-06-08 15:05:59'),
(9, 8, 25, '2021-07-18 23:36:02'),
(10, 8, 30, '2021-07-18 23:36:02'),
(11, 9, 25, '2021-07-19 12:52:44'),
(12, 9, 31, '2021-07-19 12:52:44'),
(13, 10, 25, '2021-07-20 07:29:34'),
(14, 10, 27, '2021-07-20 07:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` int(11) NOT NULL,
  `last_chat` text DEFAULT NULL,
  `last_chat_timestamp` timestamp NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `last_chat`, `last_chat_timestamp`, `created_at`) VALUES
(1, 'pie bro', '2021-06-08 15:30:09', '2021-06-08 15:05:33'),
(2, 'yoi', '2021-06-08 15:41:57', '2021-06-08 15:40:33'),
(7, NULL, '2021-07-18 23:01:14', '2021-07-18 23:01:14'),
(8, 'aku due startup nng kene', '2021-08-17 00:48:36', '2021-07-18 23:36:02'),
(9, 'k', '2021-07-20 08:53:01', '2021-07-19 12:52:44'),
(10, 'oy', '2021-07-27 23:15:17', '2021-07-20 07:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(100) NOT NULL,
  `user_id_contact` int(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `user_id_contact`, `created_at`) VALUES
(1, 25, 26, '2021-06-10 23:22:22'),
(12, 25, 30, '2021-07-18 23:36:02'),
(13, 25, 31, '2021-07-19 12:52:44'),
(14, 31, 25, '2021-07-20 02:38:32'),
(15, 25, 27, '2021-07-20 07:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pin` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `pin`, `password`, `name`, `email`, `token`) VALUES
(1, 'user1', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'name1', 'user1@mail.com', NULL),
(2, 'paijo', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'paijo', 'paijo@mail.com', NULL),
(3, 'BismillahBisa', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'justin', 'paijookok@mail.com', NULL),
(4, 'user2', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user2', 'user2@mail.com', NULL),
(5, 'user3', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user3', 'user3@mail.com', NULL),
(6, 'user4', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user4', 'user4@mail.com', NULL),
(8, 'user5', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user5', 'user5@mail.com', NULL),
(9, 'user6', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user6', 'user6@mail.com', NULL),
(13, 'user7', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user7', 'user7@mail.com', NULL),
(14, 'user8', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user8', 'user8@mail.com', NULL),
(15, 'user9', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user9', 'user9@mail.com', NULL),
(16, 'user10', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user10', 'user10@mail.com', NULL),
(17, 'user11', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user11', 'user11@mail.com', NULL),
(18, 'user12', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user12', 'user12@mail.com', NULL),
(19, 'user13', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user13', 'user13@mail.com', NULL),
(20, 'user14', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user14', 'user14@mail.com', NULL),
(21, 'user15', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user15', 'user15@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjMxNjI0MDgsImRhdGEiOiJ1c2VyMTUiLCJpYXQiOjE2MjMxNjI0MDN9.4o-Q1TNaIG2JmlFvbNuv_mB0h4_TsSygSr6Ig_OnLCA'),
(22, 'user16', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user16', 'user16@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM5NDAxMzQsImRhdGEiOiJ1c2VyMTYiLCJpYXQiOjE2MjMzMzUzMzR9.H5Y-8fz-4rfsjHus_4YBnwhbOXzKnM3rnpkRMELg41o'),
(23, 'user17', '', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user99', 'user99@mail.com', NULL),
(24, 'user18', '0sPB4', '$2y$10$mICF6lgYDnRkiSeavwrQCOsLR6pja8QsLa9hg0RE9ARzHcwByBqz6', 'user101', 'user101@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM5NDMwMjIsImRhdGEiOiJ1c2VyMTAxIiwiaWF0IjoxNjIzMzM4MjIyfQ.X8mTD1DuAm7UB_5uj0cYOcHQaf0Mf2AEAQ6oNwbBQTQ'),
(25, 'user19', 'Bkv2o', '$2b$10$X5mgxfL4Td1RxPYtpsCZuOcX.j4tAtxGoetH1yVOI0T27KgAz.k6K', 'user19', 'user19@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk3NjU5NTMsImRhdGEiOiJ1c2VyMTkiLCJpYXQiOjE2MjkxNjExNTN9.HKsu3wZDl-o5_HGHQu9hOqpqFeX9jG_EOssD5vocmyg'),
(26, 'user20', 'fENws', '$2b$10$E/UOZZzeFb98jcJAFOjk7.muNUSfW3URDWfLWAC5rF3rV6kEff/IG', 'user20', 'user20@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjcxOTY0MzcsImRhdGEiOiJ1c2VyMjAiLCJpYXQiOjE2MjY1OTE2Mzd9.r9ZD3KHpXZfSrMhsfX4Mbput_SXGYxyKxnmV6Jdgb1c'),
(27, 'Jack', 'cco85', '$2b$10$Kz40p68cdeAKsiqwf/SvWOLSYSN2.CxsqApYPPI0Zj44ZzJVzcDWu', 'Jack', 'Jack@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjU0MjM2ODYsImRhdGEiOiJKYWNrIiwiaWF0IjoxNjI0ODE4ODg2fQ.wNmTFF3abPofLfEz58sCB62JjY8_bJD9usaOfFgVgyQ'),
(28, 'user21', '0s5kU', '$2b$10$8VK95D65SZ6h2GBvA/ExA.JZu1hnF3SVJQCoHYIr19xKHbROLT5dO', 'user20', 'user21@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjU0MjM5NjEsImRhdGEiOiJ1c2VyMjEiLCJpYXQiOjE2MjQ4MTkxNjF9.009cYvCqEiEt0mVUV4FHRoUY0VTn8ZfZHUofh86xPmg'),
(29, 'user22', 'pJUXP', '$2b$10$eoZ9ZxsDpSx7nQ65zc0EZOgM64OeDTAMc64mxvNTr2FvMCaIkVN3q', 'user22', 'user22@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjU3MDE1MjgsImRhdGEiOiJ1c2VyMjIiLCJpYXQiOjE2MjUwOTY3Mjh9.nrURpObRGKcBm2w6fVgd7JEeQOcej0mxjItlDiRaJjY'),
(30, 'user23', 'x2Wgv', '$2b$10$ShDZYO09qJToZwZrKyLfiup0MKrWPiPIW7akRau6EpeG5cgY87dUG', 'user23', 'user23@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk3NjU5NzcsImRhdGEiOiJ1c2VyMjMiLCJpYXQiOjE2MjkxNjExNzd9.fNutLbD15u6p6udP70Xkv5J2_s4LlB8smadvJsF_vWw'),
(31, 'raymondwoo', 'B7qpg', '$2b$10$4GSqiw85ebdVMwvPraypbueWe/kTVM6nO20zJinEeWqUaIro1kVoC', 'Raymond Woo', 'raymondwoo@mail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjczNTM0ODMsImRhdGEiOiJyYXltb25kd29vIiwiaWF0IjoxNjI2NzQ4NjgzfQ.s4GHczoV0CziqEWFGArvEmkFEyQ-YltTRT0omkpWKoM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_participants`
--
ALTER TABLE `chat_participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `chat_participants`
--
ALTER TABLE `chat_participants`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
