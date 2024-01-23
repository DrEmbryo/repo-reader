export const getPages = (
  currentPage: number,
  range: number,
  totalPages: number
) => {
  const paginationLength = totalPages < range ? totalPages : range;
  const bounds = [1, totalPages];

  const res = [currentPage];
  let left = currentPage - 1;
  let right = currentPage + 1;

  while (res.length !== paginationLength) {
    if (right <= bounds[1]) {
      res.push(right);
      right++;
    }

    if (left >= bounds[0]) {
      res.unshift(left);
      left--;
    }
  }
  return res;
};
