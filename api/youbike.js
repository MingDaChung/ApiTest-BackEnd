module.exports = {
  paginate(mergeData) {
    let page = 1;
    let perPage = 10;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return mergeData.slice(from, to);
  },
};
