import BaseLayout from "@components/layouts/BaseLayout";
import Grids from "@components/others/Grids";
import Auth from "./Auth";

const layout = () => {
  return (
    <BaseLayout className="flex-1">
      <div className="overflow-x-hidden relative flex flex-col">
        <main className="px-4 md:px-12 lg:px-16 mt-15 w-full h-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 flex-row">
              <h1 className="text-3xl font-bold">📚</h1>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-crimson-400 to-crimson-400 bg-clip-text text-transparent">
                BookStore
              </h1>
            </div>
            <p className="text-muted-foreground">Inventory Management System</p>
          </div>
          <section className="pb-10 mt-1 sm:mt-9 md:mt-16 w-full flex justify-center">
            <div className=" w-full max-w-md relative overflow-hidden rounded-md  border-[1px] border-gray-700 bg-gradient-to-tl from-gray-800 to-gray-900">
              <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
                <h3 className="tracking-tight text-2xl sm: font-bold text-gray-900 dark:text-white">
                  login
                </h3>
              </div>
              <div className="sm:p-8 p-3 lg:p-10 relative z-10 rounded-lg bg-gray-50 dark:bg-transparent">
                <Auth />
              </div>
              <Grids variant="mask" height="100%" />
            </div>
          </section>
        </main>
      </div>
    </BaseLayout>
  );
};

export default layout;
