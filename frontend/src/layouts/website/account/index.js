import AccountHeader from "./header";
import Footer from "../DefaultLayout/Footer";
import useAuthStore from "../../../store";

function AccountLayout({ children }) {
  const { user } = useAuthStore();

  return (
    <div>
      {user == null && <AccountHeader />}
      {/* <div className="account-content min-h">{children}</div> */}
      <div className={user ? "account-content min-h" : "min-h"}>{children}</div>
      <Footer />
    </div>
  );
}

export default AccountLayout;
