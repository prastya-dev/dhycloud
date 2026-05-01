--
-- PostgreSQL database dump
--

\restrict TRBF6665uijNnfcWIV3aXhk3JsaTPlExxehNLfW1zWPaAevdL16EsvviiD6BuOa

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Board" (
    id text NOT NULL,
    title text NOT NULL,
    "ownerId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isPublic" boolean DEFAULT false NOT NULL,
    "isTemplate" boolean DEFAULT false NOT NULL,
    "shareId" text,
    "templateId" text,
    "templateToken" text
);


ALTER TABLE public."Board" OWNER TO postgres;

--
-- Name: BoardMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BoardMember" (
    id text NOT NULL,
    role text DEFAULT 'member'::text NOT NULL,
    "boardId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."BoardMember" OWNER TO postgres;

--
-- Name: Card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Card" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "position" integer DEFAULT 0 NOT NULL,
    "dueDate" timestamp(3) without time zone,
    "listId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Card" OWNER TO postgres;

--
-- Name: CardLink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CardLink" (
    id text NOT NULL,
    url text NOT NULL,
    label text,
    "cardId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CardLink" OWNER TO postgres;

--
-- Name: List; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."List" (
    id text NOT NULL,
    title text NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    "boardId" text NOT NULL
);


ALTER TABLE public."List" OWNER TO postgres;

--
-- Name: RefreshToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshToken" (
    id text NOT NULL,
    token text NOT NULL,
    "userId" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."RefreshToken" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Board; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Board" (id, title, "ownerId", "createdAt", "updatedAt", "isPublic", "isTemplate", "shareId", "templateId", "templateToken") FROM stdin;
cmogkb7u00004a4wqm3p215k3	Project Trello Clone — Updated	cmogkanev0002a4wqovicsty1	2026-04-27 02:12:40.68	2026-04-27 02:14:41.21	f	f	\N	\N	\N
cmoglaeca000254wqn3lnpor7	Tugas	cmogla1xj000054wqvtuwt1to	2026-04-27 02:40:02.074	2026-04-27 02:40:02.074	f	f	\N	\N	\N
cmogliqtl000954wq2rz597rl	bord	cmogliduv000754wqkw0ztfym	2026-04-27 02:46:31.497	2026-04-27 02:46:31.497	f	f	\N	\N	\N
cmogljeyx000d54wqllrncwyf	kerja	cmogliduv000754wqkw0ztfym	2026-04-27 02:47:02.793	2026-04-27 02:47:02.793	f	f	\N	\N	\N
cmoi2g06p0002w4wq7bheh84r	stock akrilik	cmogliduv000754wqkw0ztfym	2026-04-28 03:28:03.314	2026-04-28 03:28:03.314	f	f	\N	\N	\N
cmokvbmnp001sx0wqpg6od88a	tugasss	cmokv9sbh001qx0wqgwiq6vd9	2026-04-30 02:32:00.373	2026-04-30 02:32:00.373	f	f	\N	\N	\N
cmomal6dw00355owq53mht1m5	kulyeahh	cmom9rv27000swowqxz30nlad	2026-05-01 02:27:06.26	2026-05-01 02:27:06.26	f	t	cmomal6dw00365owqqkei4jyq	edlink-notif	\N
cmomaujhi00465owqowcvg8xa	kuliah materi (milik prassss)	cmom9rv27000swowqxz30nlad	2026-05-01 02:34:23.142	2026-05-01 02:34:23.142	f	t	cmomaujhi00475owq3v4pi2qz	edlink-notif	\N
cmolgzja70069hkwq8rtfkjsb	Kuliah template	cmof4aiqk0000gswqees02eal	2026-04-30 12:38:27.679	2026-04-30 15:40:19.77	f	t	\N	edlink-notif	8b3d2f19be08d8dfd61d393db2e162c0e13ba10991f34dc0f504e204e4409725c5e79f455252ef6a9cb1d1c845763b839bde843879d2eacd6474aa1d2552fc1bf
cmomayakp00565owqjpowikll	kuliah milik divaaa	cmom9rv27000swowqxz30nlad	2026-05-01 02:37:18.217	2026-05-01 02:37:18.217	f	t	cmomayakp00575owq1rzo5r3y	edlink-notif	\N
cmomc13mc0003m0wqqx68xpq4	Prjekk	cmof4aiqk0000gswqees02eal	2026-05-01 03:07:28.788	2026-05-01 03:07:32.847	f	t	cmomc13mc0004m0wqdx57g88o	edlink-notif	8b3d2f19be08d8dfd61d393db2e162c0e13ba10991f34dc0f504e204e4409725c5e79f455252ef6a9cb1d1c845763b839bde843879d2eacd6474aa1d2552fc1bf
\.


--
-- Data for Name: BoardMember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BoardMember" (id, role, "boardId", "userId") FROM stdin;
\.


