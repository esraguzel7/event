-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 08, 2024 at 01:28 PM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event360`
--

--
-- Dumping data for table `event_categories`
--

INSERT INTO `event_categories` (`id`, `name`, `url`, `updated_at`, `created_at`) VALUES
(1, 'Party', 'party', NULL, '2024-08-04 10:51:46'),
(2, 'Concert', 'concert', NULL, '2024-08-04 10:51:54'),
(3, 'Conference', 'conference', NULL, '2024-08-04 10:52:03'),
(4, 'Workshop', 'workshop', NULL, '2024-08-04 10:52:11'),
(5, 'Webinar', 'webinar', NULL, '2024-08-04 10:52:20'),
(6, 'Meetup', 'meetup', NULL, '2024-08-04 10:52:28'),
(7, 'Festival', 'festival', NULL, '2024-08-04 10:52:36'),
(8, 'Exhibition', 'exhibition', NULL, '2024-08-04 10:52:45'),
(9, 'Networking', 'networking', NULL, '2024-08-04 10:52:52'),
(10, 'Seminar', 'seminar', NULL, '2024-08-04 10:52:59'),
(11, 'Sports Event', 'sports-event', NULL, '2024-08-04 10:53:09'),
(12, 'Charity Event', 'charity-event', NULL, '2024-08-04 10:53:19');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
