import { useState } from "react";
import styles from "./ListGroup.module.css";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

// { items: [], heading: string }
interface Props {
  items: string[];
  heading: string;
  // (item: string) => void
  onSelectedItem: (item: string) => void;
}

// styling with CSS Modules (when you have same css class in different files
// , those name will have conflict therefore we need css module to resolve the conflict)
// File related to CSS Modules are ListGroup.module.css

// function ListGroup({ items, heading, onSelectedItem }: Props) {
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   return (
//     <>
//       <h1>{heading}</h1>
//       {items.length === 0 && <p>No item found</p>}
//       <ul className={[styles.listGroup, styles.container].join(" ")}>
//         {items.map((item, index) => (
//           <li
//             className={
//               selectedIndex === index
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//             key={item}
//             onClick={() => {
//               setSelectedIndex(index);
//               onSelectedItem(item);
//             }}
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

function ListGroup({ items, heading, onSelectedItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <List>
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectedItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
