import ProfileProvider from "./context";
import Header from "./components/Header";
import StreakCard from "./components/StreakCard";
import UserProfile from "./components/UserProfile";
import ProfileCard from "./components/ProfileCard";

import AccountSetting from "./components/AccountSetting";
import ChangePassword from "./components/ChangePassword";

function layout() {
  return (
    <ProfileProvider>
      <div className="space-y-4 sm:space-y-6">
        <Header />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileCard />
            <UserProfile />
            <ChangePassword />
          </div>
          <div className="space-y-6">
            <StreakCard />
            <AccountSetting />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}

export default layout;
