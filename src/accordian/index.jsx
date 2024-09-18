import Accordian, {
  AccordianHeader,
  AccordianPanel,
  AccordianItem,
} from "./accordian";

const Page = () => {
  return (
    <Accordian>
      <AccordianItem id="1">
        <AccordianHeader title="title1"></AccordianHeader>
        <AccordianPanel>test1</AccordianPanel>
      </AccordianItem>
      <AccordianItem id="2">
        <AccordianHeader title="title2"></AccordianHeader>
        <AccordianPanel>test2</AccordianPanel>
      </AccordianItem>
    </Accordian>
  );
};

export default Page;
