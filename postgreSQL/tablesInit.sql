--type definition

CREATE TYPE SORT AS ENUM (
  'TimeCreated:Asc',
  'TimeCreated:Desc',
  'Alphabetical:Asc',
  'Alphabetical:Desc',
  'DueDate:Asc',
  'DueDate:Desc',
  'PrefixAlphabetical:Asc',
  'PrefixAlphabetical:Desc',
  'Priority:Asc',
  'Priority:Desc'
);

CREATE TYPE DATETYPE AS ENUM (
  'DueDate',
  'StartDate'
);

CREATE TYPE SETTINGKEY AS ENUM (
  '0',
  '1'
);

--create tables

CREATE TABLE UserData
(
  UserId SERIAL,
  Username VARCHAR(25) NOT NULL,
  Password VARCHAR(40) NOT NULL,
  RefreshTokenId BYTEA NOT NULL,
  PRIMARY KEY (UserId),
  UNIQUE (Username),
  UNIQUE (RefreshTokenId),
  CONSTRAINT usernameLength CHECK (CHAR_LENGTH(Username) >= 5),
  CONSTRAINT passwordLength CHECK (CHAR_LENGTH(Password) >= 10)
);

CREATE TABLE Setting
(
  SettingId SERIAL,
  Key SETTINGKEY,
  Value VARCHAR(100),
  PRIMARY KEY (SettingId)
);

CREATE TABLE UserSettings
(
  UserId INT NOT NULL,
  SettingId INT NOT NULL,
  PRIMARY KEY (UserId, SettingId),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId),
  FOREIGN KEY (SettingId) REFERENCES Setting(SettingId)
);

CREATE TABLE ToDoList
(
  UserId INT NOT NULL,
  ListId SERIAL,
  Name VARCHAR(50) NOT NULL,
  SerialNumber INT NOT NULL,
  HighLevelSort SORT DEFAULT 'TimeCreated:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  DefaultGroupId INT,
  HighlightDefault BOOLEAN DEFAULT 'True',
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ListId),
  UNIQUE (Name),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId),
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE ToDoListItem
(
  ListItemId SERIAL,
  ListId INT NOT NULL,
  PRIMARY KEY (ListItemId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId)
);

CREATE TABLE Filter
(
  FilterId SERIAL,
  Name VARCHAR(50) NOT NULL,
  Depth INT DEFAULT 1,
  ParentFilterId INT,
  PRIMARY KEY (FilterId),
  UNIQUE (Name),
  CONSTRAINT depthLimit CHECK (Depth <= 3)
);

CREATE TABLE ToDoGroup
(
  GroupId INT NOT NULL,
  Name VARCHAR(50) NOT NULL,
  HighLevelSort SORT DEFAULT 'TimeCreated:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  IsOrdered BOOLEAN DEFAULT 'True',
  isOpened BOOLEAN DEFAULT 'False',
  FilterId INT,
  PRIMARY KEY (GroupId),
  FOREIGN KEY (GroupId) REFERENCES ToDoListItem(ListItemId) ON DELETE SET NULL,
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId),
  UNIQUE (Name),
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE PrefixFilter
(
  FilterId INT NOT NULL,
  Prefix VARCHAR(50) NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  UNIQUE (Prefix)
);

CREATE TABLE SizeFilter
(
  FilterId INT NOT NULL,
  Size INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  UNIQUE (Size)
);

CREATE TABLE TimePeriodFilter
(
  FilterId INT NOT NULL,
  DateType DATETYPE DEFAULT 'DueDate',
  LowerBoundDate DATE,
  HigherBoundDate DATE,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CHECK ((LowerBoundDate IS NOT NULl) OR (HigherBoundDate IS NOT NULl))
);

CREATE TABLE PriorityFilter
(
  FilterId INT NOT NULL,
  HigherBoundPriority INT,
  LowerBoundPriority INT,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CHECK ((LowerBoundPriority IS NOT NULl) OR (HigherBoundPriority IS NOT NULl))
);

CREATE TABLE ToDo
(
  DueDate DATE,
  Content VARCHAR(500) NOT NULL,
  StartDate DATE,
  Priority INT NOT NULL,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  Depth INT DEFAULT 1,
  ToDoId INT NOT NULL,
  GroupId INT,
  ParentToDoId INT,
  IsForced BOOLEAN DEFAULT 'False',
  IsArchived BOOLEAN DEFAULT 'False',
  isOpened BOOLEAN DEFAULT 'False',
  PRIMARY KEY (ToDoId),
  FOREIGN KEY (ToDoId) REFERENCES ToDoListItem(ListItemId) ON DELETE SET DEFAULT,
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE SET NULL,
  FOREIGN KEY (ParentToDoId) REFERENCES ToDo(ToDoId) ON DELETE SET NULL,
  CONSTRAINT depthLimit CHECK (Depth <= 3)
);

CREATE TABLE ToDoAssociatedPrefixes
(
  ToDoId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (ToDoId, FilterId),
  FOREIGN KEY (ToDoId) REFERENCES ToDo(ToDoId),
  FOREIGN KEY (FilterId) REFERENCES PrefixFilter(FilterId)
);

--initialize admin, and 3 lists

INSERT INTO UserData (Username, Password, RefreshTokenId)
VALUES ('admin', 'gfOeKsixgkD0u3Xt7OuLgJ9fwEXFufEw97t8zG9o', 'D9u"�l[�:↓r♣�*p�');

INSERT INTO ToDoList (UserId, Name, SerialNumber)
VALUES (1, 'Lista 1', 1);

INSERT INTO ToDoList (UserId, Name, SerialNumber)
VALUES (1, 'Lista 2', 2);

INSERT INTO ToDoList (UserId, Name, SerialNumber)
VALUES (1, 'Lista 3', 3);