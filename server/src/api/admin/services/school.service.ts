import httpCode from "http-status-codes";
import { MSchool } from "../../../models/school.model";
import { AppError } from "../../../utils/Error/AppError";
import { TFilterQuery } from "../admin.type";

const getSchools = async (query: TFilterQuery["school"]) => {
  const page = query.page || 1;
  const search = query.search || "";
  const date = query.date || "";
  const type = query.type;

  try {
    const queryFIlter = {
      $and: [
        {
          schoolName: { $regex: search, $options: "i" },
        },
        date
          ? {
              createdAt: new Date(date).toDateString(),
            }
          : {},
      ],
    };

    // type = 'plain' is indicate for request which coming for select tag options
    if (type == "plain") {
      return {
        schools: await MSchool.find().select("schoolName"),
      };
    }

    const result = await MSchool.find(queryFIlter)
      .skip((page - 1) * 10)
      .limit(10)
      .select("-__v");
    const totalSchools = await MSchool.countDocuments(queryFIlter);

    return {
      schools: result,
      totalSchools,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

export default { getSchools };
