import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage, { } from "./useLocalStorage";

/**
 * Returns a friendly display name for the current user by checking, in order:
 * - Cognito user attributes (name, given_name, preferred_username, email)
 * - OIDC ID token claims (name, given_name, email)
 * - Amplify user fields (signInDetails.loginId, username)
 */
export function useDisplayName(): string | undefined {
  const { user } = useAuthenticator();
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [displayNameFromLocalStorage, setDisplayNameFromLocalStorage] = useLocalStorage<string | undefined>("displayName", undefined);

  const computeName = useCallback(async () => {
    try {
      const attrs = await fetchUserAttributes();
      const attrName =
        attrs.name || attrs.given_name || attrs.preferred_username || attrs.email;
      if (attrName) {
        setDisplayName(attrName);
        setDisplayNameFromLocalStorage(attrName);
        return;
      }

      const session = await fetchAuthSession();
      const idPayload = session.tokens?.idToken?.payload as
        | Record<string, unknown>
        | undefined;
      const claimName =
        (idPayload?.["name"] as string) ||
        (idPayload?.["given_name"] as string) ||
        (idPayload?.["email"] as string);
      if (claimName) {
        setDisplayName(claimName);
        setDisplayNameFromLocalStorage(claimName);
        return;
      }

      const fallback =
        (user as unknown as { signInDetails?: { loginId?: string } })?.
          signInDetails?.loginId || user?.username;
      const value = typeof fallback === "string" ? fallback : undefined;
      setDisplayName(value);
      setDisplayNameFromLocalStorage(value);
    } catch {
      const fallback =
        (user as unknown as { signInDetails?: { loginId?: string } })?.
          signInDetails?.loginId || user?.username;
      const value = typeof fallback === "string" ? fallback : undefined;
      setDisplayName(value);
      setDisplayNameFromLocalStorage(value);
    }
  }, [user, setDisplayNameFromLocalStorage]);

  useEffect(() => {
    if (displayNameFromLocalStorage) {
      setDisplayName(displayNameFromLocalStorage);
      return;
    }
    let cancelled = false;
    (async () => {
      await computeName();
      if (cancelled) return;
    })();

    return () => {
      cancelled = true;
    };
  }, [computeName, displayNameFromLocalStorage]);

  return displayName;
}


