import React, { useState } from "react";
import { CheckBox } from "./CheckBox";

const initialData = [
  {
    id: 1,
    label: "Fruits",
    isChecked: false,
    children: [
      { id: 10, label: "Apple", isChecked: false },
      { id: 11, label: "banana", isChecked: false },
    ],
  },
  {
    id: 2,
    label: "Vegetables",
    isChecked: false,
    children: [
      { id: 20, label: "Veg1", isChecked: false },
      { id: 21, label: "Veg2", isChecked: false },
    ],
  },
];

export const CheckBoxTree = () => {
  const [checkBoxData, setCheckBoxData] = useState(initialData);

  const updatedChildrenCheckState = (node, isNodeChecked) => {

    
    return {
      ...node,
      isChecked: isNodeChecked,
      children: node.children?.map((child) => updatedChildrenCheckState(child, isNodeChecked))
    }

  }

  const updateParentNodeCheckState = (node) => {

    const isAllChildernChecked = node.children.every((child) => child.isChecked);

    const updatedNode = {
      ...node,
      isChecked: isAllChildernChecked
    }
    return updatedNode;

  }

  const toggleData = (nodes, id) => {

    return (nodes.map((node) => {

      if(node.id === id){
        const newCheckState = !node.isChecked;
        return updatedChildrenCheckState(node, newCheckState);
      }
      if(node.children){

        const updateChildNodes = toggleData(node.children,id);

        return updateParentNodeCheckState({...node, children: updateChildNodes})
      }

      return node;



    }))
  }

  const handleOnToggle = (id) => {

    const updatedCheckBoxData = toggleData(checkBoxData, id);
    setCheckBoxData(updatedCheckBoxData);



  }

  return (
    <div className="check-box-tree">
      {checkBoxData.map((data) => {
        return <CheckBox key={data.id} item={data} onToggle={handleOnToggle}/>;
      })}
    </div>
  );
};
