-- ============================================================
-- MySQL Database Setup for Kasthuri K Portfolio
-- Run this in MySQL before starting Django
-- ============================================================

-- 1. Create database
CREATE DATABASE IF NOT EXISTS kasthuri_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Create a dedicated user (recommended)
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'StrongPass@123';
GRANT ALL PRIVILEGES ON kasthuri_portfolio.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;

-- 3. Use the database
USE kasthuri_portfolio;

-- NOTE: Django migrations will create all tables automatically.
-- The tables below are for reference only.

-- profile
-- CREATE TABLE portfolio_app_profile (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100),
--   role VARCHAR(150),
--   email VARCHAR(254),
--   phone VARCHAR(20),
--   linkedin VARCHAR(200),
--   github VARCHAR(200),
--   about TEXT,
--   created_at DATETIME
-- );

-- ============================================================
-- SEED SCRIPT — run AFTER Django migrations
-- ============================================================
-- INSERT INTO portfolio_app_profile (name, role, email, phone, linkedin, github, about, created_at)
-- VALUES (
--   'Kasthuri K',
--   'Full Stack Developer',
--   'kasthurimsc97@gmail.com',
--   '+91 9999999999',
--   'https://linkedin.com/in/kasthuri-k-44819b201',
--   'https://github.com/KasthuriKandhasami97',
--   'Passionate full stack developer with expertise in Django, Angular, and MySQL.',
--   NOW()
-- );
