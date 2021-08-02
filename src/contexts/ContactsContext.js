import React, { useContext } from "react";

import LocalStorage from "../hooks/LocalStorage";

const ContactsContext = React.createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = LocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  const ret = { contacts, createContact };

  return (
    <ContactsContext.Provider value={ret}>{children}</ContactsContext.Provider>
  );
}
