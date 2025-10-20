import Faq from "@pages/others/contact/components/Faq";
import FollowUs from "@pages/others/contact/components//FollowUs";
import GetInTouch from "@pages/others/contact/components/GetInTouch";
import Head from "@pages/others/contact/components/Head";
import OurOffice from "@pages/others/contact/components/OurOffice";
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
            <GetInTouch />
          </section>
          <section className="pb-16 w-full">
            <OurOffice />
          </section>
          <section className="pb-16 w-full">
            <FollowUs />
          </section>
          <section className="pb-16 w-full">
            <Faq />
          </section>
        </main>
      </div>
    </BaseLayout>
  );
}

export default layout;