--
-- Data for Name: Card; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Card" (id, title, description, "position", "dueDate", "listId", "createdAt", "updatedAt") FROM stdin;
cmogkjhkk0000v4wqrvav8x4z	Buat halaman landing	\N	0	\N	cmogkb7u30005a4wq4u4q1s9l	2026-04-27 02:19:06.548	2026-04-27 02:19:06.548
cmoglamxm000654wqutl5t7sw	Pendidikan pancasila	\N	0	2026-04-30 02:40:00	cmoglaecb000554wqx75hi8rz	2026-04-27 02:40:13.21	2026-04-27 02:40:33.613
cmogljs15000h54wq6nsx6gid	senin	\N	0	\N	cmogljeyy000f54wqwougxkn1	2026-04-27 02:47:19.721	2026-04-27 02:47:19.721
cmoglk25d000j54wqyp7mko9v	kerja	\N	1	\N	cmogljeyy000e54wq9i4m8epn	2026-04-27 02:47:32.833	2026-04-27 02:47:32.833
cmoglkil6000k54wqrdcpmvls	selasa	\N	1	\N	cmogljeyy000f54wqwougxkn1	2026-04-27 02:47:54.138	2026-04-27 02:47:54.138
cmogllna6000l54wqw1ce0vaf	kerja	\N	0	\N	cmogljeyy000g54wqaol4iio7	2026-04-27 02:48:46.878	2026-04-27 02:48:46.878
cmogljvji000i54wq817kszk1	kerja	kerja jam 9-6	0	2026-04-28 02:52:00	cmogljeyy000e54wq9i4m8epn	2026-04-27 02:47:24.27	2026-04-27 02:52:54.954
cmoi2ggrc0006w4wqjt665v60	5mm trans	\N	0	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:28:24.792	2026-04-28 03:28:24.792
cmoi2gude0007w4wqpc1ge8ms	3mm trans	\N	1	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:28:42.434	2026-04-28 03:28:42.434
cmoi2h2sg0008w4wqv4wloon8	2mm trans	\N	2	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:28:53.344	2026-04-28 03:28:53.344
cmoi2h9530009w4wq0f4ktfo3	2mm hitam	\N	3	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:29:01.576	2026-04-28 03:29:01.576
cmolgzn9q006lhkwqbhkcrqwl	Struktur Data dan Algoritma	[📚 Materi] • Coding Arrays in C++	0	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:32.846	2026-04-30 12:38:32.846
cmolgznbz006mhkwq6vcl6kyt	Struktur Data dan Algoritma	[📚 Materi] • Coding C++ Arrays	1	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:32.927	2026-04-30 12:38:32.927
cmolgzneb006nhkwq0cnr9crh	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures C using Second Edition	2	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.011	2026-04-30 12:38:33.011
cmolgzngk006ohkwqpm2hht5u	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures  Using C++	3	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.092	2026-04-30 12:38:33.092
cmoi2i0er000aw4wqq1kuo2o2	2mm putih	kurang dikit	4	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:29:36.915	2026-04-28 03:29:45.261
cmoi2ifgo000bw4wqm8ogwopo	5 mm putih	\N	5	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 03:29:56.424	2026-04-28 03:29:56.424
cmoi862pw000ew4wq4b1dkzyu	2mm trans	\N	6	\N	cmoi2g06t0003w4wqibpx56h3	2026-04-28 06:08:17.732	2026-04-28 06:08:17.732
cmolgznj0006phkwqr7gp90qq	Struktur Data dan Algoritma	[📚 Materi] • Referensi Struktur Data dan Implementasi Algoritma	4	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.18	2026-04-30 12:38:33.18
cmolgznla006qhkwq331u25x9	Struktur Data dan Algoritma	[📝 Quiz] • Kuis #3	5	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.262	2026-04-30 12:38:33.262
cmokvbru3001zx0wq1v0154dp	Coding Arrays in C++	\N	0	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.083	2026-04-30 02:32:07.083
cmolgznng006rhkwqr7sdltip	Struktur Data dan Algoritma	[📚 Materi] • Materi Pengenalan Array	6	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.34	2026-04-30 12:38:33.34
cmolgznpj006shkwqg22mt4qd	Struktur Data dan Algoritma	[📚 Materi] • Modul Pengenalan Array	7	2026-05-02 12:38:31.991	cmolgzn7h006khkwqbahzpft6	2026-04-30 12:38:33.415	2026-04-30 12:38:33.415
cmolgznxp006whkwqt8jv7xej	Kalkulus	[📝 Quiz] • Quiz 3	0	2026-05-02 12:38:31.991	cmolgznvn006vhkwq4wqpurwk	2026-04-30 12:38:33.709	2026-04-30 12:38:33.709
cmolgzmu5006ehkwqc7g9x21q	Pemrograman Web I	[📚 Materi] • Recording Sinkron Sesi 3 - Paragraf di HTML - 2023/2024 Genap PJJ Informatika UNSIA	0	2026-05-02 12:38:31.991	cmolgzjaa006chkwqm501xlf5	2026-04-30 12:38:32.285	2026-04-30 12:38:57.174
cmolgzmwl006fhkwqdoyfdpm3	Pemrograman Web I	[📚 Materi] • Forum-3 - Penggunaan Paragraf untuk Konten Website	1	2026-05-02 12:38:31.991	cmolgzjaa006chkwqm501xlf5	2026-04-30 12:38:32.373	2026-04-30 12:38:58.423
cmolgzmyw006ghkwq0x0lfbya	Pemrograman Web I	[📝 Quiz] • Quiz Pertemuan ke-3	2	2026-05-02 12:38:31.991	cmolgzjaa006chkwqm501xlf5	2026-04-30 12:38:32.456	2026-04-30 12:38:59.859
cmolgzn5d006jhkwqvsfcgt0w	Statistika dan Probabilitas	[📚 Materi] • Materi #3 Statprob - Ukuran Penyebaran Data	0	2026-05-02 12:38:31.991	cmolgzjaa006bhkwqjvqtygao	2026-04-30 12:38:32.689	2026-04-30 12:39:08.933
cmolgzn1c006hhkwqy3exw5c3	Pemrograman Web I	[📚 Materi] • Membuat Paragraf di HTML	3	2026-05-02 12:38:31.991	cmolgzjaa006chkwqm501xlf5	2026-04-30 12:38:32.544	2026-04-30 12:39:12.016
cmolgzntj006uhkwqic8y4ppe	Sistem Basis Data	[📚 Materi] • Lingkungan Sistem Basis Data	0	2026-05-02 12:38:31.991	cmolgzjaa006chkwqm501xlf5	2026-04-30 12:38:33.559	2026-04-30 12:39:21.591
cmolgznzx006xhkwqbtodweya	Kalkulus	[📚 Materi] • Video Penjelasan Materi 3	1	2026-05-02 12:38:31.991	cmolgzjaa006bhkwqjvqtygao	2026-04-30 12:38:33.789	2026-04-30 12:39:40.475
cmolgzo20006yhkwq64bu1ts6	Kalkulus	[📚 Materi] • Materi Pembelajaran 3	2	2026-05-02 12:38:31.991	cmolgzjaa006bhkwqjvqtygao	2026-04-30 12:38:33.864	2026-04-30 12:39:46.449
cmolpp9st00064owqj7kk5crq	Pemrograman Web I	[📚 Materi] • Recording Sinkron Sesi 3 - Paragraf di HTML - 2023/2024 Genap PJJ Informatika UNSIA #postId:7221200	0	2026-05-02 16:42:24.981	cmolgzmpq006dhkwq6h2hduh6	2026-04-30 16:42:25.373	2026-04-30 16:42:25.373
cmolppa1000074owqhtbs1sdy	Pemrograman Web I	[📚 Materi] • Forum-3 - Penggunaan Paragraf untuk Konten Website #postId:7221199	1	2026-05-02 16:42:24.981	cmolgzmpq006dhkwq6h2hduh6	2026-04-30 16:42:25.668	2026-04-30 16:42:25.668
cmolppbxw00094owqb3e0sm5d	Pemrograman Web I	[📚 Materi] • Membuat Paragraf di HTML #postId:7221197	3	2026-05-02 16:42:24.981	cmolgzmpq006dhkwq6h2hduh6	2026-04-30 16:42:28.148	2026-04-30 16:42:28.148
cmolppczb000b4owqih29egq9	Struktur Data dan Algoritma	[📚 Materi] • Coding Arrays in C++ #postId:7380623	8	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:29.495	2026-04-30 16:42:29.495
cmolppe1g000c4owqtdk0orj5	Struktur Data dan Algoritma	[📚 Materi] • Coding C++ Arrays #postId:7380615	9	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:30.868	2026-04-30 16:42:30.868
cmolppea0000d4owqd926nd9m	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures C using Second Edition #postId:7380147	10	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:31.176	2026-04-30 16:42:31.176
cmokvbrw00020x0wq8jiav8iz	Coding C++ Arrays	\N	1	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.152	2026-04-30 02:32:07.152
cmokvbrxz0021x0wqn839n9mi	Referensi Data Structures C using Second Edition	\N	2	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.224	2026-04-30 02:32:07.224
cmokvbrzx0022x0wqrk2s3jza	Referensi Data Structures  Using C++	\N	3	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.293	2026-04-30 02:32:07.293
cmokvbs1v0023x0wqv49dvn5q	Referensi Struktur Data dan Implementasi Algoritma	\N	4	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.363	2026-04-30 02:32:07.363
cmokvbs3t0024x0wqapt7wi6g	Kuis #3	\N	5	\N	cmokvbrsa001yx0wqema0mp96	2026-04-30 02:32:07.433	2026-04-30 02:32:07.433
cmokvbs7e0026x0wqx8sncmxg	Quiz 3	\N	0	\N	cmokvbs5l0025x0wqmwbs1yzy	2026-04-30 02:32:07.562	2026-04-30 02:32:07.562
cmokvbs990027x0wqcpxqml7g	Video Penjelasan Materi 3	\N	1	\N	cmokvbs5l0025x0wqmwbs1yzy	2026-04-30 02:32:07.629	2026-04-30 02:32:07.629
cmokvbsb80028x0wqrvo2uvv7	Materi Pembelajaran 3	\N	2	\N	cmokvbs5l0025x0wqmwbs1yzy	2026-04-30 02:32:07.7	2026-04-30 02:32:07.7
cmokvbrqe001xx0wqpqt5bee4	Materi #3 Statprob - Ukuran Penyebaran Data	\N	0	\N	cmokvbrmq001wx0wqa6673qf9	2026-04-30 02:32:06.95	2026-04-30 02:32:20.307
cmombakju00615owqkjc3e6rr	tugas sesi 3 pemrograman web	\N	0	\N	cmomayaks00585owqnbl5x0gz	2026-05-01 02:46:51.018	2026-05-01 02:46:51.018
cmomc2phg000vm0wqvzf4mjzk	Statistika dan Probabilitas	[📚 Materi] • Materi #3 Statprob - Ukuran Penyebaran Data #postId:7386509	0	2026-05-03 03:08:44.212	cmomc17m2000am0wqw6fe9oal	2026-05-01 03:08:43.78	2026-05-01 03:08:43.78
cmolppej3000e4owqj4td05xr	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures  Using C++ #postId:7380139	11	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:31.503	2026-04-30 16:42:31.503
cmolpperp000f4owqsxzi8cn2	Struktur Data dan Algoritma	[📚 Materi] • Referensi Struktur Data dan Implementasi Algoritma #postId:7380134	12	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:31.813	2026-04-30 16:42:31.813
cmolppf0k000g4owqsrikn7mz	Struktur Data dan Algoritma	[📝 Quiz] • Kuis #3 #postId:7379703	13	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:32.132	2026-04-30 16:42:32.132
cmolppfa2000h4owq5xad25l8	Struktur Data dan Algoritma	[📚 Materi] • Materi Pengenalan Array #postId:7379702	14	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:32.474	2026-04-30 16:42:32.474
cmolppfik000i4owq0vifw64l	Struktur Data dan Algoritma	[📚 Materi] • Modul Pengenalan Array #postId:7379701	15	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:32.78	2026-04-30 16:42:32.78
cmolppfqs000j4owqc22g1jy2	Struktur Data dan Algoritma	[📚 Materi] • Recording Tipe Data dan Variabel #postId:7348290	16	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:33.076	2026-04-30 16:42:33.076
cmolppg00000k4owqvfpif0fm	Struktur Data dan Algoritma	[📚 Materi] • Video Conference #1 #postId:7345577	17	2026-05-02 16:42:24.981	cmolgzn7h006khkwqbahzpft6	2026-04-30 16:42:33.408	2026-04-30 16:42:33.408
cmolppg9w000l4owqzcvkj7wj	Sistem Basis Data	[📚 Materi] • Lingkungan Sistem Basis Data #postId:7366170	0	2026-05-02 16:42:24.981	cmolgznrf006thkwqxo93lwvo	2026-04-30 16:42:33.764	2026-04-30 16:42:33.764
cmolpptib000m4owqp874zrxj	Kalkulus	[📝 Quiz] • Quiz 3 #postId:7385789	1	2026-05-02 16:42:24.981	cmolgznvn006vhkwq4wqpurwk	2026-04-30 16:42:50.915	2026-04-30 16:42:50.915
cmolpptsq000n4owqys7uxu9l	Kalkulus	[📚 Materi] • Video Penjelasan Materi 3 #postId:7385788	2	2026-05-02 16:42:24.981	cmolgznvn006vhkwq4wqpurwk	2026-04-30 16:42:51.29	2026-04-30 16:42:51.29
cmolppu41000o4owq1ljadbkp	Kalkulus	[📚 Materi] • Materi Pembelajaran 3 #postId:7385787	3	2026-05-02 16:42:24.981	cmolgznvn006vhkwq4wqpurwk	2026-04-30 16:42:51.697	2026-04-30 16:42:51.697
cmolppudc000p4owqkncfa09u	Estetika Humanisme	[📚 Materi] • Materi - Sesi #3 (1) #postId:7374789	0	2026-05-02 16:42:24.981	cmolgzo3z006zhkwqsgygb4ko	2026-04-30 16:42:52.032	2026-04-30 16:42:52.032
cmombzvk80001m0wqljfgc8pw	Statistika dan Probabilitas	[📚 Materi] • Materi #3 Statprob - Ukuran Penyebaran Data #postId:7386509	0	2026-05-03 03:06:32.116	cmolgzn3d006ihkwqy0sxyuuv	2026-05-01 03:06:31.688	2026-05-01 03:06:31.688
cmomc030c0002m0wqfn427bbv	Pemrograman Web I	[📝 Quiz] • Quiz Pertemuan ke-3 #postId:7221198	4	2026-05-03 03:06:41.743	cmolgzmpq006dhkwq6h2hduh6	2026-05-01 03:06:41.34	2026-05-01 03:06:41.34
cmomauupe004c5owqo4i0wsey	Pemrograman Web I	[📚 Materi] • Recording Sinkron Sesi 3 - Paragraf di HTML - 2023/2024 Genap PJJ Informatika UNSIA #postId:7221200	0	2026-05-03 02:34:37.412	cmomauulm004b5owq82ih8g21	2026-05-01 02:34:37.682	2026-05-01 02:34:37.682
cmomauurq004d5owqt0zyp79f	Pemrograman Web I	[📚 Materi] • Forum-3 - Penggunaan Paragraf untuk Konten Website #postId:7221199	1	2026-05-03 02:34:37.412	cmomauulm004b5owq82ih8g21	2026-05-01 02:34:37.766	2026-05-01 02:34:37.766
cmomauutt004e5owq34rtu6et	Pemrograman Web I	[📝 Quiz] • Quiz Pertemuan ke-3 #postId:7221198	2	2026-05-03 02:34:37.412	cmomauulm004b5owq82ih8g21	2026-05-01 02:34:37.841	2026-05-01 02:34:37.841
cmomauuvt004f5owqiuuwq8mk	Pemrograman Web I	[📚 Materi] • Membuat Paragraf di HTML #postId:7221197	3	2026-05-03 02:34:37.412	cmomauulm004b5owq82ih8g21	2026-05-01 02:34:37.914	2026-05-01 02:34:37.914
cmomauuzo004h5owqlqkannsk	Statistika dan Probabilitas	[📚 Materi] • Materi #3 Statprob - Ukuran Penyebaran Data #postId:7386509	0	2026-05-03 02:34:37.412	cmomauuxp004g5owqqym3n070	2026-05-01 02:34:38.052	2026-05-01 02:34:38.052
cmomauv3l004j5owqpridp2qz	Struktur Data dan Algoritma	[📚 Materi] • Coding Arrays in C++ #postId:7380623	0	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.193	2026-05-01 02:34:38.193
cmomauv5g004k5owqll6hj356	Struktur Data dan Algoritma	[📚 Materi] • Coding C++ Arrays #postId:7380615	1	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.26	2026-05-01 02:34:38.26
cmomauv7b004l5owqcoj2ih1v	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures C using Second Edition #postId:7380147	2	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.327	2026-05-01 02:34:38.327
cmomauv9d004m5owqw8mwc5ut	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures  Using C++ #postId:7380139	3	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.401	2026-05-01 02:34:38.401
cmomauvbe004n5owqw8fterq4	Struktur Data dan Algoritma	[📚 Materi] • Referensi Struktur Data dan Implementasi Algoritma #postId:7380134	4	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.474	2026-05-01 02:34:38.474
cmomauvde004o5owqi8ycn135	Struktur Data dan Algoritma	[📝 Quiz] • Kuis #3 #postId:7379703	5	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.546	2026-05-01 02:34:38.546
cmomauvfi004p5owqq2k74vc0	Struktur Data dan Algoritma	[📚 Materi] • Materi Pengenalan Array #postId:7379702	6	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.622	2026-05-01 02:34:38.622
cmomauvhh004q5owqadx5lcsm	Struktur Data dan Algoritma	[📚 Materi] • Modul Pengenalan Array #postId:7379701	7	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.693	2026-05-01 02:34:38.693
cmomauvjf004r5owqoaw45wu8	Struktur Data dan Algoritma	[📚 Materi] • Recording Tipe Data dan Variabel #postId:7348290	8	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.763	2026-05-01 02:34:38.763
cmomauvlf004s5owq5r75qj76	Struktur Data dan Algoritma	[📚 Materi] • Video Conference #1 #postId:7345577	9	2026-05-03 02:34:37.412	cmomauv1o004i5owqalujf15c	2026-05-01 02:34:38.835	2026-05-01 02:34:38.835
cmomauvpc004u5owqsv9ig6c0	Sistem Basis Data	[📚 Materi] • Lingkungan Sistem Basis Data #postId:7366170	0	2026-05-03 02:34:37.412	cmomauvne004t5owq7op1x95v	2026-05-01 02:34:38.976	2026-05-01 02:34:38.976
cmomauvt6004w5owqjz3t6mqi	Kalkulus	[📝 Quiz] • Quiz 3 #postId:7385789	0	2026-05-03 02:34:37.412	cmomauvr5004v5owqs70wj2wv	2026-05-01 02:34:39.114	2026-05-01 02:34:39.114
cmomauvv6004x5owqyb33rab3	Kalkulus	[📚 Materi] • Video Penjelasan Materi 3 #postId:7385788	1	2026-05-03 02:34:37.412	cmomauvr5004v5owqs70wj2wv	2026-05-01 02:34:39.186	2026-05-01 02:34:39.186
cmomauvx6004y5owqv20sybbt	Kalkulus	[📚 Materi] • Materi Pembelajaran 3 #postId:7385787	2	2026-05-03 02:34:37.412	cmomauvr5004v5owqs70wj2wv	2026-05-01 02:34:39.258	2026-05-01 02:34:39.258
cmomauw1400505owq6p1310a7	Estetika Humanisme	[📚 Materi] • Materi - Sesi #3 (1) #postId:7374789	0	2026-05-03 02:34:37.412	cmomauvz3004z5owqsa068ac6	2026-05-01 02:34:39.4	2026-05-01 02:34:39.4
cmomayd9c005d5owqam4wo0oj	Statistika dan Probabilitas	[📚 Materi] • Vicon Gabungan Statistika dan Probabilitas IF203 dan IF209 Genap 2025-2026 #postId:7351246	1	2026-05-03 02:37:21.382	cmomayd3f005b5owq3ivc8s2v	2026-05-01 02:37:21.696	2026-05-01 02:37:21.696
cmomaydbe005e5owqgwd9d1g3	Statistika dan Probabilitas	[📚 Materi] • Materi Video Prof #postId:7290127	2	2026-05-03 02:37:21.382	cmomayd3f005b5owq3ivc8s2v	2026-05-01 02:37:21.77	2026-05-01 02:37:21.77
cmomaydf5005g5owq89vnex9x	Pemrograman Web I	[📚 Materi] • Semangat Sesi III #postId:7390116	0	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:21.905	2026-05-01 02:37:21.905
cmomaydh7005h5owqfe9x7gp8	Pemrograman Web I	[📚 Materi] • Sesi III #postId:7387976	1	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:21.979	2026-05-01 02:37:21.979
cmomaydj8005i5owqchrmr35r	Pemrograman Web I	[📚 Materi] • Zoom Sesi III #postId:7387340	2	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.052	2026-05-01 02:37:22.052
cmomaydl9005j5owqn8miaacs	Pemrograman Web I	[📝 Quiz] • Quiz #3 #postId:7383172	3	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.125	2026-05-01 02:37:22.125
cmomaydn8005k5owqh01hsyk6	Pemrograman Web I	[📚 Materi] • Semangat Diskusi Sesi III #postId:7376936	4	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.196	2026-05-01 02:37:22.196
cmomaydpd005l5owqawztu3mm	Pemrograman Web I	[📚 Materi] • Semangat Sesi III(Format Paragraf pada HTML) #postId:7365197	5	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.273	2026-05-01 02:37:22.273
cmomaydrb005m5owqi3z13xjq	Pemrograman Web I	[📚 Materi] • Materi #3 (Format Paragraph) #postId:7365121	6	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.343	2026-05-01 02:37:22.343
cmomaydtc005n5owqtgn8k0a2	Pemrograman Web I	[📚 Materi] • Tambahan Materi Pertemuan 2 #postId:7343471	7	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.416	2026-05-01 02:37:22.416
cmomaydve005o5owqj3k99ozg	Pemrograman Web I	[📚 Materi] • Jangan Lupa Aktifitas di LMS #postId:7340131	8	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.49	2026-05-01 02:37:22.49
cmomaydxh005p5owqf7b27jl2	Pemrograman Web I	[📚 Materi] • Semangat aktifitas di LMS #postId:7330296	9	2026-05-03 02:37:21.382	cmomaydd8005f5owqkjblsseu	2026-05-01 02:37:22.565	2026-05-01 02:37:22.565
cmomaye1r005r5owqam56izs7	Pendidikan Pancasila	[📚 Materi] • Materi #3 #postId:7392193	0	2026-05-03 02:37:21.382	cmomaydzt005q5owqpj8u9h9z	2026-05-01 02:37:22.719	2026-05-01 02:37:22.719
cmomaye5t005t5owq3knci34c	Estetika Humanisme	[📚 Materi] • Self Concept (Video) #postId:7381973	0	2026-05-03 02:37:21.382	cmomaye3q005s5owq1vplur6x	2026-05-01 02:37:22.865	2026-05-01 02:37:22.865
cmomaye7t005u5owq8kxd9hxz	Estetika Humanisme	[📚 Materi] • Self Concept (Modul dan PPT) #postId:7381974	1	2026-05-03 02:37:21.382	cmomaye3q005s5owq1vplur6x	2026-05-01 02:37:22.937	2026-05-01 02:37:22.937
cmomayebq005w5owqofo2l5zp	Kalkulus	[📝 Quiz] • Quiz 3 #postId:7385781	0	2026-05-03 02:37:21.382	cmomaye9q005v5owqvrbvd8zf	2026-05-01 02:37:23.078	2026-05-01 02:37:23.078
cmomayedt005x5owqww0ugo9v	Kalkulus	[📚 Materi] • Video Penjelasan Materi 3 #postId:7385780	1	2026-05-03 02:37:21.382	cmomaye9q005v5owqvrbvd8zf	2026-05-01 02:37:23.153	2026-05-01 02:37:23.153
cmomayefv005y5owqhypsr0sn	Kalkulus	[📚 Materi] • Materi Pembelajaran 3 #postId:7385779	2	2026-05-03 02:37:21.382	cmomaye9q005v5owqvrbvd8zf	2026-05-01 02:37:23.227	2026-05-01 02:37:23.227
cmomayejn00605owqbp5vm6gc	Sistem Basis Data	[📚 Materi] • Materi - Sesi #4 (1) #postId:7352409	0	2026-05-03 02:37:21.382	cmomayehq005z5owqv2k5x6t9	2026-05-01 02:37:23.363	2026-05-01 02:37:23.363
cmomc17cg0006m0wq9i7t9vbd	Pemrograman Web I	[📚 Materi] • Recording Sinkron Sesi 3 - Paragraf di HTML - 2023/2024 Genap PJJ Informatika UNSIA #postId:7221200	0	2026-05-03 03:07:33.88	cmomc17810005m0wqm0kvq9rv	2026-05-01 03:07:33.617	2026-05-01 03:07:33.617
cmomc17ew0007m0wql67ro28n	Pemrograman Web I	[📚 Materi] • Forum-3 - Penggunaan Paragraf untuk Konten Website #postId:7221199	1	2026-05-03 03:07:33.88	cmomc17810005m0wqm0kvq9rv	2026-05-01 03:07:33.704	2026-05-01 03:07:33.704
cmomayd7b005c5owqh912o68n	Statistika dan Probabilitas	[📚 Materi] • Rekaman Vicon Statistik & Probabilitas IF203-IF209 Genap 2025-2026 #postId:7376028	0	2026-05-02 19:37:00	cmomayd3f005b5owq3ivc8s2v	2026-05-01 02:37:21.623	2026-05-01 02:40:45.565
cmomc17h80008m0wql93o5fax	Pemrograman Web I	[📝 Quiz] • Quiz Pertemuan ke-3 #postId:7221198	2	2026-05-03 03:07:33.88	cmomc17810005m0wqm0kvq9rv	2026-05-01 03:07:33.788	2026-05-01 03:07:33.788
cmomc17jo0009m0wq97deih0t	Pemrograman Web I	[📚 Materi] • Membuat Paragraf di HTML #postId:7221197	3	2026-05-03 03:07:33.88	cmomc17810005m0wqm0kvq9rv	2026-05-01 03:07:33.876	2026-05-01 03:07:33.876
cmomc17st000dm0wqob8iy9gb	Struktur Data dan Algoritma	[📚 Materi] • Coding Arrays in C++ #postId:7380623	0	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.205	2026-05-01 03:07:34.205
cmomc17v4000em0wqd77nuq0p	Struktur Data dan Algoritma	[📚 Materi] • Coding C++ Arrays #postId:7380615	1	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.288	2026-05-01 03:07:34.288
cmomc17xj000fm0wq3wakfs5m	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures C using Second Edition #postId:7380147	2	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.375	2026-05-01 03:07:34.375
cmomc17zw000gm0wq1xxeus2q	Struktur Data dan Algoritma	[📚 Materi] • Referensi Data Structures  Using C++ #postId:7380139	3	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.46	2026-05-01 03:07:34.46
cmomc1827000hm0wqu51uplcd	Struktur Data dan Algoritma	[📚 Materi] • Referensi Struktur Data dan Implementasi Algoritma #postId:7380134	4	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.543	2026-05-01 03:07:34.543
cmomc184i000im0wqmuqxowag	Struktur Data dan Algoritma	[📝 Quiz] • Kuis #3 #postId:7379703	5	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.626	2026-05-01 03:07:34.626
cmomc186v000jm0wq5u9q3kcs	Struktur Data dan Algoritma	[📚 Materi] • Materi Pengenalan Array #postId:7379702	6	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.711	2026-05-01 03:07:34.711
cmomc1897000km0wqw5a3s2hd	Struktur Data dan Algoritma	[📚 Materi] • Modul Pengenalan Array #postId:7379701	7	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.795	2026-05-01 03:07:34.795
cmomc18bk000lm0wqctcepota	Struktur Data dan Algoritma	[📚 Materi] • Recording Tipe Data dan Variabel #postId:7348290	8	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.88	2026-05-01 03:07:34.88
cmomc18e1000mm0wq48787exr	Struktur Data dan Algoritma	[📚 Materi] • Video Conference #1 #postId:7345577	9	2026-05-03 03:07:33.88	cmomc17qm000cm0wq29z59uzf	2026-05-01 03:07:34.969	2026-05-01 03:07:34.969
cmomc18ij000om0wq6kleg368	Sistem Basis Data	[📚 Materi] • Lingkungan Sistem Basis Data #postId:7366170	0	2026-05-03 03:07:33.88	cmomc18g9000nm0wqnxuz8nfo	2026-05-01 03:07:35.131	2026-05-01 03:07:35.131
cmomc18n6000qm0wq9d2p9ekb	Kalkulus	[📝 Quiz] • Quiz 3 #postId:7385789	0	2026-05-03 03:07:33.88	cmomc18kz000pm0wqofnpahs4	2026-05-01 03:07:35.298	2026-05-01 03:07:35.298
cmomc18ph000rm0wqpqx789fe	Kalkulus	[📚 Materi] • Video Penjelasan Materi 3 #postId:7385788	1	2026-05-03 03:07:33.88	cmomc18kz000pm0wqofnpahs4	2026-05-01 03:07:35.381	2026-05-01 03:07:35.381
cmomc18rq000sm0wq98iu55qg	Kalkulus	[📚 Materi] • Materi Pembelajaran 3 #postId:7385787	2	2026-05-03 03:07:33.88	cmomc18kz000pm0wqofnpahs4	2026-05-01 03:07:35.462	2026-05-01 03:07:35.462
cmomc18wa000um0wqsvquvpw8	Estetika Humanisme	[📚 Materi] • Materi - Sesi #3 (1) #postId:7374789	0	2026-05-03 03:07:33.88	cmomc18tz000tm0wqf2ogrqsg	2026-05-01 03:07:35.626	2026-05-01 03:07:35.626
\.


