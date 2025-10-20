import { IoMdEye } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
import { Badge, IconButton, Table, Tooltip } from "@radix-ui/themes";
import { useContext } from "react";
import { OverviewStates } from "../context";
import { getProgressColor } from "@utils/colors/getProgressColor";
import { useNavigate } from "react-router";

function TopStudents() {
  const { data } = useContext(OverviewStates);

  if (!data.topPerformingStudents) {
    return null;
  }

  const navigate = useNavigate();

  const topPerformingStudents = data.topPerformingStudents;

  return (
    <div>
      <div className="flex flex-col space-y-1.5 pt-4 sm:pt-6">
        <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <MdTrendingUp />
          Top Performing Students
        </h3>
      </div>
      <div className="pt-6">
        <div className="overflow-x-auto text-nowrap">
          <Table.Root
            variant="surface"
            className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700"
          >
            <Table.Header>
              <Table.Row>
                {[
                  "Student",
                  "School",
                  "Overall Progress",
                  "Courses",
                  "Actions",
                ].map((head) => (
                  <Table.ColumnHeaderCell key={head}>
                    {head}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {topPerformingStudents.map((student) => (
                <Table.Row align="center">
                  <Table.RowHeaderCell>
                    {student.student.studentName}
                  </Table.RowHeaderCell>
                  <Table.Cell>{student.student.school.schoolName}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant="solid"
                      size="2"
                      color={getProgressColor(student.overallProgress)}
                    >
                      {student.overallProgress}%
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{student.coursesCompleted} Completed</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Tooltip content="Open Profile">
                        <IconButton
                          radius="medium"
                          color="purple"
                          variant="soft"
                          onClick={() =>
                            navigate(
                              `/admin/student/${student.student._id}/view`
                            )
                          }
                        >
                          <IoMdEye size={16} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
              {topPerformingStudents.length === 0 && (
                <Table.Cell colSpan={5}>
                  <div className="p-6 text-center">
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      Top Performing Students Not Found
                    </p>
                  </div>
                </Table.Cell>
              )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
}

export default TopStudents;
