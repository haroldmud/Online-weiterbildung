import Card from "../ui/Card";
import CardReversed from "../ui/CardReversed";
import { data } from "@/helpers/data";

const Content = () => {
  return (
    <section>
      {
        data.map((item, index) => {
          if(index % 2 === 0) {
            return (
              <Card
                key={item.id}
                image={item.image}
                price={item.price}
                wholesalePrice={item.wholesalePrice}
                title={item.title}
                desciption={item.description}
              />
            )
          } else {
            return (
              <CardReversed
                key={item.id}
                image={item.image}
                price={item.price}
                wholesalePrice={item.wholesalePrice}
                title={item.title}
                desciption={item.description}
              />
            )
          }
        })
      }
    </section>
  );
}

export default Content;
