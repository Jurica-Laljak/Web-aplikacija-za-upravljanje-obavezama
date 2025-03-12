--type definition

CREATE TYPE SORT AS ENUM (
  'CreateDate:Asc',
  'CreateDate:Desc',
  'Alphabetical:Asc',
  'Alphabetical:Desc',
  'DueDate:Asc',
  'DueDate:Desc',
  'PrefixAlphabetical:Asc',
  'PrefixAlphabetical:Desc',
  'Priority:Asc',
  'Priority:Desc'
);

--create tables

CREATE TABLE ToDoList
(
  Name VARCHAR(50) NOT NULL,
  Size INT DEFAULT 0,
  ListId SERIAL,
  HighLevelSort SORT DEFAULT 'CreateDate:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  PRIMARY KEY (ListId),
  UNIQUE (Name),
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
);

CREATE TABLE Filter
(
  FilterId SERIAL,
  Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (FilterId),
  UNIQUE (Name)
);

CREATE TABLE ToDoListItem
(
  ListItemId SERIAL,
  ListId INT NOT NULL,
  PRIMARY KEY (ListItemId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId)
);

CREATE TABLE ToDoGroup
(
  Name VARCHAR(50) NOT NULL,
  Size INT DEFAULT 0,
  Hyperlink VARCHAR(2000) NOT NULL,
  HighLevelSort SORT DEFAULT 'CreateDate:Asc',
  MidLevelSort SORT,
  LowLevelSort SORT,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  isOrdered BOOLEAN NOT NULL,
  GroupId INT NOT NULL,
  PRIMARY KEY (GroupId),
  FOREIGN KEY (GroupId) REFERENCES ToDoListItem(ListItemId) ON DELETE SET NULL,
  UNIQUE (Name),
  UNIQUE (Hyperlink),
  CONSTRAINT sortOrder CHECK (NOT ((MidLevelSort IS NULL) AND (LowLevelSort IS NOT NULL)))
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
  StartDate DATE,
  EndDate DATE,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CHECK ((StartDate IS NOT NULl) OR (EndDate IS NOT NULl))
);

CREATE TABLE PriorityFilter
(
  HigherBoundPriority INT,
  LowerBoundPriority INT,
  FilterId INT NOT NULL,
  PRIMARY KEY (FilterId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId) ON DELETE CASCADE,
  CHECK ((HigherBoundPriority IS NOT NULl) OR (LowerBoundPriority IS NOT NULl))
);

CREATE TABLE GroupDefinedBy
(
  GroupId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (GroupId, FilterId),
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId)
);

CREATE TABLE ListDefinedBy
(
  Priority INT NOT NULL,
  ListId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (ListId, FilterId),
  FOREIGN KEY (ListId) REFERENCES ToDoList(ListId),
  FOREIGN KEY (FilterId) REFERENCES Filter(FilterId)
);

CREATE TABLE ToDo
(
  Due_Date DATE,
  Content VARCHAR(500) NOT NULL,
  Start_Date DATE,
  Priority INT NOT NULL,
  TimeCreated TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  Hyperlink VARCHAR(2000) NOT NULL,
  Depth INT NOT NULL,
  ToDoId INT NOT NULL,
  GroupId INT,
  NestingToDoId INT,
  PRIMARY KEY (ToDoId),
  FOREIGN KEY (ToDoId) REFERENCES ToDoListItem(ListItemId) ON DELETE SET DEFAULT,
  FOREIGN KEY (GroupId) REFERENCES ToDoGroup(GroupId) ON DELETE SET NULL,
  FOREIGN KEY (NestingToDoId) REFERENCES ToDo(ToDoId) ON DELETE SET NULL,
  UNIQUE (Content),
  UNIQUE (Hyperlink)
);

CREATE TABLE ToDoAssociatedPrefixes
(
  ToDoId INT NOT NULL,
  FilterId INT NOT NULL,
  PRIMARY KEY (ToDoId, FilterId),
  FOREIGN KEY (ToDoId) REFERENCES ToDo(ToDoId),
  FOREIGN KEY (FilterId) REFERENCES PrefixFilter(FilterId)
);

-- initial state

INSERT INTO todolist (name, highlevelsort)
  VALUES ('Archive', 'CreateDate:Desc');

INSERT INTO todolist (name)
  VALUES ('1');

INSERT INTO todolist (name)
  VALUES ('2');

INSERT INTO todolist (name)
  VALUES ('3');