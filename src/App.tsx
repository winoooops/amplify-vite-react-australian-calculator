import { useAuthenticator } from "@aws-amplify/ui-react";

function App() {
  const { signOut } = useAuthenticator();

  return (
    <main>
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}

export default App;
