-- Создание таблиц для проекта Film!

DROP TABLE IF EXISTS "schedule" CASCADE;
DROP TABLE IF EXISTS "film" CASCADE;

CREATE TABLE "film" (
    "id"          UUID PRIMARY KEY,
    "rating"      DOUBLE PRECISION NOT NULL DEFAULT 0,
    "director"    VARCHAR(255) NOT NULL,
    "tags"        VARCHAR(255)[] NOT NULL DEFAULT '{}',
    "title"       VARCHAR(255) NOT NULL,
    "about"       TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image"       VARCHAR(255) NOT NULL,
    "cover"       VARCHAR(255) NOT NULL
);

CREATE TABLE "schedule" (
    "id"      UUID PRIMARY KEY,
    "filmId"  UUID NOT NULL REFERENCES "film"("id") ON DELETE CASCADE,
    "daytime" VARCHAR(255) NOT NULL,
    "hall"    INTEGER NOT NULL DEFAULT 0,
    "rows"    INTEGER NOT NULL DEFAULT 0,
    "seats"   INTEGER NOT NULL DEFAULT 0,
    "price"   INTEGER NOT NULL DEFAULT 0,
    "taken"   VARCHAR(255)[] NOT NULL DEFAULT '{}'
);

CREATE INDEX "IDX_schedule_filmId" ON "schedule" ("filmId");
