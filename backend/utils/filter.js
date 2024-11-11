
const filterDocuments = async (Model, filterCriteria, sortCriteria) => {
    try {
      const pipeline = [
        { $match: filterCriteria },
        { $sort: sortCriteria },
        { $lookup: {
            from: "users", // The name of the User collection
            localField: "uploadedBy", // Field in QuestionPaper schema
            foreignField: "_id", // Field in the User schema
            as: "uploadedByInfo" // Alias for the result
          }
        },
      ];
  
      const result = await Model.aggregate(pipeline);
      return result;
    } catch (error) {
      throw new Error(`Error in aggregation: ${error.message}`);
    }
  };
  
module.exports = filterDocuments;
  