--
-- Data for Name: CardLink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CardLink" (id, url, label, "cardId", "createdAt") FROM stdin;
\.


--
-- Data for Name: List; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."List" (id, title, "position", "boardId") FROM stdin;
cmomc17810005m0wqm0kvq9rv	Pemrograman Web I	0	cmomc13mc0003m0wqqx68xpq4
cmomc17m2000am0wqw6fe9oal	Statistika dan Probabilitas	1	cmomc13mc0003m0wqqx68xpq4
cmomc17qm000cm0wq29z59uzf	Struktur Data dan Algoritma	2	cmomc13mc0003m0wqqx68xpq4
cmogkb7u30005a4wq4u4q1s9l	To Do	0	cmogkb7u00004a4wqm3p215k3
cmogkb7u30006a4wqj52e59qj	On Going	1	cmogkb7u00004a4wqm3p215k3
cmogkb7u30007a4wq2iz3kmqa	Finish	2	cmogkb7u00004a4wqm3p215k3
cmogkhr5d0000uswqnmte7g02	Review	3	cmogkb7u00004a4wqm3p215k3
cmomc18g9000nm0wqnxuz8nfo	Sistem Basis Data	3	cmomc13mc0003m0wqqx68xpq4
cmomc18kz000pm0wqofnpahs4	Kalkulus	4	cmomc13mc0003m0wqqx68xpq4
cmomc18tz000tm0wqf2ogrqsg	Estetika Humanisme	5	cmomc13mc0003m0wqqx68xpq4
cmoglaecb000354wqra481571	To Do	0	cmoglaeca000254wqn3lnpor7
cmoglaecb000454wq21mcrpg9	On Going	1	cmoglaeca000254wqn3lnpor7
cmoglaecb000554wqx75hi8rz	Finish	2	cmoglaeca000254wqn3lnpor7
cmogliqtm000a54wq8uu9k39y	To Do	0	cmogliqtl000954wq2rz597rl
cmogliqtm000b54wq4hc76o2t	On Going	1	cmogliqtl000954wq2rz597rl
cmogliqtm000c54wqw2dpk4bs	Finish	2	cmogliqtl000954wq2rz597rl
cmogljeyy000e54wq9i4m8epn	To Do	0	cmogljeyx000d54wqllrncwyf
cmogljeyy000f54wqwougxkn1	On Going	1	cmogljeyx000d54wqllrncwyf
cmogljeyy000g54wqaol4iio7	Finish	2	cmogljeyx000d54wqllrncwyf
cmoi2g06t0003w4wqibpx56h3	To Do	0	cmoi2g06p0002w4wq7bheh84r
cmoi2g06t0004w4wqn97y7w99	On Going	1	cmoi2g06p0002w4wq7bheh84r
cmoi2g06t0005w4wq3x0cl0rj	Finish	2	cmoi2g06p0002w4wq7bheh84r
cmolgzjaa006ahkwqhlztntco	To Do	0	cmolgzja70069hkwq8rtfkjsb
cmolgzjaa006bhkwqjvqtygao	On Going	1	cmolgzja70069hkwq8rtfkjsb
cmolgzjaa006chkwqm501xlf5	Finish	2	cmolgzja70069hkwq8rtfkjsb
cmolgzmpq006dhkwq6h2hduh6	Pemrograman Web I	3	cmolgzja70069hkwq8rtfkjsb
cmolgzn3d006ihkwqy0sxyuuv	Statistika dan Probabilitas	4	cmolgzja70069hkwq8rtfkjsb
cmolgzn7h006khkwqbahzpft6	Struktur Data dan Algoritma	5	cmolgzja70069hkwq8rtfkjsb
cmolgznrf006thkwqxo93lwvo	Sistem Basis Data	6	cmolgzja70069hkwq8rtfkjsb
cmolgznvn006vhkwq4wqpurwk	Kalkulus	7	cmolgzja70069hkwq8rtfkjsb
cmolgzo3z006zhkwqsgygb4ko	Estetika Humanisme	8	cmolgzja70069hkwq8rtfkjsb
cmokvbmnu001tx0wqb4spxifa	To Do	0	cmokvbmnp001sx0wqpg6od88a
cmokvbmnu001ux0wqjbix9jik	On Going	1	cmokvbmnp001sx0wqpg6od88a
cmokvbmnu001vx0wqitw7i7pg	Finish	2	cmokvbmnp001sx0wqpg6od88a
cmokvbrmq001wx0wqa6673qf9	Statistika dan Probabilitas	3	cmokvbmnp001sx0wqpg6od88a
cmokvbrsa001yx0wqema0mp96	Struktur Data dan Algoritma	4	cmokvbmnp001sx0wqpg6od88a
cmokvbs5l0025x0wqmwbs1yzy	Kalkulus	5	cmokvbmnp001sx0wqpg6od88a
cmomal6e200375owqg5knrjvx	To Do	0	cmomal6dw00355owq53mht1m5
cmomal6e200385owqnheeo0wk	On Going	1	cmomal6dw00355owq53mht1m5
cmomal6e200395owqekr1c93n	Finish	2	cmomal6dw00355owq53mht1m5
cmomaujhl00485owqcmb4gfij	To Do	0	cmomaujhi00465owqowcvg8xa
cmomaujhl00495owqzjp4b5fq	On Going	1	cmomaujhi00465owqowcvg8xa
cmomaujhl004a5owqlfbdz4jg	Finish	2	cmomaujhi00465owqowcvg8xa
cmomauulm004b5owq82ih8g21	Pemrograman Web I	3	cmomaujhi00465owqowcvg8xa
cmomauuxp004g5owqqym3n070	Statistika dan Probabilitas	4	cmomaujhi00465owqowcvg8xa
cmomauv1o004i5owqalujf15c	Struktur Data dan Algoritma	5	cmomaujhi00465owqowcvg8xa
cmomauvne004t5owq7op1x95v	Sistem Basis Data	6	cmomaujhi00465owqowcvg8xa
cmomauvr5004v5owqs70wj2wv	Kalkulus	7	cmomaujhi00465owqowcvg8xa
cmomauvz3004z5owqsa068ac6	Estetika Humanisme	8	cmomaujhi00465owqowcvg8xa
cmomayaks00585owqnbl5x0gz	To Do	0	cmomayakp00565owqjpowikll
cmomayaks00595owqgfd1ap4z	On Going	1	cmomayakp00565owqjpowikll
cmomayaks005a5owq0xfzdmzz	Finish	2	cmomayakp00565owqjpowikll
cmomayd3f005b5owq3ivc8s2v	Statistika dan Probabilitas	3	cmomayakp00565owqjpowikll
cmomaydd8005f5owqkjblsseu	Pemrograman Web I	4	cmomayakp00565owqjpowikll
cmomaydzt005q5owqpj8u9h9z	Pendidikan Pancasila	5	cmomayakp00565owqjpowikll
cmomaye3q005s5owq1vplur6x	Estetika Humanisme	6	cmomayakp00565owqjpowikll
cmomaye9q005v5owqvrbvd8zf	Kalkulus	7	cmomayakp00565owqjpowikll
cmomayehq005z5owqv2k5x6t9	Sistem Basis Data	8	cmomayakp00565owqjpowikll
\.


