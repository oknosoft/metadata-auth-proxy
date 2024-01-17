--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET escape_string_warning = off;
SET row_security = off;

--
-- Name: ods; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ods AS ENUM (
    'Черновик',
    'Отправлен',
    'Проверяется',
    'Подтвержден',
    'Отклонен',
    'Отозван',
    'Архив',
    'Шаблон'
);


SET default_table_access_method = heap;

--
-- Name: changes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.changes (
    seq bigint NOT NULL,
    abonent uuid,
    branch uuid,
    year smallint,
    partner uuid,
    department uuid,
    id character varying(255),
    rev character varying(64),
    class_name character varying(64),
    ref uuid,
    moment character(25),
    "user" character varying(64),
    ods public.ods,
    presentation character varying(128)
);


--
-- Name: changes_seq_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.changes_seq_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: changes_seq_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.changes_seq_seq OWNED BY public.changes.seq;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.settings (
    param character varying(100) NOT NULL,
    value json NOT NULL
);


--
-- Name: changes seq; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.changes ALTER COLUMN seq SET DEFAULT nextval('public.changes_seq_seq'::regclass);


--
-- Name: id_rev; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX id_rev ON public.changes USING btree (id, rev) WITH (deduplicate_items='true');


--
-- Name: changes changes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.changes
    ADD CONSTRAINT changes_pkey PRIMARY KEY (seq);


--
-- PostgreSQL database dump complete
--

