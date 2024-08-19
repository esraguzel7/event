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

INSERT INTO `event_categories` (`id`, `name`, `url`) VALUES
(1, 'Party', 'party'),
(2, 'Concert', 'concert'),
(3, 'Conference', 'conference'),
(4, 'Workshop', 'workshop'),
(5, 'Webinar', 'webinar'),
(6, 'Meetup', 'meetup'),
(7, 'Festival', 'festival'),
(8, 'Exhibition', 'exhibition'),
(9, 'Networking', 'networking'),
(10, 'Seminar', 'seminar'),
(11, 'Sports Event', 'sports-event'),
(12, 'Charity Event', 'charity-event');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role`, `name`, `surname`, `email`, `password`) VALUES
(1, 'admin', 'system', 'admin', 'admin@event360.com', '123456');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
