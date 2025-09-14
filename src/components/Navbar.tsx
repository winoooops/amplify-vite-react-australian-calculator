import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "@tanstack/react-router";

function Navbar() {
  const { signOut } = useAuthenticator();

  return (
    <>
      <Link to="/taxConfigs" className="[&.active]:font-bold">
        TaxConfigurations
      </Link>
      <Link to="/taxCalculator" className="[&.active]:font-bold">
        TaxCalculator
      </Link>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}

export default Navbar;
