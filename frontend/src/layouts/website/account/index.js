import AccountHeader from "./header";
import Footer from "../DefaultLayout/Footer";

function AccountLayout({ children }) {

  return (
    <div>
      <AccountHeader />
      <div className="account-content min-h">{children}</div>
      {/* <div className={user ? "account-content min-h" : "min-h"}>{children}</div> */}
      <Footer />
    </div>
  );
}

export default AccountLayout;
