import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Person from "./components/person";
import Search from "./components/Search";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [topMessage, setTopMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const checkDuplicate = (newName) => {
    const exists = persons.map((person) => person.name.includes(newName));
    return exists.includes(true);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (checkDuplicate(newName) == true) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      phonebookService.create(personObject).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      });
    }
    setTopMessage(`'${personObject.name}' was added to the phonebook`);
    setTimeout(() => {
      setTopMessage(null);
    }, 3000);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
    const regex = new RegExp(newSearch, "i");
    const searchedPerson = () =>
      persons.filter((person) => person.name.match(regex));
    setPersons(searchedPerson);
  };

  const deletePerson = (id) => {
    const personObject = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${personObject.name}?`)) {
      phonebookService.deletePerson(personObject.id);
      setPersons(persons.filter((person) => person.id !== personObject.id));
      setTopMessage(`'${personObject.name}' was removed from the phonebook`);
      setTimeout(() => {
        setTopMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={topMessage} />
      <Search value={newSearch} onChange={handleSearch} />
      <h3>add a new</h3>
      <Form
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
