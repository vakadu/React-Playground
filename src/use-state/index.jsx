export default function UseState() {
  return <div></div>;
}

function customUseState(intialVal) {
  const temp = intialVal;

  function state() {
    return temp;
  }

  function setState(newVal) {
    temp = newVal;
  }

  return [state, setState];
}
