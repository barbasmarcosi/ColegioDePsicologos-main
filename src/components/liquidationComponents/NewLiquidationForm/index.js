import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function NewLiquidationForm() {
  const [newLiquidationMonth, setNewLiquidationMonth] = React.useState(
    new Date(Date.now()).getMonth() + 1
  );
  const [newLiquidationYear, setNewLiquidationYear] = React.useState(
    new Date(Date.now()).getFullYear()
  );
  const [newPersonCUIT, setNewPersonCUIT] = React.useState("");
  const [newPersonName, setNewPersonName] = React.useState("");
  const {
    searchPerson,
    setSearchPerson,
    persons,
    setOpenAddLiquidationModal,
    addLiquidation,
    personFinderById,
  } = React.useContext(MainContext);

  const onChangeMonth = (event) => {
    setNewLiquidationMonth(event.target.value);
  };
  const onChangeYear = (event) => {
    setNewLiquidationYear(event.target.value);
  };
  const onSelectPerson = async (event) => {
    let person = await personFinderById(event.target.value);
    console.log(person);
    setNewPersonName(person.nombre + " " + person.apellido);
    setNewPersonCUIT(person.cuit);
  };
  const OnChangeSearch = (event) => {
    setSearchPerson(event.target.value);
  };
  const onCancel = () => {
    setOpenAddLiquidationModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newLiquidationYear, Number(newLiquidationYear));
    if (
      !(
        newLiquidationMonth &&
        newPersonCUIT &&
        newPersonName &&
        newLiquidationYear
      )
    ) {
      alert("Verifique los datos ingresados");
    } else if (
      !(Number(newLiquidationYear) && newLiquidationYear <= new Date(Date.now()).getFullYear())
    ) {
      alert("El año debe ser numerico y menor o igual al año actual");
    } else if (
      !(Number(newLiquidationMonth) && newLiquidationMonth <= 12 && newLiquidationMonth > 0)
    ) {
      alert("El mes debe ser numerico y entre 1 y 12");
    } else {
      addLiquidation(
        Number(newLiquidationMonth),
        Number(newLiquidationYear),
        newPersonCUIT,
        newPersonName
      );
      setOpenAddLiquidationModal(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los nuevos datos de la liquidacion</label>
      <textarea
        value={newLiquidationMonth}
        onChange={onChangeMonth}
        placeholder="Mes de la liquidacion"
      />
      <textarea
        value={newLiquidationYear}
        onChange={onChangeYear}
        placeholder="Año de la liquidacion"
      />
      <input
        className="Input"
        placeholder="Filtrar Matriculados"
        value={searchPerson}
        onChange={OnChangeSearch}
      />
      <select onChange={onSelectPerson} className="Select" name="select">
        <option selected>Elija un matriculado</option>
        {persons
          .filter((person) => person.estado === 1)
          .map((person) => (
            <option key={person.id} value={person.id}>
              {person.apellido + " " + person.nombre + " " + person.cuit}
            </option>
          ))}
      </select>
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Generar
        </button>
      </div>
    </form>
  );
}

export { NewLiquidationForm };
