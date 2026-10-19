-- ============================================================
-- EverWord v1.1 MySQL 8 建表脚本（按需采用）
-- 默认后端为内置 SQLite（server/server.js + node:sqlite，零配置）；
-- 当需要多实例部署 / 独立数据库服务器时，切换到 MySQL 8：
--   1) mysql -u root -p < server/mysql-schema.sql
--   2) npm i mysql2，在 server.js 的数据访问层以 mysql2 连接池
--      替换 DatabaseSync 调用（SQL 已按同样字段准备就绪）
--   3) 首次启动后调用 /api/words 相关种子逻辑或 INSERT ... SELECT 导入词库
-- ============================================================

CREATE DATABASE IF NOT EXISTS everword
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE everword;

-- 账号（scrypt/salting 后的散列存于 pass 字段，格式 salt:hash）
CREATE TABLE IF NOT EXISTS user (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(24)  NOT NULL,
  pass         VARCHAR(255) NOT NULL,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 云同步状态（JSON 载荷：srs / stats / prog / settings；最后写入胜出）
CREATE TABLE IF NOT EXISTS user_state (
  user_id     BIGINT UNSIGNED PRIMARY KEY,
  data        JSON         NOT NULL,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_state_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 词库（160 词种子；headword 唯一）
CREATE TABLE IF NOT EXISTS word (
  id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  headword     VARCHAR(64)  NOT NULL,
  ipa          VARCHAR(96),
  pos          VARCHAR(24),
  definition   VARCHAR(255) NOT NULL,
  example      TEXT,
  example_zh   VARCHAR(512),
  level        ENUM('CET-4','CET-6','TEM-8','IELTS') NOT NULL,
  freq_rank    INT,
  source       VARCHAR(24)  NOT NULL DEFAULT 'builtin',
  UNIQUE KEY uk_headword (headword),
  KEY idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SM-2 卡片状态（V1.2 服务端调度启用；v1.1 由客户端计算后整包存于 user_state）
CREATE TABLE IF NOT EXISTS review_card (
  id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  word_id    INT UNSIGNED    NOT NULL,
  ef         DECIMAL(3,2)    NOT NULL DEFAULT 2.50,
  reps       SMALLINT        NOT NULL DEFAULT 0,
  ivl_days   SMALLINT        NOT NULL DEFAULT 0,
  lapses     SMALLINT        NOT NULL DEFAULT 0,
  due_date   DATE            NOT NULL,
  UNIQUE KEY uk_user_word (user_id, word_id),
  KEY idx_user_due (user_id, due_date),        -- 每日队列：WHERE user_id=? AND due_date<=CURDATE()
  CONSTRAINT fk_card_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  CONSTRAINT fk_card_word FOREIGN KEY (word_id) REFERENCES word(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 测验作答流水（V1.2 服务端统计启用）
CREATE TABLE IF NOT EXISTS quiz_log (
  id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id     BIGINT UNSIGNED NOT NULL,
  question_id INT UNSIGNED    NOT NULL,
  is_correct  TINYINT(1)      NOT NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user_time (user_id, created_at),
  CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 同步审计（保留最近操作，便于排查多端冲突）
CREATE TABLE IF NOT EXISTS sync_log (
  id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  action     VARCHAR(32)     NOT NULL,
  created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user_time (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
