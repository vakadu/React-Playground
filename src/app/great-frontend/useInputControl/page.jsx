'use client'

import { useInputControl } from "./_useInputControl";

export default function UseInputCOntrol() {
  const nameInput = useInputControl("Oliver");

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={nameInput.value}
          onChange={nameInput.handleChange}
          onBlur={nameInput.handleBlur}
        />
      </div>
      <p>Touched: {nameInput.touched.toString()}</p>
      <p>Dirty: {nameInput.dirty.toString()}</p>
      <p>Different: {nameInput.different.toString()}</p>
      <button type="submit" disabled={!nameInput.different}>
        Submit
      </button>
      <button type="button" onClick={nameInput.reset}>
        Reset
      </button>
    </form>
  );
}
