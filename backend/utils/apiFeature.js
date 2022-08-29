class ApiFeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStCopy = { ...this.queryStr };

        const removeField = ['keyword', 'page', 'limit'];

        removeField.forEach((field) => delete queryStCopy[field]);
        let queryStr = JSON.stringify(queryStCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = parseInt(this.queryStr.page, 10) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports = ApiFeature;
