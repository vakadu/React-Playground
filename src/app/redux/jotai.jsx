import { useTowel } from "./towel";
import { towel } from "./towel";

const redTowel = towel(10);
const greenTowel = towel(100);
const oraangeTowel = towel(1000);

const Redux = () => {
  const [red, setRedTowel] = useTowel(redTowel);
  const [green, setGreenTowel] = useTowel(greenTowel);
  const [orange, setOrangeTowel] = useTowel(oraangeTowel);

  // Logs should show when subscribers are added or removed
  //   console.log("Red Towel Subscribers:", redTowel.subscribe);
  //   console.log("Green Towel Subscribers:", greenTowel.subscribe);
  //   console.log("Orange Towel Subscribers:", oraangeTowel.subscribe);

  return (
    <div>
      <div>
        <input value={red} onChange={(e) => setRedTowel(+e.target.value)} />
        <span>{red}</span>
      </div>
      <div>
        <input value={green} onChange={(e) => setGreenTowel(+e.target.value)} />
        <span>{green}</span>
      </div>
      <div>
        <input
          value={orange}
          onChange={(e) => setOrangeTowel(+e.target.value)}
        />
        <span>{orange}</span>
      </div>
    </div>
  );
};

export default Redux;
