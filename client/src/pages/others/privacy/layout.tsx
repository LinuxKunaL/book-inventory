import ScrollTop from "@components/app/ScrollTop";
import BaseLayout from "@components/layouts/BaseLayout";
import Head from "@pages/others/privacy/components/Head";
import HowWeUse from "@pages/others/privacy/components/HowWeUse";
import InfoWeCollect from "@pages/others/privacy/components/InfoWeCollect";
import YourPrivacyRights from "@pages/others/privacy/components/YourPrivacyRights";

function layout() {
  return (
    <BaseLayout>
      <ScrollTop />
      <div className="relative flex flex-col">
        <main className="px-4 md:px-12 lg:px-16 w-full container mx-auto relative overflow-hidden">
          <section className="pb-10 md:pb-16 w-full">
            <Head />
          </section>
          <section className="pb-10 md:pb-16 w-full">
            <InfoWeCollect />
          </section>
          <section className="pb-10 md:pb-16 w-full">
            <HowWeUse />
          </section>
          <section className="pb-10 md:pb-16 w-full">
            <YourPrivacyRights />
          </section>
        </main>
      </div>
    </BaseLayout>
  );
}

export default layout;
