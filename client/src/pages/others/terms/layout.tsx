import Head from "@pages/others/terms/components/Head";
import AccountTermination from "@pages/others/terms/components/AccountTermination";
import UserResponsibilities from "@pages/others/terms/components/UserResponsibilities";
import LimitationsOfLiability from "@pages/others/terms/components/LimitationsOfLiability";
import BaseLayout from "@components/layouts/BaseLayout";
import ScrollTop from "@components/app/ScrollTop";

function layout() {
  return (
    <BaseLayout>
      <ScrollTop />
      <div className="relative flex flex-col">
        <main className="px-4 md:px-12 lg:px-16 w-full container mx-auto">
          <section className="pb-16 w-full">
            <Head />
          </section>
          <section className="pb-16 w-full">
            <UserResponsibilities />
          </section>
          <section className="pb-16 w-full">
            <LimitationsOfLiability />
          </section>
          <section className="pb-16 w-full">
            <AccountTermination />
          </section>
        </main>
      </div>
    </BaseLayout>
  );
}

export default layout;
