class SearchFeatures {
  constructor(query, queryString, searchfiled) {
    this.query = query;
    this.queryString = queryString;
    this.searchfiled = searchfiled;

  }

  search() {
    const keyword = this.queryString.keyword
      ? {
        [this.searchfiled]: {
          $regex: this.queryString.keyword,
          $options: "i",
        },
      }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // fields to remove for category
    const removeFields = ["keyword", "page", "limit"];

    // console.log(queryCopy);
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);

    // price filter
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    // console.log(JSON.parse(queryString));

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skipProducts = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skipProducts);
    return this;
  }
}

module.exports = SearchFeatures;

// class SearchFeatures {
//   constructor(query, queryString, searchfield) {
//     this.query = query;
//     this.queryString = queryString;
//     this.searchfield = searchfield;
//   }

//   search() {
//     const { keyword } = this.queryString;
//     if (keyword) {
//       const regex = { [this.searchfield]: { $regex: keyword, $options: "i" } };
//       this.query = this.query.find({ ...regex });
//     }
//     return this;
//   }

//   filter() {
//     const { keyword, page, limit, ...queryCopy } = this.queryString;
//     const removeFields = ["keyword", "page", "limit"];
//     removeFields.forEach((key) => delete queryCopy[key]);

//     let queryString = JSON.stringify(queryCopy).replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
//     this.query = this.query.find(JSON.parse(queryString));
//     return this;
//   }

//   pagination(resultPerPage) {
//     const currentPage = Number(this.queryString.page) || 1;
//     const skipProducts = resultPerPage * (currentPage - 1);
//     this.query = this.query.limit(resultPerPage).skip(skipProducts);
//     return this;
//   }
// }

// module.exports = SearchFeatures;
