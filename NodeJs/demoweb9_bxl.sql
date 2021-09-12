-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 05 mars 2021 à 14:02
-- Version du serveur :  10.4.16-MariaDB
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `demoweb9_bxl`
--
CREATE DATABASE IF NOT EXISTS `demoweb9_bxl` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `demoweb9_bxl`;

-- --------------------------------------------------------

--
-- Structure de la table `mtm_user_user_capacity`
--

DROP TABLE IF EXISTS `mtm_user_user_capacity`;
CREATE TABLE `mtm_user_user_capacity` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `capacity_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mtm_user_user_capacity`
--

INSERT INTO `mtm_user_user_capacity` (`id`, `user_id`, `capacity_id`) VALUES
(1, 1, 5),
(2, 1, 6),
(3, 1, 8),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(9, 3, 4),
(10, 3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `birth_year` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `birth_year`, `ville`) VALUES
(1, 'Daphne', 1971, 'Bxl'),
(2, 'Alice', 1997, 'Bxl'),
(3, 'Samiha', 1987, 'Bxl');

-- --------------------------------------------------------

--
-- Structure de la table `user_capacity`
--

DROP TABLE IF EXISTS `user_capacity`;
CREATE TABLE `user_capacity` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user_capacity`
--

INSERT INTO `user_capacity` (`id`, `name`) VALUES
(1, 'Html'),
(2, 'CSS'),
(3, 'JS'),
(4, 'Mysql'),
(5, 'Node'),
(6, 'PHP'),
(7, 'Java'),
(8, 'Express');

-- --------------------------------------------------------

--
-- Structure de la table `user_hobby`
--

DROP TABLE IF EXISTS `user_hobby`;
CREATE TABLE `user_hobby` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `frequence` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user_hobby`
--

INSERT INTO `user_hobby` (`id`, `user_id`, `name`, `frequence`) VALUES
(1, 1, 'Chanter', '1x toute les 10 minutes :)'),
(2, 1, 'Balader', '2x fois par semaine'),
(3, 2, 'Cuisiner', '3 fois par jours'),
(4, 2, 'Manger', '10 fois par jours aussi :)');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `mtm_user_user_capacity`
--
ALTER TABLE `mtm_user_user_capacity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_user_id` (`user_id`),
  ADD KEY `FK_capacity_capacity_id` (`capacity_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_capacity`
--
ALTER TABLE `user_capacity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_user_hooby` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mtm_user_user_capacity`
--
ALTER TABLE `mtm_user_user_capacity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT pour la table `user_capacity`
--
ALTER TABLE `user_capacity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152355988;

--
-- AUTO_INCREMENT pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `mtm_user_user_capacity`
--
ALTER TABLE `mtm_user_user_capacity`
  ADD CONSTRAINT `FK_capacity_capacity_id` FOREIGN KEY (`capacity_id`) REFERENCES `user_capacity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  ADD CONSTRAINT `FK_user_user_hooby` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
