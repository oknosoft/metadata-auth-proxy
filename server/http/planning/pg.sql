--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--

CREATE TABLE public.settings
(
    param character varying(100) NOT NULL,
    value text,
    CONSTRAINT settings_pkey PRIMARY KEY (param)
)
WITH (OIDS = FALSE);

ALTER TABLE public.settings OWNER to postgres;

--

drop table if exists public.work_centers_balance;

--

CREATE TABLE public.work_centers_balance
(
    work_center uuid NOT NULL,
    balance json,
    CONSTRAINT work_centers_balance_pkey PRIMARY KEY (work_center)
)
WITH (OIDS = FALSE)

ALTER TABLE public.work_centers_balance OWNER to postgres;
