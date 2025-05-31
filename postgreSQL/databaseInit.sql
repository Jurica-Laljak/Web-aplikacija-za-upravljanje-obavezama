--type definition

CREATE TYPE SORT AS ENUM (
  'timecreated:asc',
  'timecreated:desc',
  'alphabetical:asc',
  'alphabetical:desc',
  'duedate:asc',
  'duedate:desc',
  'prefixalphabetical:asc',
  'prefixalphabetical:desc',
  'priority:asc',
  'priority:desc'
);

CREATE TYPE DATETYPE AS ENUM (
  'duedate',
  'issuedate'
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
  UserId INT NOT NULL,
  ListId SERIAL,
  Name VARCHAR(50) NOT NULL,
  -- SerialNumber INT NOT NULL,
  HighLevelSort SORT DEFAULT 'timecreated:asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  -- DefaultGroupId INT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ListId),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId) ON DELETE CASCADE,
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE ToDoGroup
(
  ListId INT NOT NULL,
  GroupId SERIAL,
  Name VARCHAR(50) NOT NULL,
  HighLevelSort SORT DEFAULT 'timecreated:asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  -- SerialNumber INT NOT NULL,
  PRIMARY KEY (GroupId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId) ON DELETE CASCADE,
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE Filter
(
  UserId INT NOT NULL,
  FilterId SERIAL,
  Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (UserId) REFERENCES UserData(UserId) ON DELETE CASCADE
);

CREATE TABLE PrefixFilter
(
  FilterId INT NOT NULL,
  Prefix VARCHAR(50) NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE
);

CREATE TABLE SizeFilter
(
  FilterId INT NOT NULL,
  Size INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE
);

CREATE TABLE PriorityFilter
(
  FilterId INT NOT NULL,
  HigherBound INT,
  LowerBound INT,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CONSTRAINT boundDefined CHECK ((LowerBound IS NOT NULl) OR (HigherBound IS NOT NULl))
);

CREATE TABLE TimePeriodFilter
(
  FilterId INT NOT NULL,
  DateType DATETYPE,
  LowerBound DATE,
  HigherBound DATE,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CONSTRAINT boundDefined CHECK ((LowerBound IS NOT NULl) OR (HigherBound IS NOT NULl))
);

CREATE TABLE GroupDefined
(
  GroupId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (GroupId, FilterId),
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE CASCADE,
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE
);

CREATE TABLE ToDo
(
  ListId INT NOT NULL,
  GroupId INT,
  ToDoId SERIAL,
  Content VARCHAR(500) NOT NULL,
  DueDate DATE,
  IssueDate DATE,
  Priority INT DEFAULT 3,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  -- Depth INT DEFAULT 1,
  -- ParentToDoId INT,
  -- IsArchived BOOLEAN DEFAULT 'False',
  -- SerialNumber INT,
  PRIMARY KEY (ToDoId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId) ON DELETE CASCADE,
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE SET NULL,
  -- FOREIGN KEY (ParentToDoId) REFERENCES ToDo(ToDoId) ON DELETE SET NULL,
  -- CONSTRAINT depthLimit CHECK (Depth BETWEEN 1 AND 3),
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

--initialize admin user and their 3 lists

-- INSERT INTO UserData (Username, Password, RefreshTokenId)
-- VALUES ('admin', 'gfOeKsixgkD0u3Xt7OuLgJ9fwEXFufEw97t8zG9o', 'D9u"�l[�:↓r♣�*p�');

-- INSERT INTO ToDoList (UserId, Name, SerialNumber)
-- VALUES (1, 'Lista 1', 1);

-- INSERT INTO ToDoList (UserId, Name, SerialNumber)
-- VALUES (1, 'Lista 2', 2);

-- INSERT INTO ToDoList (UserId, Name, SerialNumber)
-- VALUES (1, 'Lista 3', 3);