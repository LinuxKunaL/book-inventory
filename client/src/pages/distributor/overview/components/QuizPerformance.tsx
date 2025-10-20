import { useContext } from "react";
import { TbTrophy } from "react-icons/tb";
import { OverviewStates } from "../context";
import { MdOutlineBarChart } from "react-icons/md";
import { Badge, IconButton, Table, Tooltip } from "@radix-ui/themes";
import { getDifficultyColor } from "@utils/colors/getDifficultyColor";
import { useNavigate } from "react-router";

function QuizPerformance() {
  const { data } = useContext(OverviewStates);
  if (!data.recentQuizzes) {
    return null;
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col space-y-1.5 pt-4 sm:pt-6">
        <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <TbTrophy />
          Recent Quiz Performance
        </h3>
      </div>
      <div className="pt-4 sm:pt-6">
        <div className="overflow-x-auto text-nowrap">
          <Table.Root
            variant="surface"
            className="dark:!bg-gray-800 !bg-white !border-[1px] border-gray-200 dark:!border-gray-700 overflow-auto w-full"
          >
            <Table.Header>
              <Table.Row>
                {[
                  "Title",
                  "Description",
                  "difficulty",
                  "Participants",
                  "Actions",
                ].map((head) => (
                  <Table.ColumnHeaderCell key={head}>
                    {head}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.recentQuizzes.map((quiz) => (
                <Table.Row align="center">
                  <Table.RowHeaderCell>{quiz.title}</Table.RowHeaderCell>
                  <Table.Cell>
                    <p className="w-40 truncate"> {quiz.description}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant="solid"
                      size="2"
                      color={getDifficultyColor(quiz.difficulty)}
                    >
                      {quiz.difficulty}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{quiz.participantsCount} Participants</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Tooltip content="Open Report">
                        <IconButton
                          radius="medium"
                          color="purple"
                          variant="soft"
                          onClick={() =>
                            navigate(`/admin/quizzes/${quiz._id}/participants`)
                          }
                        >
                          <MdOutlineBarChart size={16} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
              {data.recentQuizzes.length === 0 && (
                <Table.Cell colSpan={5}>
                  <div className="p-6 text-center">
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      Recent Quizzes not found{" "}
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

export default QuizPerformance;
