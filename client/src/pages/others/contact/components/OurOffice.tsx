import { Button } from "@radix-ui/themes";
import { MdLocationPin } from "react-icons/md";

function OurOffice() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Visit Our Office
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card  shadow-sm p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-crimson-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-crimson-500 dark:bg-crimson-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <MdLocationPin size={24} color="white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                FinTeen Headquarters
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visit us for in-person meetings, demos, or partnership
                discussions.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Address
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                123 Education Street
                <br />
                Learning City, LC 12345
                <br />
                United States
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Office Hours
              </h4>
              <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <p>Monday - Friday: 9:00 AM - 5:00 PM PST</p>
                <p>Saturday: 10:00 AM - 2:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Getting Here
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                We're located in the heart of the education district, easily
                accessible by public transportation. Visitor parking is
                available on-site.
              </p>
            </div>
          </div>
        </div>
        <div className=" shadow-sm sm:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://maps.google.com/maps?q=636+5th+Ave%2C+New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
          <div className="mt-6 text-center sm:mb-0 mb-6">
            <Button variant="soft" radius="medium" size={"3"}>
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurOffice;
