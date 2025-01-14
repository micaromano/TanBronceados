USE [TanBronceados]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[Username] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bookings]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bookings](
	[BookingID] [int] IDENTITY(1,1) NOT NULL,
	[BookingDate] [date] NOT NULL,
	[BookingTime] [time](7) NOT NULL,
	[BookingDateTime] [datetime] NOT NULL,
	[Deposit] [int] NULL,
	[BookingType] [varchar](50) NOT NULL,
	[BookingState] [varchar](50) NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[ClientID] [int] NULL,
	[SessionID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[BookingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BusinessServices]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessServices](
	[ServiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceName] [nvarchar](255) NOT NULL,
	[ServiceDescription] [nvarchar](255) NOT NULL,
	[Price] [int] NOT NULL,
	[Duration] [int] NOT NULL,
    [HoraDesde] [int] NOT NULL,
    [HoraHasta] [int] NOT NULL,
	[isActive] [bit] NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[Phone] [int] NOT NULL,
	[Instagram] [nvarchar](255) NULL,
	[Birthdate] [date] NOT NULL,
	[Gender] [nvarchar](255) NOT NULL,
	[isActive] [bit] NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiscountCoupons]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiscountCoupons](
	[DiscountCouponID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](255) NOT NULL,
	[CampaignName] [nvarchar](255) NOT NULL,
	[DiscountPercentage] [int] NOT NULL,
	[CouponType] [varchar](10) NOT NULL,
	[ExpirationDate] [date] NULL,
	[isActive] [bit] NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DiscountCouponID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SessionServices]    Script Date: 12/1/2025 23:06:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SessionServices](
	[SessionID] [int] IDENTITY(1,1) NOT NULL,
	[SessionPurchaseDate] [date] NOT NULL,
	[SessionState] [nvarchar](50) NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
	[ServiceID] [int] NULL,
	[ClientID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[SessionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Admins] ON 

INSERT [dbo].[Admins] ([AdminID], [FullName], [Username], [Email], [PasswordHash], [createdAt], [updatedAt]) VALUES (2, N'Ana Perez', N'aperez', N'aperez@gmail.com', N'$2b$10$anrKJ\WFETo8vSY1.OCqpOnph4PP7SR\sUUoRFA4U9Xp\flM9rhe2', CAST(N'2024-12-05T16:45:52.637' AS DateTime), CAST(N'2024-12-05T16:45:52.637' AS DateTime))
INSERT [dbo].[Admins] ([AdminID], [FullName], [Username], [Email], [PasswordHash], [createdAt], [updatedAt]) VALUES (3, N'Juan Perez', N'jperez', N'jperez@gmail.com', N'$2b$10$xhS8o6h97o0xrAhcKr3t3OaaJOJDsd/2v9ZuNFd3m407jWvMM0HY', CAST(N'2024-12-05T17:50:43.200' AS DateTime), CAST(N'2024-12-05T17:50:43.200' AS DateTime))
SET IDENTITY_INSERT [dbo].[Admins] OFF
GO
SET IDENTITY_INSERT [dbo].[Bookings] ON 

INSERT [dbo].[Bookings] ([BookingID], [BookingDate], [BookingTime], [BookingDateTime], [Deposit], [BookingType], [BookingState], [createdAt], [updatedAt], [ClientID], [SessionID]) VALUES (1, CAST(N'2025-01-12' AS Date), CAST(N'10:00:00' AS Time), CAST(N'2025-01-12T10:00:00.000' AS DateTime), NULL, N'ReservaPagada', N'Pendiente', CAST(N'2025-01-12T16:45:30.527' AS DateTime), CAST(N'2025-01-12T16:45:30.527' AS DateTime), 2, 1)
INSERT [dbo].[Bookings] ([BookingID], [BookingDate], [BookingTime], [BookingDateTime], [Deposit], [BookingType], [BookingState], [createdAt], [updatedAt], [ClientID], [SessionID]) VALUES (2, CAST(N'2025-01-12' AS Date), CAST(N'10:00:00' AS Time), CAST(N'2025-01-12T10:00:00.000' AS DateTime), NULL, N'ReservaPagada', N'Pendiente', CAST(N'2025-01-12T16:46:33.560' AS DateTime), CAST(N'2025-01-12T16:46:33.560' AS DateTime), 2, 1)
SET IDENTITY_INSERT [dbo].[Bookings] OFF
GO
SET IDENTITY_INSERT [dbo].[BusinessServices] ON 

INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (1, N'Bronceado Orgánico Normal', N'Aplicación de bronceado orgánico para un color natural en 8-12 horas.', 1400, 30, 9, 18, 1, CAST(N'2024-12-05T15:22:54.803' AS DateTime), CAST(N'2024-12-22T20:28:53.380' AS DateTime))
INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (2, N'Bronceado Orgánico Express', N'Bronceado orgánico con secado rápido y resultados visibles en 1-3 horas.', 4500, 25, 9, 18, 1, CAST(N'2024-12-05T15:22:54.807' AS DateTime), CAST(N'2024-12-05T15:22:54.807' AS DateTime))
INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (3, N'Bronceado Orgánico con Hidratación', N'Bronceado orgánico con un tratamiento hidratante previo para una piel suave y uniforme.', 4000, 35, 9, 18, 1, CAST(N'2024-12-05T15:22:54.807' AS DateTime), CAST(N'2024-12-14T01:19:00.410' AS DateTime))
INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (4, N'Bronceado Orgánico Facial', N'Tratamiento específico para broncear el rostro de manera uniforme.', 1500, 15, 9, 18, 0, CAST(N'2024-12-05T15:22:54.810' AS DateTime), CAST(N'2024-12-06T19:17:48.143' AS DateTime))
INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (5, N'Bronceado Orgánico para Eventos', N'Bronceado personalizado de alta calidad para eventos especiales.', 5000, 45, 9, 18, 0, CAST(N'2024-12-05T15:22:54.810' AS DateTime), CAST(N'2024-12-05T20:59:19.163' AS DateTime))
INSERT [dbo].[BusinessServices] ([ServiceID], [ServiceName], [ServiceDescription], [Price], [Duration], [HoraDesde], [HoraHasta], [isActive], [createdAt], [updatedAt]) VALUES (6, N'Bronceado organico para embarazadas', N'Bronceado apto para embarazadas (100% organico)', 2500, 20, 9, 18, 0, CAST(N'2024-12-05T21:25:54.250' AS DateTime), CAST(N'2024-12-13T17:52:02.870' AS DateTime))
SET IDENTITY_INSERT [dbo].[BusinessServices] OFF
GO
SET IDENTITY_INSERT [dbo].[Clients] ON 

INSERT [dbo].[Clients] ([ClientID], [FullName], [Email], [PasswordHash], [Phone], [Instagram], [Birthdate], [Gender], [isActive], [createdAt], [updatedAt]) VALUES (2, N'Astrid Berke', N'az196574@fi365.ort.edu.uy', N'$2b$10$2pkr0WIrep5c8Y8SUnulVeu9OHn.iQ2o1TwlHSr8b3GX4MBElDbiG', 98460298, N'@aszegers', CAST(N'1990-01-09' AS Date), N'femenino', 1, CAST(N'2024-11-25T20:13:33.617' AS DateTime), CAST(N'2024-11-25T20:13:33.617' AS DateTime))
INSERT [dbo].[Clients] ([ClientID], [FullName], [Email], [PasswordHash], [Phone], [Instagram], [Birthdate], [Gender], [isActive], [createdAt], [updatedAt]) VALUES (3, N'Paula Mendez', N'astrid.zegers@gmail.com', N'$2b$10$1hla4V13LA/rtTzzg0rZI.meXTVZHHDvt4.ASaRSXvG2zpuQuAcym', 98460298, N'@aszegers', CAST(N'1990-01-09' AS Date), N'femenino', 1, CAST(N'2024-11-25T20:22:37.320' AS DateTime), CAST(N'2024-11-25T20:22:37.320' AS DateTime))
SET IDENTITY_INSERT [dbo].[Clients] OFF
GO
SET IDENTITY_INSERT [dbo].[DiscountCoupons] ON 

INSERT [dbo].[DiscountCoupons] ([DiscountCouponID], [Code], [CampaignName], [DiscountPercentage], [CouponType], [ExpirationDate], [isActive], [createdAt], [updatedAt]) VALUES (1, N'TANDESC30', N'Navidad', 30, N'Unico', CAST(N'2024-12-25' AS Date), 1, CAST(N'2024-12-15T12:45:00.960' AS DateTime), CAST(N'2024-12-15T12:45:00.960' AS DateTime))
INSERT [dbo].[DiscountCoupons] ([DiscountCouponID], [Code], [CampaignName], [DiscountPercentage], [CouponType], [ExpirationDate], [isActive], [createdAt], [updatedAt]) VALUES (2, N'TANDESC25', N'Reyes', 25, N'Multiple', NULL, 1, CAST(N'2024-12-15T12:45:00.967' AS DateTime), CAST(N'2024-12-15T12:45:00.967' AS DateTime))
SET IDENTITY_INSERT [dbo].[DiscountCoupons] OFF
GO
SET IDENTITY_INSERT [dbo].[SessionServices] ON 

INSERT [dbo].[SessionServices] ([SessionID], [SessionPurchaseDate], [SessionState], [createdAt], [updatedAt], [ServiceID], [ClientID]) VALUES (1, CAST(N'2024-12-26' AS Date), N'Pendiente de agenda', CAST(N'2024-12-26T17:04:36.957' AS DateTime), CAST(N'2024-12-26T17:04:36.957' AS DateTime), 1, 2)
SET IDENTITY_INSERT [dbo].[SessionServices] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Admins__536C85E44C702832]    Script Date: 12/1/2025 23:06:11 ******/
ALTER TABLE [dbo].[Admins] ADD UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Admins__A9D10534087BFF90]    Script Date: 12/1/2025 23:06:11 ******/
ALTER TABLE [dbo].[Admins] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Business__A42B5F996B29E212]    Script Date: 12/1/2025 23:06:11 ******/
ALTER TABLE [dbo].[BusinessServices] ADD UNIQUE NONCLUSTERED 
(
	[ServiceName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Clients__A9D10534ED314DBC]    Script Date: 12/1/2025 23:06:11 ******/
ALTER TABLE [dbo].[Clients] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Discount__A25C5AA73EFF73E2]    Script Date: 12/1/2025 23:06:11 ******/
ALTER TABLE [dbo].[DiscountCoupons] ADD UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT ('Pendiente') FOR [BookingState]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[BusinessServices] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[BusinessServices] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[DiscountCoupons] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[DiscountCoupons] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[SessionServices] ADD  DEFAULT ('Pendiente de agenda') FOR [SessionState]
GO
ALTER TABLE [dbo].[SessionServices] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[SessionServices] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([SessionID])
REFERENCES [dbo].[SessionServices] ([SessionID])
GO
ALTER TABLE [dbo].[SessionServices]  WITH CHECK ADD FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[SessionServices]  WITH CHECK ADD FOREIGN KEY([ServiceID])
REFERENCES [dbo].[BusinessServices] ([ServiceID])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD CHECK  (([BookingType]='HorarioNoDisponible' OR [BookingType]='ReservaPendientePago' OR [BookingType]='ReservaPagada'))
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD CHECK  (([BookingState]='NoShow' OR [BookingState]='Cancelada' OR [BookingState]='Finalizada' OR [BookingState]='Pendiente'))
GO
ALTER TABLE [dbo].[DiscountCoupons]  WITH CHECK ADD CHECK  (([CouponType]='Multiple' OR [CouponType]='Unico'))
GO
ALTER TABLE [dbo].[SessionServices]  WITH CHECK ADD CHECK  (([SessionState]='Usada' OR [SessionState]='Cancelada' OR [SessionState]='Agendada' OR [SessionState]='Pendiente de agenda'))
GO

