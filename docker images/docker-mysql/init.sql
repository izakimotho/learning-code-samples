SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE SCHEMA IF NOT EXISTS lunna_admin
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;


USE lunna_admin;
SET default_storage_engine = InnoDB;

 