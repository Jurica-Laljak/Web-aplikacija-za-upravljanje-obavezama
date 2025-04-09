interface Filter {
  id: number;
  name: string;
  depth: number;
  parentFilterId?: number;
}

export = Filter;
