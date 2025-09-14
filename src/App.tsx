import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [taxConfigs, setTaxConfigs] = useState<Array<Schema["TaxConfig"]["type"]>>([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    client.models.TaxConfig.observeQuery().subscribe({
      next: (data) => setTaxConfigs([...data.items]),
    });
  }, []);

  console.log(taxConfigs);

  return (
    <main>
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}

export default App;
