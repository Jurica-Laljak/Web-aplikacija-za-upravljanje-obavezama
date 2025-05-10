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
  'IssueDate'
);

--create tables

CREATE TABLE UserData
(
  UserId SERIAL,
  Username VARCHAR(18) NOT NULL,
  Password VARCHAR(40) NOT NULL,
  RefreshTokenId BYTEA NOT NULL,
  PRIMARY KEY (UserId),
  UNIQUE (Username),
  UNIQUE (RefreshTokenId),
  CONSTRAINT usernameLength CHECK (CHAR_LENGTH(Username) >= 5),
  CONSTRAINT passwordLength CHECK (CHAR_LENGTH(Password) >= 10)
);

CREATE TABLE ToDoList
(
  ListId SERIAL,
  Name VARCHAR(50) NOT NULL,
  SerialNumber INT NOT NULL,
  HighLevelSort SORT DEFAULT 'TimeCreated:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  DefaultGroupId INT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  UserId INT NOT NULL,
  PRIMARY KEY (ListId),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId) ON DELETE CASCADE,
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE ToDoGroup
(
  GroupId SERIAL,
  Name VARCHAR(50) NOT NULL,
  HighLevelSort SORT DEFAULT 'TimeCreated:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  SerialNumber INT NOT NULL,
  ListId INT NOT NULL,
  PRIMARY KEY (GroupId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId) ON DELETE CASCADE,
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE Filter
(
  FilterId SERIAL,
  Name VARCHAR(50) NOT NULL,
  UserId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId) ON DELETE CASCADE
);

CREATE TABLE PrefixFilter
(
  Prefix VARCHAR(50) NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  UNIQUE (Prefix)
);

CREATE TABLE SizeFilter
(
  Size INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  UNIQUE (Size)
);

CREATE TABLE TimePeriodFilter
(
  DateType DATETYPE DEFAULT 'DueDate',
  LowerBound DATE,
  HigherBound DATE,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CONSTRAINT boundDefined CHECK ((LowerBound IS NOT NULl) OR (HigherBound IS NOT NULl))
);

CREATE TABLE PriorityFilter
(
  HigherBound INT,
  LowerBound INT,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CONSTRAINT boundDefined CHECK ((LowerBound IS NOT NULl) OR (HigherBound IS NOT NULl))
);

CREATE TABLE GroupDefined
(
  GroupId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (GroupId, FilterId),
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId)
);

CREATE TABLE ToDo
(
  ToDoId SERIAL,
  Content VARCHAR(500) NOT NULL,
  DueDate DATE,
  IssueDate DATE,
  Priority INT DEFAULT 3,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  Depth INT DEFAULT 1,
  GroupId INT,
  ParentToDoId INT,
  IsArchived BOOLEAN DEFAULT 'False',
  SerialNumber INT,
  ListId INT NOT NULL,
  PRIMARY KEY (ToDoId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId) ON DELETE CASCADE,
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE SET NULL,
  FOREIGN KEY (ParentToDoId) REFERENCES ToDo(ToDoId) ON DELETE SET NULL,
  CONSTRAINT depthLimit CHECK (Depth BETWEEN 1 AND 3),
  CONSTRAINT priorityIntegrity CHECK (Priority BETWEEN 1 AND 5)
);

CREATE TABLE ToDoAssociates
(
  ToDoId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (ToDoId, FilterId),
  FOREIGN KEY (ToDoId) REFERENCES ToDo(ToDoId) ON DELETE CASCADE,
  FOREIGN KEY (FilterId) REFERENCES PrefixFilter(FilterId) ON DELETE CASCADE
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