--
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RefreshToken" (id, token, "userId", "expiresAt", "createdAt") FROM stdin;
cmo6ed85y0001s4wqn6163r7k	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbzZlZDUzeDAwMDBzNHdxcTk5bTV2cDQiLCJpYXQiOjE3NzY2NDEzMTQsImV4cCI6MTc3NzI0NjExNH0.aApOoE5t-TQl21stMQ1T8KYU5kzVcAaltUfRYE8dMMY	cmo6ed53x0000s4wqq99m5vp4	2026-04-26 23:28:34.964	2026-04-19 23:28:34.966
cmo6esfea00009swqfplxh1bu	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbzZlZDUzeDAwMDBzNHdxcTk5bTV2cDQiLCJpYXQiOjE3NzY2NDIwMjQsImV4cCI6MTc3NzI0NjgyNH0.l2aDCEsBTEKPTtMBcLU_4ch5pNJh27qVu0dH3Wc2Jqs	cmo6ed53x0000s4wqq99m5vp4	2026-04-26 23:40:24.169	2026-04-19 23:40:24.179
cmof4c9920001gswq5oeu8f1u	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcxNjg2NjksImV4cCI6MTc3Nzc3MzQ2OX0.d8seHFLCVeoObAIlXpLcy0IyqAhvagjCGQ3ZlKvJMI8	cmof4aiqk0000gswqees02eal	2026-05-03 01:57:49.139	2026-04-26 01:57:49.142
cmoghuq220000fkwqrlnbt47u	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTE4MzEsImV4cCI6MTc3Nzg1NjYzMX0.Acw3Sb2UONfdVr_cgyrhWwld3tdSGVzHVXREUKanpuM	cmof4aiqk0000gswqees02eal	2026-05-04 01:03:51.903	2026-04-27 01:03:51.914
cmoghwprj0001fkwqf4m8ipk2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTE5MjQsImV4cCI6MTc3Nzg1NjcyNH0.cqNC7T6jQaFgISLkobTjaZbWw1MCwuQwfmV8ZfkvBlg	cmof4aiqk0000gswqees02eal	2026-05-04 01:05:24.847	2026-04-27 01:05:24.847
cmogjuzn00002fkwq8p01hat5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTUyMDMsImV4cCI6MTc3Nzg2MDAwM30.h7yLePMmxHqDs4WKnYeSCpjagAL5TjCP7nbEB_k0dv0	cmof4aiqk0000gswqees02eal	2026-05-04 02:00:03.563	2026-04-27 02:00:03.564
cmogk49xh0000a4wq9c57m2m9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTU2MzYsImV4cCI6MTc3Nzg2MDQzNn0.IqMpN4Ff1HF0utQv4ICRpk-lZsgSrg4WJStnWajkBh4	cmof4aiqk0000gswqees02eal	2026-05-04 02:07:16.799	2026-04-27 02:07:16.806
cmogk9hj30001a4wq3plotdfp	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTU4NzksImV4cCI6MTc3Nzg2MDY3OX0.6YEKQ6OaoU9iIwqD-SbQqNN_PVTnEWZlaMeQ4AF3FGI	cmof4aiqk0000gswqees02eal	2026-05-04 02:11:19.935	2026-04-27 02:11:19.935
cmogkasmi0003a4wq9ji6vpux	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2drYW5ldjAwMDJhNHdxb3ZpY3N0eTEiLCJpYXQiOjE3NzcyNTU5NDAsImV4cCI6MTc3Nzg2MDc0MH0.j08hVIqV0t8R37wFqzQlYuYa9EIdOKBXpRVssUsFP9g	cmogkanev0002a4wqovicsty1	2026-05-04 02:12:20.97	2026-04-27 02:12:20.97
cmogki9ci0001uswq5go1bnvl	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTYyODksImV4cCI6MTc3Nzg2MTA4OX0.IVQjbC3cTFNCELeWdL74rXB7-ZElXbJV63EOM14NVtw	cmof4aiqk0000gswqees02eal	2026-05-04 02:18:09.233	2026-04-27 02:18:09.234
cmogkllyh0002v4wqz8qqj3kd	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTY0NDUsImV4cCI6MTc3Nzg2MTI0NX0.0tNWKO2LBVzPHLQtC1JALGbGJ2YzTwscm13HtFETKKs	cmof4aiqk0000gswqees02eal	2026-05-04 02:20:45.544	2026-04-27 02:20:45.545
cmogkys2m0009v4wqe5l422p2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTcwNTksImV4cCI6MTc3Nzg2MTg1OX0.wnRtVz3wwo5t9FhK_V_kzjx6HGCwZY9oZtOeIIfgjfo	cmof4aiqk0000gswqees02eal	2026-05-04 02:30:59.997	2026-04-27 02:30:59.998
cmogl0yw4000av4wqxs1n0nn2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTcxNjIsImV4cCI6MTc3Nzg2MTk2Mn0.en1vMgAo_7lEW6rwxgAXBo7Na7MxfZs5CNYeuHC9jMA	cmof4aiqk0000gswqees02eal	2026-05-04 02:32:42.148	2026-04-27 02:32:42.148
cmogla8gr000154wq3lmf52xg	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsYTF4ajAwMDA1NHdxdnR1d3QxdG8iLCJpYXQiOjE3NzcyNTc1OTQsImV4cCI6MTc3Nzg2MjM5NH0.qvy5rfwfQgVca6nfCb_0Df1c7C3O3jinE9jiiAYyvkI	cmogla1xj000054wqvtuwt1to	2026-05-04 02:39:54.456	2026-04-27 02:39:54.459
cmoglin4h000854wquykfrw0x	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsaWR1djAwMDc1NHdxa3cwenRmeW0iLCJpYXQiOjE3NzcyNTc5ODYsImV4cCI6MTc3Nzg2Mjc4Nn0.5G1_BzoejmMBQc8iZLcfu-Qd9F3fEIbRcbkczMuQmHs	cmogliduv000754wqkw0ztfym	2026-05-04 02:46:26.705	2026-04-27 02:46:26.706
cmoglptw0000m54wq2918hmn8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTgzMjIsImV4cCI6MTc3Nzg2MzEyMn0.w3jemFWwZvUg-z_HQyf87psWmtmMc8WMGYF-qgnHrrw	cmof4aiqk0000gswqees02eal	2026-05-04 02:52:02.064	2026-04-27 02:52:02.064
cmogm6krl000q54wq5xfnmt5q	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNTkxMDMsImV4cCI6MTc3Nzg2MzkwM30.RvHkbW5Tg-EB4qGE7l31zzeY-XI9MjzRhDyTuxtOieM	cmof4aiqk0000gswqees02eal	2026-05-04 03:05:03.393	2026-04-27 03:05:03.393
cmogs687b001354wq01fsmv0l	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyNjkxNjQsImV4cCI6MTc3Nzg3Mzk2NH0.u25H6odxFHEKEJLIQ2cIWQIOp4cQ-11T_MFvYgSstYI	cmof4aiqk0000gswqees02eal	2026-05-04 05:52:44.807	2026-04-27 05:52:44.807
cmoh2d9gg001b54wq8ul0op2n	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzcyODYyODksImV4cCI6MTc3Nzg5MTA4OX0.0Tu1oi56goe1B2M9VpqntGMScPSi5azFkLylspHmKTA	cmof4aiqk0000gswqees02eal	2026-05-04 10:38:09.184	2026-04-27 10:38:09.184
cmohdpuco001c54wq59qg942b	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzczMDUzNTEsImV4cCI6MTc3NzkxMDE1MX0.aDeAI_U1QQZ5C-UK-mCq9kIkmBs4z3qDJcnipZPgG74	cmof4aiqk0000gswqees02eal	2026-05-04 15:55:51.911	2026-04-27 15:55:51.912
cmoi17opw0000w4wq6vvo4fyb	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzczNDQ4MTUsImV4cCI6MTc3OTkzNjgxNX0.Dv1o27-Ml9EyfrqLEiCuZKluPHuh-B4eVheKSS-Wc9k	cmof4aiqk0000gswqees02eal	2026-05-28 02:53:35.581	2026-04-28 02:53:35.588
cmoi2fr1y0001w4wqztjv7ml9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsaWR1djAwMDc1NHdxa3cwenRmeW0iLCJpYXQiOjE3NzczNDY4NzEsImV4cCI6MTc3OTkzODg3MX0.R1AUcEbkb3ErsRZzHq7YPpXF3lBDxpIZ13b3Y7O6YrU	cmogliduv000754wqkw0ztfym	2026-05-28 03:27:51.478	2026-04-28 03:27:51.478
cmoi664tr000cw4wqrr39leqs	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsaWR1djAwMDc1NHdxa3cwenRmeW0iLCJpYXQiOjE3NzczNTMxNDEsImV4cCI6MTc3OTk0NTE0MX0.EmvQrJlR5lHe4hqJQtF_eZr-HgQM75R_ULpFFtvnjus	cmogliduv000754wqkw0ztfym	2026-05-28 05:12:21.231	2026-04-28 05:12:21.231
cmoi85wrp000dw4wq6xgjo1hr	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsaWR1djAwMDc1NHdxa3cwenRmeW0iLCJpYXQiOjE3NzczNTY0OTAsImV4cCI6MTc3OTk0ODQ5MH0.5ikd8aYJ_GmtnMXrZU9Pm2zhTOyG6lrwGD3Eh1a8jbo	cmogliduv000754wqkw0ztfym	2026-05-28 06:08:10.021	2026-04-28 06:08:10.021
cmoii7xsg000fw4wqhe30v3o7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzczNzMzODAsImV4cCI6MTc3OTk2NTM4MH0.iuz5r01G3dKDfik0OU8caECI6YgHHA2SeTdY828wTqE	cmof4aiqk0000gswqees02eal	2026-05-28 10:49:40.816	2026-04-28 10:49:40.816
cmoiixeas000gw4wq5l0k2495	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzczNzQ1NjgsImV4cCI6MTc3OTk2NjU2OH0.dnW5dyr4xdPLXbqMan2UlNCZhAAk_4LhXsSCUVxhe-0	cmof4aiqk0000gswqees02eal	2026-05-28 11:09:28.611	2026-04-28 11:09:28.612
cmoisok9l000hw4wqrouyhl1q	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3NzczOTA5NTIsImV4cCI6MTc3OTk4Mjk1Mn0.lTvdn-HMFjHoaF8HQ1WgSwMPoFhdyhOZPJF6RSXf7qk	cmof4aiqk0000gswqees02eal	2026-05-28 15:42:32.601	2026-04-28 15:42:32.601
cmojamnhm0000mcwqgifwo69d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc0MjEwOTYsImV4cCI6MTc4MDAxMzA5Nn0.nc6Y2gArFaDAQqHf4KoZrM_vuDoKOJCAHG4gv5ad3qA	cmof4aiqk0000gswqees02eal	2026-05-29 00:04:56.548	2026-04-29 00:04:56.554
cmojbs4dc0000zcwq9gk9umn3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc0MjMwMzEsImV4cCI6MTc4MDAxNTAzMX0.8SwwMdy-lx8Gqhj51pbAwrnKoE1060LkM3xmEq1Y9c0	cmof4aiqk0000gswqees02eal	2026-05-29 00:37:11.321	2026-04-29 00:37:11.328
cmojd4yp30002zcwqfgze0j66	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc0MjUzMTAsImV4cCI6MTc4MDAxNzMxMH0.-de68KRZVnxbScMjwWNkIHcDYUSTEIe7nzL6ano2GMU	cmof4aiqk0000gswqees02eal	2026-05-29 01:15:10.119	2026-04-29 01:15:10.119
cmojdzxzn0000mkwqu81afwh1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc0MjY3NTUsImV4cCI6MTc4MDAxODc1NX0.X6CFHtlIctApA85kjKJrbkA3I6YsZOXHOxsuA9x0JjU	cmof4aiqk0000gswqees02eal	2026-05-29 01:39:15.532	2026-04-29 01:39:15.539
cmojggock0002mkwqkha5xzte	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc0MzA4OTUsImV4cCI6MTc4MDAyMjg5NX0.yZMTgIokZb3QhiFRQar8X9JKjlxtpZBNr2MU25VrrXU	cmof4aiqk0000gswqees02eal	2026-05-29 02:48:15.427	2026-04-29 02:48:15.428
cmojic37l0003mkwq4stml1x4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2dsaWR1djAwMDc1NHdxa3cwenRmeW0iLCJpYXQiOjE3Nzc0MzQwNDAsImV4cCI6MTc4MDAyNjA0MH0.p6W2DkWlyM3fTxWZCDg4Yy5AhTyNVW2gy_6_lJu1-u4	cmogliduv000754wqkw0ztfym	2026-05-29 03:40:40.64	2026-04-29 03:40:40.641
cmokpq4fj0000k8wqts63a5kn	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MDY5MTgsImV4cCI6MTc4MDA5ODkxOH0.B5grtGF3DnCaV9L7X9UmzKJm6UUMGeJr6JG5px2CQUk	cmof4aiqk0000gswqees02eal	2026-05-29 23:55:18.889	2026-04-29 23:55:18.895
cmokrpn120000x0wq4f6wdjuf	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MTAyNTUsImV4cCI6MTc4MDEwMjI1NX0.6D2fPOLvKq3cvJoClCW5n4E1LBV2W3dRFKTQyumT8wg	cmof4aiqk0000gswqees02eal	2026-05-30 00:50:55.568	2026-04-30 00:50:55.574
cmokswo0k0004x0wqq4tzuunq	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MTIyNjMsImV4cCI6MTc4MDEwNDI2M30.YoPG10FcPJjZryixSocB4Pfz_SR3gZ5CVVq945wXoqU	cmof4aiqk0000gswqees02eal	2026-05-30 01:24:23.06	2026-04-30 01:24:23.06
cmokszmm5000dx0wqrnwjbb7j	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MTI0MDEsImV4cCI6MTc4MDEwNDQwMX0.saP650sdpH5VFryqzyt0Q1_aT5_qZy1oU52GGGpTtzw	cmof4aiqk0000gswqees02eal	2026-05-30 01:26:41.213	2026-04-30 01:26:41.213
cmokumpbt0018x0wqxeh9axxa	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2t1bTN2bDAwMTd4MHdxbGY0dzAwdngiLCJpYXQiOjE3Nzc1MTUxNTcsImV4cCI6MTc4MDEwNzE1N30.oIGhfBxXYLnelVeCcNN0_3LNGf5phA7m1bTcB39zGCc	cmokum3vl0017x0wqlf4w00vx	2026-05-30 02:12:37.433	2026-04-30 02:12:37.433
cmokva1za001rx0wq7dw2wquq	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2t2OXNiaDAwMXF4MHdxZ3dpcTZ2ZDkiLCJpYXQiOjE3Nzc1MTYyNDYsImV4cCI6MTc4MDEwODI0Nn0.l-AmXsKggiu_PWFhEZwgve5RtbEu4UVFo2zXQeiwuTc	cmokv9sbh001qx0wqgwiq6vd9	2026-05-30 02:30:46.918	2026-04-30 02:30:46.918
cmokvri9d0029x0wqpyfmxud2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MTcwNjEsImV4cCI6MTc4MDEwOTA2MX0.tsFX-vRc7ntsMxhmLYrcgFqYnAfM3nIB3pQxlBscxYA	cmof4aiqk0000gswqees02eal	2026-05-30 02:44:21.169	2026-04-30 02:44:21.169
cmol21hy0002fx0wqiaukhm1q	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1Mjc2MDUsImV4cCI6MTc4MDExOTYwNX0.KwT3VXLWmFehuzYm0tw6H-T4ZmxiG3SQ8jmKJAX-rjw	cmof4aiqk0000gswqees02eal	2026-05-30 05:40:05.015	2026-04-30 05:40:05.016
cmol3nmn4001jsowqem66sepk	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzAzMTcsImV4cCI6MTc4MDEyMjMxN30.XeULgiXLHDBU70v89nXfem23IsTNeBWeA3KATgyimiQ	cmof4aiqk0000gswqees02eal	2026-05-30 06:25:17.151	2026-04-30 06:25:17.152
cmol6a6zm001rsowqg25twfnt	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ3MjksImV4cCI6MTc4MDEyNjcyOX0.VRadbmmJ0ZQD8nUOrnB9NVXR8uCXQJzxVyDrF4lzWwY	cmof4aiqk0000gswqees02eal	2026-05-30 07:38:49.186	2026-04-30 07:38:49.186
cmol6af03001ssowq6h1shfke	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ3MzksImV4cCI6MTc4MDEyNjczOX0.DkMliYKhiruwlQ_VYaMAyWchegucpD6RFF_LoWQ1-Gw	cmof4aiqk0000gswqees02eal	2026-05-30 07:38:59.571	2026-04-30 07:38:59.571
cmol6bb68001tsowqr6innvt8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ3ODEsImV4cCI6MTc4MDEyNjc4MX0.FCcP6pnfq_b69c6Mbs2ENWClG-mh6-99c0OqHK5LwsU	cmof4aiqk0000gswqees02eal	2026-05-30 07:39:41.263	2026-04-30 07:39:41.264
cmol6be0s001usowqqkse2de6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ3ODQsImV4cCI6MTc4MDEyNjc4NH0.jcGf0vhlBN3QBc04JoWlYvOcEHZfofTC749LmlYalhU	cmof4aiqk0000gswqees02eal	2026-05-30 07:39:44.956	2026-04-30 07:39:44.956
cmol6bsjq001vsowqi6igv8f5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ4MDMsImV4cCI6MTc4MDEyNjgwM30.VnmG_THPgZDlHo2SWuhQPR8fUIJAHJLtyf9JsBvw0HM	cmof4aiqk0000gswqees02eal	2026-05-30 07:40:03.782	2026-04-30 07:40:03.782
cmol6c6m0001wsowquiel2lfp	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ4MjIsImV4cCI6MTc4MDEyNjgyMn0.g8GSz851bn69Z2NJtS_ic7XCC3rAcyTnLZ3BXOAQ49A	cmof4aiqk0000gswqees02eal	2026-05-30 07:40:22.008	2026-04-30 07:40:22.008
cmol6cajp001xsowqhcf3m1yy	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ4MjcsImV4cCI6MTc4MDEyNjgyN30.J39bCTV-F7h0uGegajCdyJZ0UBZvP55edSAT1ytnVSI	cmof4aiqk0000gswqees02eal	2026-05-30 07:40:27.108	2026-04-30 07:40:27.109
cmol6ctbk001ysowqzz3anvad	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ4NTEsImV4cCI6MTc4MDEyNjg1MX0.wJpY-ND9I-2bdfJp_K_fRLoDvz5wMaY1TeCWHsXUQOI	cmof4aiqk0000gswqees02eal	2026-05-30 07:40:51.44	2026-04-30 07:40:51.44
cmol6fcdr0000hkwqht5qeltn	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ5NjksImV4cCI6MTc4MDEyNjk2OX0.EvZlLeqXjPvkQZNfqFM0HYyWWrA0zEO3CNsxHxK2Jcc	cmof4aiqk0000gswqees02eal	2026-05-30 07:42:49.449	2026-04-30 07:42:49.455
cmol6ffws0001hkwq7r1j90hp	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ5NzQsImV4cCI6MTc4MDEyNjk3NH0.FWkyEfOyhXc1f1tavADuobU0qQp6A3fXyjmHfqgM7h8	cmof4aiqk0000gswqees02eal	2026-05-30 07:42:54.027	2026-04-30 07:42:54.028
cmol6fh4q0002hkwqywaname7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ5NzUsImV4cCI6MTc4MDEyNjk3NX0.80Cf7bIj0pMiqMfTmf81dlVcjIhSCfd_87UHdO4pXG8	cmof4aiqk0000gswqees02eal	2026-05-30 07:42:55.61	2026-04-30 07:42:55.61
cmol6fra10003hkwq0x389dy3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ5ODgsImV4cCI6MTc4MDEyNjk4OH0.KyNXnboNoTS77JBeV9cVEMTuVdWWERXrsK6yq-DIcPk	cmof4aiqk0000gswqees02eal	2026-05-30 07:43:08.761	2026-04-30 07:43:08.762
cmol6fyxf0004hkwqexrbec08	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzQ5OTgsImV4cCI6MTc4MDEyNjk5OH0.Glz5R7gB7FbPOQszcBlcKknQjQV9ghqXN_KIGYRP5RY	cmof4aiqk0000gswqees02eal	2026-05-30 07:43:18.675	2026-04-30 07:43:18.675
cmol6hb4e0005hkwq3t3kqrmw	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1MzUwNjEsImV4cCI6MTc4MDEyNzA2MX0.E4FRPv20bOQdfH8_Hrb-xNkw0xlqsAnhRKUod_qPxqQ	cmof4aiqk0000gswqees02eal	2026-05-30 07:44:21.134	2026-04-30 07:44:21.135
cmol8pahw0006hkwqpkgt7x02	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1Mzg3OTIsImV4cCI6MTc4MDEzMDc5Mn0.LAuOhUZQ8GxUJ2TI4ogO32VuBCESAsLgsKeNOIWSrRM	cmof4aiqk0000gswqees02eal	2026-05-30 08:46:32.804	2026-04-30 08:46:32.804
cmolbb6c30007hkwqowpgr8oe	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NDMxNzMsImV4cCI6MTc4MDEzNTE3M30.GOlT9q2oWudK2JjUxagmOdhsOEWF5Wh7K4DhvobvZ9w	cmof4aiqk0000gswqees02eal	2026-05-30 09:59:33.075	2026-04-30 09:59:33.075
cmolcd7yq0008hkwq34160c35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NDQ5NDgsImV4cCI6MTc4MDEzNjk0OH0.eqzOZH2G85F35SeWD6DRwcFScvhzXZyR50NG4ML6RSA	cmof4aiqk0000gswqees02eal	2026-05-30 10:29:08.114	2026-04-30 10:29:08.114
cmolgydj60068hkwqffwif9kb	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NTI2NTMsImV4cCI6MTc4MDE0NDY1M30.5AG1OaUx3TI4N2A-_Zt-yZ22-XyOvyoEZMjgwtrz1j8	cmof4aiqk0000gswqees02eal	2026-05-30 12:37:33.569	2026-04-30 12:37:33.57
cmolmxji40000fwwq0pl2vqsi	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NjI2OTIsImV4cCI6MTc4MDE1NDY5Mn0.r5JEKPYvOhOunWqUeNR8j2GsxAedjcafjojsmELmK1E	cmof4aiqk0000gswqees02eal	2026-05-30 15:24:52.342	2026-04-30 15:24:52.348
cmolnrqo00004wgwq0ay45d3k	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NjQxMDEsImV4cCI6MTc4MDE1NjEwMX0.oQue75Ge7HuwdTddzY_VyUKwr1MtArgdh_1xToAfha8	cmof4aiqk0000gswqees02eal	2026-05-30 15:48:21.311	2026-04-30 15:48:21.312
cmoloecnw00004owqyqbt72uh	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NjUxNTYsImV4cCI6MTc4MDE1NzE1Nn0.cZp2uwK2AfM1tIufCTraMWwYD73ivLj0Y56paiRxHUo	cmof4aiqk0000gswqees02eal	2026-05-30 16:05:56.246	2026-04-30 16:05:56.252
cmolpd8bt00034owqlvs3uulb	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc1NjY3ODMsImV4cCI6MTc4MDE1ODc4M30.V9_0ZLPbBnJpYAlfcOrvKGutM5v7ytOIr0ueq3vF5S0	cmof4aiqk0000gswqees02eal	2026-05-30 16:33:03.593	2026-04-30 16:33:03.593
cmom9co4w00001swqucvlbkit	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc2MDAzNDksImV4cCI6MTc4MDE5MjM0OX0.iJLi-6r9mbr5rxPBT3koI1LcRUMGYmZ7BOrrgbj79y4	cmof4aiqk0000gswqees02eal	2026-05-31 01:52:29.738	2026-05-01 01:52:29.744
cmom9e4uq00031swq29twoqwf	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc2MDA0MTgsImV4cCI6MTc4MDE5MjQxOH0.tnOHEE3qZ-EVxlqI1R6f-iWsb5OECrda_p9wO9KQ_SU	cmof4aiqk0000gswqees02eal	2026-05-31 01:53:38.066	2026-05-01 01:53:38.066
cmom9s0u4000twowqd87ya109	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb205cnYyNzAwMHN3b3dxeHozMG5sYWQiLCJpYXQiOjE3Nzc2MDEwNjYsImV4cCI6MTc4MDE5MzA2Nn0.Z4dZdx2JsPbSH3WR_yhdUFm6aZYIPiCVGjXV6j6JkjU	cmom9rv27000swowqxz30nlad	2026-05-31 02:04:26.043	2026-05-01 02:04:26.044
cmomasjtn00455owqacdi6661	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb205cnYyNzAwMHN3b3dxeHozMG5sYWQiLCJpYXQiOjE3Nzc2MDI3NzAsImV4cCI6MTc4MDE5NDc3MH0.N4S34kdACksajGej2OLTB59WLzNcq4nuHcm6Ag_T1BA	cmom9rv27000swowqxz30nlad	2026-05-31 02:32:50.266	2026-05-01 02:32:50.267
cmombzoau0000m0wqmjw3ws99	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtb2Y0YWlxazAwMDBnc3dxZWVzMDJlYWwiLCJpYXQiOjE3Nzc2MDQ3ODIsImV4cCI6MTc4MDE5Njc4Mn0.za5l8y5aY-CLL6ohnnfJ7xNBOvJeyEv2cwrRWC_E1ro	cmof4aiqk0000gswqees02eal	2026-05-31 03:06:22.273	2026-05-01 03:06:22.278
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "isAdmin", "createdAt", "updatedAt") FROM stdin;
cmo6ed53x0000s4wqq99m5vp4	prastya	prastyadev@gmail.com	$2b$10$5AQvyLNag6AqMSXyUwhLHex2BR3QgB.OMnC/H4NhsZTwCQw3Ux/Yy	f	2026-04-19 23:28:31.005	2026-04-19 23:28:31.005
cmof4aiqk0000gswqees02eal	prastya-dev	prastyadev1@gmail.com	$2b$10$WSoWOLtOJFcP.1pgZsspuewBbG4N3JqfuFk0ES8r8kSfodMkvm8Si	f	2026-04-26 01:56:28.124	2026-04-26 01:56:28.124
cmogkanev0002a4wqovicsty1	Budi Santoso	budi@test.com	$2b$10$vEnQydUVbo/SuJQSxZNA0OkSjAK25WJfAdN8ypJIlBAGuRkPUH2ui	f	2026-04-27 02:12:14.215	2026-04-27 02:12:14.215
cmogla1xj000054wqvtuwt1to	Prastya	prastyaar112@gmail.com	$2b$10$R.V6h59JafLPH8u3O639V.xtd3rc4ZgBMweS/lNNoe9ByVja0mete	f	2026-04-27 02:39:45.991	2026-04-27 02:39:45.991
cmogliduv000754wqkw0ztfym	dave	senjapraditia8@gmail.com	$2b$10$9nSAyZf94pG86RKoNZUPjeMCvfP2WBEQZWN8c69HxSL.oW/btp4eG	f	2026-04-27 02:46:14.695	2026-04-27 02:46:14.695
cmojcwqsd0001zcwqxh8s5mnr	prastya 	prastyaar1112@gmail.com	$2b$10$gWtacyZr4j5/NQjT560Nyu37lv420i0tRPs3wqzlUmNSdXdukh73a	f	2026-04-29 01:08:46.621	2026-04-29 01:08:46.621
cmojda9ro0003zcwq1sj62s0z	Hshshs	prastyaarddd112@gmail.com	$2b$10$c0vLhxjyYglUgALwZUyZYutrDAQI9cdZ.bNutpRzl.TQoaZKqo3f2	f	2026-04-29 01:19:17.748	2026-04-29 01:19:17.748
cmojdauj30004zcwq8qbxl69a	Sjsjsjd	nsjsjs@gmail.com	$2b$10$m00Z/lhYKUjwsgFTPlyWHuP65qSG0wjE4aHrhNU1NEjTwmtLwWe9u	f	2026-04-29 01:19:44.655	2026-04-29 01:19:44.655
cmojdg2oq0005zcwqbvhxs4es	ZbHsh	budi@gmail.com	$2b$10$o0rzZFKscJho5OSPwIvt1evO0oRH4GTZ14Maldb2N7lz7W66zki1u	f	2026-04-29 01:23:48.506	2026-04-29 01:23:48.506
cmojdxhvm0006zcwqynrrl9ew	Testerr	prastyaar1122@gmail.com	$2b$10$j0mV/KSiJ8MnfRmEyOk89e2zifmpQMtqm6SKiFUfPJekYp9bp7YXa	f	2026-04-29 01:37:21.346	2026-04-29 01:37:21.346
cmokswahg0003x0wqr1j56d3q	Prastya	prastyaaxr112@gmail.com	$2b$10$tCFuX.1jPd44U7zIAJK2Melfivy.hNlxV7sdYETJlOUWOqgjoZMLO	f	2026-04-30 01:24:05.524	2026-04-30 01:24:05.524
cmokum3vl0017x0wqlf4w00vx	prast	prastyadev2@gmail.com	$2b$10$QVpwkQbEU8t9NmjcuSV5O.OlvT.WpPi20Hsc95IU06jcCbZ5Y77Pm	f	2026-04-30 02:12:09.633	2026-04-30 02:12:09.633
cmokv9sbh001qx0wqgwiq6vd9	prastya	prastya@gmail.com	$2b$10$K5S20YRUPYQb7y8f.TL.ouxM3iozbKnBrwEvVTGoM0mKw5dzATclO	f	2026-04-30 02:30:34.397	2026-04-30 02:30:34.397
cmom9rv27000swowqxz30nlad	diva uswatun hasanah	divauswatunhasanah05@gmail.com	$2b$10$zVXUmYz9ZbxkXrJScSjOX.BdjMRvovClPfKFhARzewu4CQBvDjP2O	f	2026-05-01 02:04:18.559	2026-05-01 02:04:18.559
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9474e251-3db8-4956-8122-867185ce05c6	431de272736cfaf7287095df61e851d539b52ab68b6047b04846fb30c2de1083	2026-04-19 06:48:18.579518+07	20260418234818_init	\N	\N	2026-04-19 06:48:18.566021+07	1
b212d61e-a970-41ec-835b-0384aab4b422	e8f9af07baab39fb3d2391ef0673ee2700f6e6af89f8a5cccb28adb09382264e	2026-04-26 08:07:12.551334+07	20260426010712_init_full_schema	\N	\N	2026-04-26 08:07:12.489214+07	1
20720f67-95f7-4f07-8ba8-124ff17e751a	dddfed12c7ec236607810d117d82f9ce4ec1d54102050de794169b7ee19cf80a	2026-04-30 22:39:10.693929+07	20260430153910_add_new_column_fix	\N	\N	2026-04-30 22:39:10.624974+07	1
\.


