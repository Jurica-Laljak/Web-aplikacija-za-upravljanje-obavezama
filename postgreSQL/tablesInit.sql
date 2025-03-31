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

--create tables

CREATE TABLE ToDoList
(
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
  PRIMARY KEY (ToDoId),
  FOREIGN KEY (ToDoId) REFERENCES ToDoListItem(ListItemId) ON DELETE SET DEFAULT,
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE SET NULL,
  FOREIGN KEY (ParentToDoId) REFERENCES ToDo(ToDoId) ON DELETE SET NULL,
  UNIQUE (Content),
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

--initialize 3 lists

INSERT INTO ToDoList (Name, SerialNumber)
VALUES ('Lista 1', 1);

INSERT INTO ToDoList (Name, SerialNumber)
VALUES ('Lista 2', 2);

INSERT INTO ToDoList (Name, SerialNumber)
VALUES ('Lista 3', 3);