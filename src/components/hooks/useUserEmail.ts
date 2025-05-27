import { useEffect, useState } from "react";
import { getUserEmail } from "../../api/userApi";

export const useUserEmail = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        let storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
          storedEmail = await getUserEmail();
          localStorage.setItem("userEmail", storedEmail);
        }
        setEmail(storedEmail);
      } catch (error) {
        setEmail(null); // No abras el modal ni redirijas aquí
      }
    };
    fetchEmail();
  }, []);

  return email;
};
