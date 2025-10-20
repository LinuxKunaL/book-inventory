import { StudentMeStates } from "@pages/student/context";
import { Badge } from "@radix-ui/themes";
import { useContext } from "react";
import { BiPhone } from "react-icons/bi";
import boy from "@assets/boy.svg";
import girl from "@assets/girl.svg";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import { MdMail } from "react-icons/md";

function ProfileCard() {
  const { student } = useContext(StudentMeStates);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="p-0">
        <div className="bg-gradient-to-r from-crimson-500 to-emerald-500 p-4 sm:p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="size-14 sm:size-16 border-4 border-white/20 shadow-lg rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="Profile"
                src={student.gender == "male" ? boy : girl}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {student.studentName}
              </h2>
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-sm font-medium">Admission No:</span>
                <span className="text-sm font-medium">
                  {student.admissionNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-9 sm:size-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaSchool className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    School
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold break-words">
                    {student?.school?.schoolName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-9 sm:size-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaGraduationCap className="size-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Class & Section
                  </p>
                  <div className="flex items-center gap-2 capitalize">
                    <Badge variant="surface" color="purple">
                      {student.classStandard}
                    </Badge>
                    <Badge color="indigo" variant="surface">
                      Section {student.section}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-9 sm:size-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdMail className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium break-all">
                    {student.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-9 sm:size-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BiPhone className="size-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Mobile Number
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {student.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Student
              </span>
            </div>
            <Badge variant="surface" color="green">
              Verified
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