--
-- Name: BoardMember BoardMember_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardMember"
    ADD CONSTRAINT "BoardMember_pkey" PRIMARY KEY (id);


--
-- Name: Board Board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Board"
    ADD CONSTRAINT "Board_pkey" PRIMARY KEY (id);


--
-- Name: CardLink CardLink_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CardLink"
    ADD CONSTRAINT "CardLink_pkey" PRIMARY KEY (id);


--
-- Name: Card Card_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Card_pkey" PRIMARY KEY (id);


--
-- Name: List List_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."List"
    ADD CONSTRAINT "List_pkey" PRIMARY KEY (id);


--
-- Name: RefreshToken RefreshToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BoardMember_boardId_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BoardMember_boardId_userId_key" ON public."BoardMember" USING btree ("boardId", "userId");


--
-- Name: Board_shareId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Board_shareId_key" ON public."Board" USING btree ("shareId");


--
-- Name: RefreshToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RefreshToken_token_key" ON public."RefreshToken" USING btree (token);


--
-- Name: RefreshToken_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "RefreshToken_userId_idx" ON public."RefreshToken" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: BoardMember BoardMember_boardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardMember"
    ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES public."Board"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BoardMember BoardMember_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BoardMember"
    ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Board Board_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Board"
    ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CardLink CardLink_cardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CardLink"
    ADD CONSTRAINT "CardLink_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES public."Card"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Card Card_listId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES public."List"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: List List_boardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."List"
    ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES public."Board"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RefreshToken RefreshToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict TRBF6665uijNnfcWIV3aXhk3JsaTPlExxehNLfW1zWPaAevdL16EsvviiD6BuOa

