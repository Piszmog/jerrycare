-- CreateTable
CREATE TABLE "User"
(
    "id"           SERIAL NOT NULL,
    "email"        TEXT   NOT NULL,
    "name"         TEXT   NOT NULL,
    "auth_user_id" UUID   NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareStep"
(
    "id"          SERIAL  NOT NULL,
    "title"       TEXT    NOT NULL,
    "index"       INTEGER NOT NULL,
    "description" TEXT    NOT NULL,
    "link"        TEXT    NOT NULL,

    CONSTRAINT "CareStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day"
(
    "id"             SERIAL       NOT NULL,
    "date"           TIMESTAMP(3) NOT NULL,
    "completedSteps" INTEGER[],

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateFunction
CREATE
OR REPLACE FUNCTION create_user() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
INSERT INTO public.users(auth_user_id, name, email)
VALUES (NEW.id, NEW.raw_user_meta_data::json ->> 'name', NEW.raw_user_meta_data::json ->> 'email');
RETURN NEW;
END;
$$;
