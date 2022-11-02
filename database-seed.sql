-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4-beta
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- ddl-end --


-- object: public.person | type: TABLE --
-- DROP TABLE IF EXISTS public.person CASCADE;
CREATE TABLE IF NOT EXISTS public.person (
	person_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	full_name varchar(50) NOT NULL,
	CONSTRAINT person_pk PRIMARY KEY (person_id)

);
-- ddl-end --
ALTER TABLE public.person OWNER TO root;
-- ddl-end --

-- object: public.per_contact | type: TABLE --
-- DROP TABLE IF EXISTS public.per_contact CASCADE;
CREATE TABLE IF NOT EXISTS public.per_contact (
	contact_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	person_id bigint NOT NULL,
	phone varchar(25),
	website varchar(200),
	CONSTRAINT per_contact_pk PRIMARY KEY (contact_id)

);
-- ddl-end --
ALTER TABLE public.per_contact OWNER TO root;
-- ddl-end --

-- object: public.location | type: TABLE --
-- DROP TABLE IF EXISTS public.location CASCADE;
CREATE TABLE IF NOT EXISTS public.location (
	location_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	street varchar(200),
	suite varchar(100),
	city varchar(50),
	zip_code varchar(25),
	geo_lat varchar(25),
	geo_lng varchar(25),
	CONSTRAINT location_pk PRIMARY KEY (location_id)

);
-- ddl-end --
ALTER TABLE public.location OWNER TO root;
-- ddl-end --

-- object: public.per_email | type: TABLE --
-- DROP TABLE IF EXISTS public.per_email CASCADE;
CREATE TABLE IF NOT EXISTS public.per_email (
	email_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	person_id bigint NOT NULL,
	email_address varchar(100) NOT NULL,
	CONSTRAINT per_email_pk PRIMARY KEY (email_id)

);
-- ddl-end --
ALTER TABLE public.per_email OWNER TO root;
-- ddl-end --

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE IF NOT EXISTS public."user" (
	user_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	person_id bigint,
	username varchar(25) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (user_id),
	CONSTRAINT username_unique UNIQUE (username)

);
-- ddl-end --
ALTER TABLE public."user" OWNER TO root;
-- ddl-end --

-- object: public.company | type: TABLE --
-- DROP TABLE IF EXISTS public.company CASCADE;
CREATE TABLE IF NOT EXISTS public.company (
	company_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	catch_phase varchar(200),
	bs varchar(100),
	CONSTRAINT company_pk PRIMARY KEY (company_id),
	CONSTRAINT com_name_unique UNIQUE (name)

);
-- ddl-end --
ALTER TABLE public.company OWNER TO root;
-- ddl-end --

-- object: public.per_address | type: TABLE --
-- DROP TABLE IF EXISTS public.per_address CASCADE;
CREATE TABLE IF NOT EXISTS public.per_address (
	address_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	person_id bigint NOT NULL,
	location_id bigint NOT NULL,
	CONSTRAINT per_address_pk PRIMARY KEY (address_id)

);
-- ddl-end --
ALTER TABLE public.per_address OWNER TO root;
-- ddl-end --

-- object: public.per_employment | type: TABLE --
-- DROP TABLE IF EXISTS public.per_employment CASCADE;
CREATE TABLE IF NOT EXISTS public.per_employment (
	employment_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	person_id bigint NOT NULL,
	company_id bigint NOT NULL,
	CONSTRAINT per_employment_pk PRIMARY KEY (employment_id)

);
-- ddl-end --
ALTER TABLE public.per_employment OWNER TO root;
-- ddl-end --

-- object: contact_per_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_contact DROP CONSTRAINT IF EXISTS contact_per_id_fk CASCADE;
ALTER TABLE public.per_contact ADD CONSTRAINT contact_per_id_fk FOREIGN KEY (person_id)
REFERENCES public.person (person_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_per_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_email DROP CONSTRAINT IF EXISTS user_per_id_fk CASCADE;
ALTER TABLE public.per_email ADD CONSTRAINT user_per_id_fk FOREIGN KEY (person_id)
REFERENCES public.person (person_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_per_id_fk | type: CONSTRAINT --
-- ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS user_per_id_fk CASCADE;
ALTER TABLE public."user" ADD CONSTRAINT user_per_id_fk FOREIGN KEY (person_id)
REFERENCES public.person (person_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: address_per_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_address DROP CONSTRAINT IF EXISTS address_per_id_fk CASCADE;
ALTER TABLE public.per_address ADD CONSTRAINT address_per_id_fk FOREIGN KEY (person_id)
REFERENCES public.person (person_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: address_loc_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_address DROP CONSTRAINT IF EXISTS address_loc_id_fk CASCADE;
ALTER TABLE public.per_address ADD CONSTRAINT address_loc_id_fk FOREIGN KEY (location_id)
REFERENCES public.location (location_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: employment_per_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_employment DROP CONSTRAINT IF EXISTS employment_per_id_fk CASCADE;
ALTER TABLE public.per_employment ADD CONSTRAINT employment_per_id_fk FOREIGN KEY (person_id)
REFERENCES public.person (person_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: employment_com_id_fk | type: CONSTRAINT --
-- ALTER TABLE public.per_employment DROP CONSTRAINT IF EXISTS employment_com_id_fk CASCADE;
ALTER TABLE public.per_employment ADD CONSTRAINT employment_com_id_fk FOREIGN KEY (company_id)
REFERENCES public.company (company_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


