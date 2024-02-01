'use client'

import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const CardView =(props)=> {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-6">
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{props.item.projectName}</b>
            <p className="text-default-500">{props.item.projectDescription}</p>
          </CardFooter>
        </Card>
    </div>
  );
}



export default CardView