import { Card } from "primereact/card";
import Utility from "../utility/Utility";

const IDetailComponent = (props: {
  image?: string;
  desc?: string;
  title?: string;
  publishDate?: string;
}) => {
  console.log(props.publishDate);

  const header = (
    <div className="justify-center flex mt-3 rounded-md">
      <img alt="Card" className="rounded-md" src={props.image} />
    </div>
  );
  return (
    <div className="card flex justify-center">
      <Card
        title={props.title}
        subTitle={`Publish Date: ${Utility.formatDate(
          props.publishDate ?? ""
        )}`}
        header={header}
        className="sm:w-25rem"
      >
        <p className="m-0">{props.desc}</p>
      </Card>
    </div>
  );
};

export default IDetailComponent;
