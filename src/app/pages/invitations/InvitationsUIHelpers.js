export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "30", value: 30 },
];
export const initialFilter = {
  keyword: "",
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10,
  maxResultCount: 10,
  skipCount: 0,
};
