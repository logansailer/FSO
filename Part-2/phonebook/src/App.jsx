import { useState } from "react";
import Person from "./components/person";
import Search from "./components/Search";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

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
      id: String(newName),
    };
    if (checkDuplicate(newName) == true) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
    const regex = new RegExp(newSearch, "i");
    const searchedPerson = () =>
      persons.filter((person) => person.name.match(regex));
    setPersons(searchedPerson);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
